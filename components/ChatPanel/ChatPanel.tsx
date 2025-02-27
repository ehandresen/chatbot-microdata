import { useState } from "react";
import ChatSearch from "./ChatSearch";
import ChatList from "./ChatList";
import NewChatButton from "./NewChatButton";
import DeleteAllChatsButton from "./DeleteAllChatsButton";
import { Chat } from "@/types/chat"; 


interface ChatPanelProps {
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteAllChats: () => void; 
  chats: Chat[];
  activeChat: Chat | null;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onSelectChat, onNewChat, onDeleteAllChats, chats, activeChat }) => {
  const [searchQuery, setSearchQuery] = useState("");
 
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
        activeChat={activeChat}
      />
   
      <div className="mt-4 border-t pt-4">
        <DeleteAllChatsButton onDeleteAll={onDeleteAllChats} />
      </div>
    </div>
  );
};

export default ChatPanel;
