import { Chat } from "@/types/chat";

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
  const formattedDate = new Date(chat.timestamp).toLocaleDateString("no-NO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = new Date(chat.timestamp).toLocaleTimeString("no-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isActiveClass = isActive
    ? "border-2 border-primary bg-muted"
    : "bg-surface";

  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-3 rounded-md shadow-sm cursor-pointer hover:bg-lightGray transition ${isActiveClass}`}
    >
      <div>
        <p className="font-medium text-textSecondary">{chat.title}</p>
        <p className="text-xs text-midGray">
          {formattedDate} – {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
