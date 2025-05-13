import { useState } from "react";
import ChatSearch from "./ChatSearch";
import ChatList from "./ChatList";
import NewChatButton from "./NewChatButton";
import DeleteAllChatsButton from "./DeleteAllChatsButton";
import ConfirmDialog from "@/components/ConfirmDialoge";
import { Chat } from "@/types/chat";

interface ChatPanelProps {
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteAllChats: () => void;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  activeChat: Chat | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  onSelectChat,
  onNewChat,
  onDeleteAllChats,
  chats,
  setChats,
  activeChat,
  setActiveChat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatIdToDelete, setChatIdToDelete] = useState<string | null>(null);

  const handleRenameChat = (chatId: string, newTitle: string) => {
    const updated = chats.map((c) =>
      c.id === chatId ? { ...c, title: newTitle.trim() } : c
    );
    setChats(updated);
    localStorage.setItem("chats", JSON.stringify(updated));
  };

  const handleDeleteChat = (chatId: string) => {
    setChatIdToDelete(chatId);
  };

  const confirmDeleteChat = () => {
    if (!chatIdToDelete) return;

    const updated = chats.filter((c) => c.id !== chatIdToDelete);
    setChats(updated);
    localStorage.setItem("chats", JSON.stringify(updated));

    if (activeChat?.id === chatIdToDelete) {
      setActiveChat(null);
      localStorage.removeItem("activeChat");
    }

    setChatIdToDelete(null);
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/4 h-full bg-surface dark:bg-darkestGray p-4 border-r dark:border-lightBlueAccent flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-textSecondary dark:text-textPrimary">
        Tidligere Samtaler
      </h2>
      <ChatSearch onSearch={setSearchQuery} />
      <NewChatButton onClick={onNewChat} />
      <ChatList
        chats={filteredChats}
        searchQuery={searchQuery}
        onSelectChat={onSelectChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
        activeChat={activeChat}
      />
      <div className="mt-4 border-t pt-4 dark:border-surface-700">
        <DeleteAllChatsButton onDeleteAll={onDeleteAllChats} />
      </div>

      <ConfirmDialog
        isOpen={!!chatIdToDelete}
        title="Er du sikker på at du vil slette denne samtalen?"
        description="Denne handlingen kan ikke angres."
        onCancel={() => setChatIdToDelete(null)}
        onConfirm={confirmDeleteChat}
      />
    </div>
  );
};

export default ChatPanel;
