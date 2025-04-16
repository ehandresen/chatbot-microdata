import { NextRequest } from "next/server";

import { generationChain } from "@/lib/rag/runRagPipeline";
import { toLangchainMessages } from "@/lib/utils";
import { BaseMessage } from "@langchain/core/messages";

export async function POST(req: NextRequest) {
  const { question, chat_history } = await req.json();

  // Gjør om chat-historikken til meldinger LangChain forstår
  const history: BaseMessage[] = toLangchainMessages(chat_history);

  // Start streamen fra LangChain-kjeden
  const stream = await generationChain.stream({
    question: question,
    chat_history: history,
  });

  // Gjør om streamen til en form frontend kan bruke
  const readableStream = new ReadableStream({
    async start(controller) {
      // Gå gjennom hver token og send den til frontend en etter en
      for await (const chunk of stream) {
        // Pakker hver token inn i "data: ..." slik at frontend forstår det
        const data = `data: ${chunk}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));
      }
      // Når alle tokens er sendt, avslutt streamen
      controller.close();
    },
  });

  // Dette returnerer ReadableStream-en til frontend som en Server-Sent Event (SSE). Den bruker riktige HTTP-headere for å holde forbindelsen åpen og la klienten motta data i sanntid
  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
