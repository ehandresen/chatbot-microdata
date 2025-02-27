import { Chat } from "@/types/chat";

interface UseDeleteChatsProps {
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

const useDeleteChats = ({ setChats, setActiveChat }: UseDeleteChatsProps) => {
  const handleDeleteAllChats = () => {
    setChats([]);
    setActiveChat(null);
    localStorage.removeItem("chats");
    localStorage.removeItem("activeChat");
  };

  return { handleDeleteAllChats };
};

export default useDeleteChats;
