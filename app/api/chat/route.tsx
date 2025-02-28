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

        // Generate an embedding for the user's query
        console.log("⏳ Generating embedding for the query...");
        const embeddings = new OpenAIEmbeddings({ openAIApiKey });
        const queryEmbedding = await embeddings.embedQuery(query);
        
        console.log("✅ Query Embedding Generated. Length:", queryEmbedding.length);
        console.log("🧐 Embedding Preview (first 10 values):", queryEmbedding.slice(0, 10), "...");

        // Ensure query embedding is properly formatted
        const formattedEmbedding = queryEmbedding as unknown as number[];
        console.log("📏 Formatted Query Embedding:", formattedEmbedding.slice(0, 10), "...");

        // Perform a similarity search using Supabase's vector search
        console.log("📡 Sending request to Supabase match_documents RPC...");
        const { data, error } = await supabase.rpc("match_documents", {
            query_embedding: formattedEmbedding, // Ensure correct format
            match_count: 5,
            filter: {}, // ✅ FIXED: Ensuring filter is an empty JSON object
        });

        console.log("📢 Calling match_documents with:", {
            query_embedding_length: formattedEmbedding.length,
            match_count: 5,
        });

        console.log("🔍 Supabase Response:", { data, error });

        if (error) {
            console.error("❌ Supabase RPC Error:", error);
            return NextResponse.json({ error: "Failed to match documents" }, { status: 500 });
        }

        // Check if Supabase returned any results
        if (!data || data.length === 0) {
            console.warn("⚠️ Supabase returned an empty result set.");
            return NextResponse.json({ response: "Beklager, jeg fant ingen relevant informasjon." });
        }

        // Select the top match as the chatbot response
        const bestMatch = data[0];
        console.log("🏆 Best Match Found:", bestMatch);

        return NextResponse.json({ response: bestMatch.content });

    } catch (err) {
        console.error("❌ Unexpected API error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
