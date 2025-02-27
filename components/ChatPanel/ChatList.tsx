import ChatListItem from "./ChatListItem";
import { Chat } from "@/types/chat"; 


interface ChatListProps {
    chats: Chat[];
    searchQuery?: string;
    onSelectChat: (chatId: string) => void;
    activeChat: Chat | null;  // Legg til activeChat som en prop
  }
  
  const ChatList: React.FC<ChatListProps> = ({ chats, searchQuery = "", onSelectChat, activeChat }) => {
      const filteredChats = chats.filter((chat) =>
          chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      const sortedChats = [...filteredChats].sort((a, b) => b.timestamp - a.timestamp);
  
      return (
          <div className="flex-1 overflow-y-auto mt-2">
              {sortedChats.length > 0 ? (
                  sortedChats.map((chat) => (
                      <ChatListItem
                          key={chat.id}
                          chat={chat}
                          isActive={chat.id === activeChat?.id} // Send isActive som en propp
                          onClick={() => onSelectChat(chat.id)}
                      />
                  ))
              ) : (
                  <p className="text-gray-500 text-center">Ingen treff</p>
              )}
          </div>
      );
  };
  
  export default ChatList;
  