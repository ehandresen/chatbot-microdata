import { MessageSquare, X } from "lucide-react";

interface ChatToggleButtonProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ isOpen, toggleChat }) => {
  return (
    <button
      onClick={toggleChat}
      className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      {isOpen ? <X size={24} className="transform scale-x-[-1]" /> : <MessageSquare size={24} className="transform scale-x-[-1]" />}
    </button>
  );
};

export default ChatToggleButton;
