"use client";

import { useState, useTransition } from "react";

import { askMicrodata } from "@/lib/actions/askMicrodata";

export function AskMicrodataTest() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    startTransition(async () => {
      const res = await askMicrodata(question);
      if (res) {
        setAnswer(res);
      } else {
        setAnswer("Ingen respons. Prøv igjen.");
      }
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

      {answer && (
        <div className="mt-4 border p-4 bg-gray-50 rounded">
          <strong>Svar:</strong> {answer}
        </div>
      )}
    </form>
  );
}
