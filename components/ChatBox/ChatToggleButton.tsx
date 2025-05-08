import { MessageSquare, X } from "lucide-react";

interface ChatToggleButtonProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ isOpen, toggleChat }) => {
  return (
    <button
      onClick={toggleChat}
      className="w-[40px] h-[40px] flex items-center justify-center bg-primary text-textPrimary rounded-full shadow-lg hover:bg-secondary transition"
      aria-label="Toggle chat"
    >
      {isOpen ? (
        <X size={28} className="transform scale-x-[-1]" />
      ) : (
        <MessageSquare size={28} className="transform scale-x-[-1]" />
      )}
    </button>
  );
};

export default ChatToggleButton;
