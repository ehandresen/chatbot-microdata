import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { loadPdf } from "./loadPdf";

export async function splitDocuments(
  rawDocuments: Document[]
): Promise<Document[]> {
  console.log("Splitting documents...");
  // Eksperimenter med forskjellige chunkSize og overlapp, kan påvirke ytelsen til appen
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const documentChunks = await splitter.splitDocuments(rawDocuments);

  console.log(
    `${rawDocuments.length} documents split into ${documentChunks.length} chunks.`
  );

  return documentChunks;
}

// Test
// async function main() {
//   const rawDocuments = await loadPdf();
//   await splitDocuments(rawDocuments);
// }
// main();
