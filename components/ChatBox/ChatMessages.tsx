import { useEffect, useRef } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatMessagesProps {
  messages?: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages = [] }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto text-gray-600 h-full space-y-1.5">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">Hei! Hvordan kan jeg hjelpe deg?</p>
      ) : (
        messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg max-w-[75%] ${
                message.sender === "bot" ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
              }`}
            >
              {message.text}
            </span>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
