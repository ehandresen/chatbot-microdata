import { Chat } from "@/types/chat";

interface UseRenameChatProps {
  chat: Chat;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const useRenameChat = ({ chat, setChats }: UseRenameChatProps) => {
  const handleRename = () => {
    const newTitle = prompt("Nytt navn på samtalen:", chat.title);
    if (!newTitle || newTitle.trim() === "" || newTitle === chat.title) return;

    setChats((prev) => {
      const updated = prev.map((c) =>
        c.id === chat.id ? { ...c, title: newTitle.trim() } : c
      );
      localStorage.setItem("chats", JSON.stringify(updated));
      return updated;
    });
  };

  return { handleRename };
};

export default useRenameChat;
