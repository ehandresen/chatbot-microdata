import { useEffect, useRef } from "react";
import { Message } from "@/types/chat"; 
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatMessagesProps {
  messages?: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages = [] }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto text-textSecondary h-full space-y-4 bg-surface">
      {messages.length === 0 ? (
        <p className="text-center text-midGray">Hei! Hvordan kan jeg hjelpe deg?</p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
          >
            {message.sender === "bot" ? (
              <div className="bg-lightGray text-darkestGray rounded-2xl p-4 max-w-[75%] prose prose-sm leading-relaxed shadow-sm">
                <MarkdownRenderer content={message.text} />
              </div>
            ) : (
              <span className="inline-block px-4 py-2 rounded-2xl max-w-[75%] bg-accent text-white shadow-sm">
                {message.text}
              </span>
            )}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
