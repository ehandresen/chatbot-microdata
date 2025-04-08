import { NextResponse } from "next/server";
import { generationChain } from "@/lib/rag/runRagPipeline"; // Justér path etter hvor filen faktisk ligger

export async function POST(req: Request) {
  try {
    console.log("🟢 Received a request to /api/chat");

    const { query } = await req.json();
    console.log("📝 Received user query:", query);

    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // Kjør RAG-pipeline og få generert svar
    const response = await generationChain.invoke({ question: query });
    console.log("✅ Generated response:", response);

    return NextResponse.json({ response });
  } catch (err) {
    console.error("❌ Unexpected API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
