import { X } from "lucide-react";

interface ChatHeaderProps {
  closeChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ closeChat }) => {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <h2 className="text-lg font-semibold">Chatbot</h2>
      <button onClick={closeChat} className="text-gray-500 hover:text-gray-700">
        <X size={20} />
      </button>
    </div>
  );
};

export default ChatHeader; // ✅ Sørg for at denne linjen er til stede!
