import { useState } from "react";

import { generateStandaloneQuestionFromHistory, runRagChain } from "@/lib/actions/rag.actions";
import { Message } from "@/types/chat";
import { fetchEventSource } from "@microsoft/fetch-event-source";

// Hook som gir tilgang til chatHistorikk og en `ask`-funksjon for å spørre AI-en
export function useRag() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  // Hovedfunksjonen for å sende inn et spørsmål.
  const ask = async (question: string) => {
    // Start klokke for å måle hvor lang tid det tar å få svar
    const start = performance.now();

    let standaloneQuestion = question;

    // Hvis det finnes tidligere meldinger, omformuler spørsmålet
    if (chatHistory.length > 0) {
      // Bruker LangChain sin funksjon for å generere et  spørsmål basert på historikk
      standaloneQuestion = await generateStandaloneQuestionFromHistory(
        question,
        chatHistory
      );
    }

    let answer = await runRagChain(standaloneQuestion, chatHistory);

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: question,
    };

    const botMessage: Message = {
      id: crypto.randomUUID(),
      sender: "bot",
      text: "",
    };

    // Oppdater historikk
    // Legger til både brukerens opprinnelige spørsmål og AI sitt svar i historikken
    setChatHistory((prev) => [...prev, newUserMessage, botMessage]);

    // Starter en streamingforespørsel til serveren med fetchEventSource (fra Microsoft-pakken)
    // Dette gjør at vi kan motta tokens en og en i sanntid, i stedet for å vente på hele svaret
    await fetchEventSource("/api/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: standaloneQuestion,
        chat_history: chatHistory,
      }),
      async onopen() {
        console.log("🟢 Stream started");
      },
      onmessage(ev) {
        answer += ev.data;
        setChatHistory((prev) =>
          prev.map((msg) =>
            msg.id === botMessage.id ? { ...msg, text: answer } : msg
          )
        );
      },
      onerror(err) {
        console.error("Stream error:", err);
      },
    });

    const end = performance.now();
    console.log(`⏳ Brukt tid: ${(end - start) / 1000} sekunder`);

    return answer;
  };

  return { chatHistory, ask };
}
