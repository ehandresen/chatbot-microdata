import { useState } from "react";
import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  closeChat: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatWindow: React.FC<ChatWindowProps> = ({ closeChat }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hei! Hvordan kan jeg hjelpe deg?", sender: "bot" },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulerer et forsinket bot-svar
    setTimeout(() => {
      const botReply: Message = {
        id: messages.length + 2,
        text: "Beklager, jeg forstår ikke helt ennå! 🚀",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed ${
        isExpanded ? "inset-0 flex justify-center items-center bg-white" : "bottom-16 right-4"
      }`}
    >
      <div
        className={`bg-white shadow-xl border flex flex-col transition-all ${
          isExpanded ? "w-full max-w-[600px] h-full rounded-none" : "w-[400px] h-[500px] rounded-xl"
        }`}
      >
        <ChatHeader closeChat={closeChat} toggleExpand={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded} />
        <div className="flex-1 overflow-y-auto p-4">
          <ChatMessages messages={messages} />
        </div>
        <div className="p-4 border-t bg-white">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
