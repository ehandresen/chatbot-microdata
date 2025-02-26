import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  closeChat: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ closeChat }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-16 right-0 w-80 bg-white shadow-xl rounded-xl border p-4 flex flex-col"
    >
      <ChatHeader closeChat={closeChat} />
      <ChatMessages />
      <ChatInput />
    </motion.div>
  );
};

export default ChatWindow;
