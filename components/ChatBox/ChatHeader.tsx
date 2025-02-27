import { X, Maximize } from "lucide-react";

interface ChatHeaderProps {
  closeChat: () => void;
  toggleExpand: () => void;
  isExpanded: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ closeChat, toggleExpand, isExpanded }) => {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <h2 className="text-lg font-semibold">Chatbot</h2>
      <div className="flex space-x-2">
        <button onClick={toggleExpand} className="text-gray-500 hover:text-gray-700">
          <Maximize size={20} />
        </button>
        <button onClick={closeChat} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
