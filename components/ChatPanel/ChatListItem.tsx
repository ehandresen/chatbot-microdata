import { useState } from "react";
import { Chat } from "@/types/chat";
import { Pencil, Trash } from "lucide-react";

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  isActive,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const formattedDate = new Date(chat.timestamp).toLocaleDateString("no-NO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = new Date(chat.timestamp).toLocaleTimeString("no-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleTitleSubmit = () => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== chat.title) {
      onRename(trimmed);
    } else {
      setTitle(chat.title); 
    }
    setIsEditing(false);
  };

  const isActiveClass = isActive
    ? "border-2 border-lightBlueAccent bg-surface"
    : "bg-lightGray";

  return (
    <div
      className={`flex justify-between items-center p-3 rounded-md shadow-sm cursor-pointer hover:bg-lightDarkBlueAccent transition ${isActiveClass}`}
    >
      <div onClick={onSelect} className="flex-1">
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleSubmit();
              if (e.key === "Escape") {
                setIsEditing(false);
                setTitle(chat.title);
              }
            }}
            autoFocus
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm"
          />
        ) : (
          <>
            <p className="font-medium text-textSecondary">{chat.title}</p>
            <p className="text-xs text-darkestGray">
              {formattedDate} – {formattedTime}
            </p>
          </>
        )}
      </div>
      <div className="flex items-center space-x-2 ml-2">
        {!isEditing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 hover:text-primary"
            aria-label="Rediger tittel"
          >
            <Pencil size={16} />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:text-destructive"
          aria-label="Slett samtale"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatListItem;
