import { Chat } from "@/types/chat"; 
import useLocalStorage from "@/hooks/useLocalStorage"; 
import useFirstChat from "@/hooks/useFirstChat"; // ✅ Ny hook

const useChat = () => {
  const [chats, setChats] = useLocalStorage<Chat[]>("chats", []); 
  const [activeChat, setActiveChat] = useLocalStorage<Chat | null>("activeChat", null);
  const { isFirstChat, setIsFirstChat } = useFirstChat(); // ✅ Bruker den nye hooken

  const startNewChat = () => {
    if (isFirstChat) return; 

    const chatNumber = chats.length + 1;
    const now = Date.now();

    const newChat: Chat = {
      id: now.toString(),
      title: `Samtale ${chatNumber}`,
      timestamp: now,
      messages: [],
    };

    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChat(newChat);
  };

  const openChat = (chatId: string) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setActiveChat(selectedChat);
    }
  };

  return {
    chats,
    activeChat,
    isFirstChat,
    setChats,
    setActiveChat,
    setIsFirstChat,
    startNewChat,
    openChat,
  };
};

export default useChat;
