import "dotenv/config";

import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const response = await fetch(
  "https://microdata.no/rose-backend/data-store/metadata/all?dataStore=no.ssb.fdb&version=34.0.0.0"
);
const json = await response.json();

function convertVariablesToDocuments(json: any): Document[] {
  const documents: Document[] = [];

  for (const structure of json.dataStructures) {
    // Measure variable
    if (structure.measureVariable) {
      const { name, label, description } = structure.measureVariable;
      documents.push(
        new Document({
          pageContent: `${label}: ${description}`,
          metadata: { name, type: "measure" },
        })
      );
    }

    // Attribute variables
    for (const variable of structure.attributeVariables || []) {
      documents.push(
        new Document({
          pageContent: `${variable.label}: ${variable.representedVariables?.[0]?.description}`,
          metadata: { name: variable.name, type: "attribute" },
        })
      );
    }

    // Identifier variables
    for (const variable of structure.identifierVariables || []) {
      documents.push(
        new Document({
          pageContent: `${variable.label}: ${variable.representedVariables?.[0]?.description}`,
          metadata: { name: variable.name, type: "identifier" },
        })
      );
    }
  }

  return documents;
}

const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
const embeddingLLM = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const jsonDocs = convertVariablesToDocuments(json);

await PineconeStore.fromDocuments(jsonDocs, embeddingLLM, {
  pineconeIndex,
});
