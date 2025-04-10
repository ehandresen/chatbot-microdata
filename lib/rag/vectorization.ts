import "dotenv/config";

import cliProgress from "cli-progress";

import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

import { loadPdf } from "./loadPdf";
import { splitDocuments } from "./splitDocuments";

const rawDocuments = await loadPdf();

const chunkedDocuments = await splitDocuments(rawDocuments);

const embeddingLLM = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

// Siden prosessen med å vektorisere dokumentene kan ta litt tid, brukes en visuell progresjonslinje i terminalen ved hjelp av ‘cli-progress’-biblioteket.
console.log("Starting vectorization...");
const progressBar = new cliProgress.SingleBar({});
progressBar.start(chunkedDocuments.length, 0);

// Looper gjennom dokument chunks i batches på 100, konverterer hver batch til vektor embeddings
for (let i = 0; i < chunkedDocuments.length; i = i + 100) {
  // Hent neste batch med dokument chunks
  const batch = chunkedDocuments.slice(i, i + 100);

  // Konverter batch til embeddings og lagre i Pinecone
  await PineconeStore.fromDocuments(batch, embeddingLLM, {
    pineconeIndex,
  });

  progressBar.increment(batch.length);
}

progressBar.stop();
console.log("Chunked documents stored in pinecone.");
