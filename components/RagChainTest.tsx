"use client";

import { useState, useTransition } from "react";

import { useRag } from "@/hooks/useRag";

export function RagChainTest() {
  const [question, setQuestion] = useState("");
  const [isPending, startTransition] = useTransition();

  const { chatHistory, ask } = useRag();

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    startTransition(async () => {
      await ask(question); // Bruk hook funskjonen
      setQuestion(""); // Tøm input feltet et spørring
    });
  };

  return (
    <form onSubmit={handleAsk} className="space-y-4">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Still et spørsmål..."
        className="w-full border px-4 py-2 rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isPending ? "Henter svar..." : "Spør"}
      </button>

      {chatHistory.length > 0 && (
        <div className="mt-4 space-y-2">
          {chatHistory.map((message, i) => (
            <div
              key={i}
              className={`p-3 rounded ${
                message.sender === "user" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <strong>{message.sender === "user" ? "Du" : "Bot"}:</strong>{" "}
              {message.text}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
