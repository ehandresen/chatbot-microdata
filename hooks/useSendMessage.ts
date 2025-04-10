import { useCallback } from "react";
import { Chat, Message } from "@/types/chat";

interface UseSendMessageProps {
  chats: Chat[];
  activeChat: Chat | null;
  isFirstChat: boolean;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  setIsFirstChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const useSendMessage = ({
  chats,
  activeChat,
  isFirstChat,
  setChats,
  setActiveChat,
  setIsFirstChat,
}: UseSendMessageProps) => {
  const handleSendMessage = useCallback(
    async (text: string) => {
      const now = Date.now();
      const userMessage: Message = { id: `${now}-${Math.random()}`, text, sender: "user" };

      const existingNumbers = chats
        .map((chat) => parseInt(chat.title.replace("Samtale ", ""), 10))
        .filter((num) => !isNaN(num));
      const nextChatNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

      let chatToUpdate: Chat;

      if (isFirstChat || !activeChat) {
        chatToUpdate = {
          id: now.toString(),
          title: `Samtale ${nextChatNumber}`,
          timestamp: now,
          messages: [userMessage],
        };
        setChats((prev) => [chatToUpdate, ...prev]);
        setActiveChat(chatToUpdate);
        setIsFirstChat(false);
      } else {
        chatToUpdate = {
          ...activeChat,
          messages: [...activeChat.messages, userMessage],
        };
        setChats((prev) =>
          prev.map((chat) => (chat.id === chatToUpdate.id ? chatToUpdate : chat))
        );
        setActiveChat(chatToUpdate);
      }

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: text }),
        });

        const data = await res.json();
        const botReply: Message = {
          id: `${Date.now()}-${Math.random()}`,
          text: data.response || "Beklager, jeg kunne ikke generere et svar.",
          sender: "bot",
        };

        setChats((prev) =>
          prev.map((chat) =>
            chat.id === chatToUpdate.id
              ? { ...chat, messages: [...chat.messages, botReply] }
              : chat
          )
        );
        setActiveChat((prev) =>
          prev?.id === chatToUpdate.id
            ? { ...prev, messages: [...prev.messages, botReply] }
            : prev
        );
      } catch (error) {
        console.error("🛑 Feil ved henting av svar:", error);
      }
    },
    [chats, activeChat, isFirstChat, setChats, setActiveChat, setIsFirstChat]
  );

  return { handleSendMessage };
};


export default useSendMessage;
