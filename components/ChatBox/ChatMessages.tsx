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
    <div className="flex-1 p-4 overflow-y-auto text-gray-600 h-full space-y-4">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">Hei! Hvordan kan jeg hjelpe deg?</p>
      ) : (
        messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
          >
            {message.sender === "bot" ? (
              <div className="bg-gray-200 text-black rounded-lg p-4 max-w-[75%] prose prose-sm leading-relaxed prose-headings:mt-2 prose-p:mb-3">
                <MarkdownRenderer content={message.text} />
              </div>
            ) : (
              <span className="inline-block px-4 py-2 rounded-lg max-w-[75%] bg-blue-500 text-white">
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
