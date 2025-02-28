import { CharacterTextSplitter } from "langchain/text_splitter";
import { readFile } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();


export async function textSplitter() {
  try {
    const filePath = path.join(process.cwd(), "app/lib/microdata-info.txt");

    const text = await readFile(filePath, "utf-8");

    const splitter = new CharacterTextSplitter({
      chunkSize: 500, // Høyere verdi gir mer context, lavere verdi gir mer nøyaktig
      chunkOverlap: 50, // 10-20% av chunkSize er en bra tommelfingerregel
    });

    const output = await splitter.createDocuments([text]);

    // Sjekk variablene så typescript slutter å klage
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY || !process.env.OPENAI_API_KEY) {
      throw new Error("Missing environment variables: SUPABASE_URL, SUPABASE_API_KEY, or OPENAI_API_KEY");
    }
    

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseApiKey = process.env.SUPABASE_API_KEY;
    const openAIApiKey = process.env.OPENAI_API_KEY;

    const supabaseClient = createClient(supabaseUrl, supabaseApiKey);

    // Lag embeddings og last opp til supabase
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: openAIApiKey,
      //model: "text-embedding-3-small",
    });

    await SupabaseVectorStore.fromDocuments(output, embeddings, {
      client: supabaseClient,
      tableName: "documents", // Navnet på tabellen i supabase
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
