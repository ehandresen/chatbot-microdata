import { useState } from "react";

import { generateStandaloneQuestionFromHistory, runRagChain } from "@/lib/actions/rag.actions";
import { Message } from "@/types/chat";

// Hook som gir tilgang til chatHistorikk og en `ask`-funksjon for å spørre AI-en
export function useRag() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  // Hovedfunksjonen for å sende inn et spørsmål.
  const ask = async (question: string) => {
    let standaloneQuestion = question;

    // Hvis det finnes tidligere meldinger, omformuler spørsmålet
    if (chatHistory.length > 0) {
      // Bruker LangChain sin funksjon for å generere et  spørsmål basert på historikk
      standaloneQuestion = await generateStandaloneQuestionFromHistory(
        question,
        chatHistory
      );
    }

    const answer = await runRagChain(standaloneQuestion, chatHistory);

    // Oppdater historikk
    // Legger til både brukerens opprinnelige spørsmål og AI sitt svar i historikken
    setChatHistory((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: "user", text: question },
      { id: crypto.randomUUID(), sender: "bot", text: answer },
    ]);

    return answer;
  };

  return { chatHistory, ask };
}
