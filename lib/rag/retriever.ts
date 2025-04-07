import "dotenv/config";

import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

export async function createRetriever(): Promise<VectorStoreRetriever> {
  const embeddingLLM = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const pinecone = new PineconeClient();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

  const vectorStore = await PineconeStore.fromExistingIndex(embeddingLLM, {
    pineconeIndex,
  });

  return vectorStore.asRetriever();
}

// Test
async function main() {
  const retriever = await createRetriever();

  const retrievedDocuments = await retriever.invoke("Hva er microdata?");

  console.log(retrievedDocuments);
}
main();
