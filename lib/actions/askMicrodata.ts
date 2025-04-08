"use server";

import { generationChain } from "../rag/runRagPipeline";

export async function askMicrodata(question: string) {
  try {
    const response = await generationChain.invoke({ question });
    return response;
  } catch (error) {
    console.log(error);
  }
}
