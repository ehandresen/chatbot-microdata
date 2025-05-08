import { X, Maximize, Minimize } from "lucide-react";

interface ChatHeaderProps {
  closeChat: () => void;
  toggleExpand: () => void;
  isExpanded: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  closeChat,
  toggleExpand,
  isExpanded,
}) => {
  return (
    <div className="flex justify-between items-center bg-primary text-textPrimary px-4 py-3 rounded-t-xl shadow">
      <h2 className="text-lg font-bold">Chatbot</h2>
      <div className="flex space-x-2">
        <button
          onClick={toggleExpand}
          className="hover:text-accent transition"
        >
          {isExpanded ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
        <button onClick={closeChat} className="hover:text-accent transition">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
