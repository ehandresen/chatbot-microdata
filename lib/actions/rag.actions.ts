"use server";

import { generateStandaloneQuestion, generationChain } from "@/lib/rag/runRagPipeline";
import { Message } from "@/types/chat";
import { BaseMessage } from "@langchain/core/messages";

import { toLangchainMessages } from "../utils";

/**
 * Sender et spørsmål og samtalehistorikk til RAG pipelinen og returnerer svaret.
 * @param question - Spørsmålet som stilles av brukeren.
 * @param chatHistory - Tidligere meldinger i samtalen mellom bruker og AI.
 * @returns Svaret fra AI-en som en tekststreng.
 */
export async function runRagChain(question: string, chatHistory: Message[]) {
  try {
    // history må være et array av BaseMessage (enten HumanMessage eller AIMessage), slik at LangChain sin pipeline forstår samtalehistorikken riktig
    const history: BaseMessage[] = toLangchainMessages(chatHistory);

    return await generationChain.invoke({
      question: question,
      chat_history: history,
    });
  } catch (error) {
    console.error("Error in runRagChain:", error);
    return "Beklager, noe gikk galt. Prøv igjen senere.";
  }
}

export async function generateStandaloneQuestionFromHistory(
  question: string,
  chatHistory: Message[]
) {
  try {
    const history: BaseMessage[] = toLangchainMessages(chatHistory);

    return await generateStandaloneQuestion.invoke({
      question: question,
      chat_history: history,
    });
  } catch (error) {
    console.error("Error in generateStandaloneQuestion:", error);
    return "Beklager, noe gikk galt. Prøv igjen senere.";
  }
}
