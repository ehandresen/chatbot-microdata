import { useState } from "react";
import ChatSearch from "./ChatSearch";
import ChatList from "./ChatList";
import NewChatButton from "./NewChatButton";

interface Chat {
  id: string;
  title: string; // Dato som tittel
  timestamp: number; // Tidspunkt for samtale
}
interface ChatPanelProps {
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  chats: Chat[];
  activeChat: Chat | null;  // Legg til activeChat som en prop
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onSelectChat, onNewChat, chats, activeChat }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer samtaler basert på søk
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/4 h-full bg-gray-100 p-4 border-r flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Tidligere Samtaler</h2>
      <ChatSearch onSearch={setSearchQuery} />
      <NewChatButton onClick={onNewChat} />
      <ChatList
        chats={filteredChats}
        searchQuery={searchQuery}
        onSelectChat={onSelectChat}
        activeChat={activeChat} // Send activeChat videre til ChatList
      />
    </div>
  );
};

export default ChatPanel;
