// Utilty funskjoner går her

import { Message } from "@/types/chat";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";

// Konverterer våre egne meldingsobjekter til LangChain sitt format (BaseMessages).
export function toLangchainMessages(messages: Message[]): BaseMessage[] {
  return messages.map((message) =>
    message.sender === "user"
      ? new HumanMessage(message.text)
      : new AIMessage(message.text)
  );
}
