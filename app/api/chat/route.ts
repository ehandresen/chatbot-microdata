import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

// OpenAI API Key
const openAIApiKey = process.env.OPENAI_API_KEY;

// Minimum likhetsterskel for at en chunk skal anses som relevant
const SIMILARITY_THRESHOLD = 0.7;

// Antall chunks vi henter fra Supabase
const MAX_MATCHES = 5;

// OpenAI-modell (GPT-3.5 for raskere respons)
const OPENAI_MODEL = "gpt-3.5-turbo";

export async function POST(req: Request) {
    try {
        console.log("🟢 Received a request to /api/chat");

        // Parse request body
        const { query } = await req.json();
        console.log("📝 Received user query:", query);

        if (!query) {
            console.warn("⚠️ Missing query in request!");
            return NextResponse.json({ error: "Missing query" }, { status: 400 });
        }

        // Generer embedding for brukerens input
        console.log("⏳ Generating embedding for the query...");
        const embeddings = new OpenAIEmbeddings({ openAIApiKey });
        const queryEmbedding = await embeddings.embedQuery(query);
        
        console.log("✅ Query Embedding Generated. Length:", queryEmbedding.length);

        // Kall Supabase for å finne flere lignende dokumenter
        console.log("📡 Sending request to Supabase match_documents RPC...");
        const { data, error } = await supabase.rpc("match_documents", {
            query_embedding: queryEmbedding,
            match_count: MAX_MATCHES, // Hent flere relevante treff
            filter: {},
        });

        console.log("📢 Calling match_documents with:", {
            query_embedding_length: queryEmbedding.length,
            match_count: MAX_MATCHES,
        });

        console.log("🔍 Supabase Response:", { data, error });

        if (error) {
            console.error("❌ Supabase RPC Error:", error);
            return NextResponse.json({ error: "Failed to match documents" }, { status: 500 });
        }

        // Hvis ingen relevante treff finnes, returner feilmelding
        if (!data || data.length === 0) {
            console.warn("⚠️ Supabase returned an empty result set.");
            return NextResponse.json({ response: "Beklager, jeg fant ingen relevant informasjon." });
        }

        // Filtrer ut resultater med for lav likhet
        const relevantMatches = data.filter((match) => match.similarity >= SIMILARITY_THRESHOLD);

        // Hvis ingen treff har høy nok likhet, returner feilmelding
        if (relevantMatches.length === 0) {
            console.warn("⚠️ No results above similarity threshold.");
            return NextResponse.json({ response: "Beklager, jeg fant ingen relevant informasjon." });
        }

        // Hent ut innholdet fra relevante treff (kun korte utdrag for mer effektiv prosessering)
        const bestResponses = relevantMatches.map(match => match.content.slice(0, 300)); // Henter kun de første 300 tegnene

        // Bruk OpenAI til å generere et sammenhengende svar
        const gptResponse = await generateOpenAISummary(query, bestResponses);

        return NextResponse.json({ response: gptResponse });

    } catch (err) {
        console.error("❌ Unexpected API error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

// Funksjon for å generere et oppsummert svar med OpenAI
async function generateOpenAISummary(userQuery: string, relevantTexts: string[]): Promise<string> {
    try {
        console.log("🤖 Sending data to OpenAI for summarization...");

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openAIApiKey}`,
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                messages: [
                    { role: "system", content: "Du er en hjelpsom assistent som gir presise, korte og informative svar basert på gitt informasjon." },
                    { role: "user", content: `Bruk kun nødvendig informasjon for å gi et direkte og presist svar på dette spørsmålet: "${userQuery}". Ikke legg til unødvendige detaljer.\n\n${relevantTexts.join("\n\n")}` }
                ],
                temperature: 0.3, // Lav temperatur for mer faktuelle svar
                max_tokens: 300, // Raskere respons med færre tokens
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.choices || !data.choices[0]?.message?.content) {
            console.error("❌ OpenAI API Error:", data);
            return "Beklager, jeg kunne ikke generere et godt svar basert på informasjonen.";
        }

        console.log("✅ OpenAI generated response:", data.choices[0].message.content);
        return data.choices[0].message.content.trim();

    } catch (err) {
        console.error("❌ OpenAI API Request Failed:", err);
        return "Beklager, jeg kunne ikke generere et godt svar basert på informasjonen.";
    }
}
