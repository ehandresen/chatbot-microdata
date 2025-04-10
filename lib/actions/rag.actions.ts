"use server";

import { generateStandaloneQuestion, generationChain } from "@/lib/rag/runRagPipeline";
import { Message } from "@/types/chat";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";

/**
 * Sender et spørsmål og samtalehistorikk til RAG pipelinen og returnerer svaret.
 * @param question - Spørsmålet som stilles av brukeren.
 * @param chatHistory - Tidligere meldinger i samtalen mellom bruker og AI.
 * @returns Svaret fra AI-en som en tekststreng.
 */
export async function runRagChain(question: string, chatHistory: Message[]) {
  try {
    // history må være et array av BaseMessage (enten HumanMessage eller AIMessage), slik at LangChain sin pipeline forstår samtalehistorikken riktig
    const history: BaseMessage[] = chatHistory.map((message) => {
      return message.sender === "user"
        ? new HumanMessage(message.text)
        : new AIMessage(message.text);
    });

    return await generationChain.invoke({
      question: question,
      chat_history: history,
    });
  } catch (error) {
    console.error("Error in askMicrodata:", error);
    return "Beklager, noe gikk galt. Prøv igjen senere.";
  }
}

export async function generateStandaloneQuestionFromHistory(
  question: string,
  chatHistory: Message[]
) {
  try {
    // Gjør om meldingene til LangChain sitt format
    const history: BaseMessage[] = chatHistory.map((msg) =>
      msg.sender === "user"
        ? new HumanMessage(msg.text)
        : new AIMessage(msg.text)
    );

    return await generateStandaloneQuestion.invoke({
      question: question,
      chat_history: history,
    });
  } catch (error) {
    console.error("Error in rephraseQuestion:", error);
    return "Beklager, noe gikk galt. Prøv igjen senere.";
  }
}
