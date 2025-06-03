import ChatListItem from "./ChatListItem";
import { Chat } from "@/types/chat";

interface ChatListProps {
  chats: Chat[];
  searchQuery?: string;
  onSelectChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
  onDeleteChat: (chatId: string) => void;
  activeChat: Chat | null;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  searchQuery = "",
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  activeChat,
}) => {
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedChats = [...filteredChats].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="flex-1 overflow-y-auto mt-2 space-y-2">
      {sortedChats.length > 0 ? (
        sortedChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChat?.id}
            onSelect={() => onSelectChat(chat.id)}
            onRename={(newTitle) => onRenameChat(chat.id, newTitle)}
            onDelete={() => onDeleteChat(chat.id)}
          />
        ))
      ) : (
        <p className="text-darkAccent text-center mt-4 dark:text-accent">Ingen treff</p>
      )}
    </div>
  );
};

export default ChatList;
