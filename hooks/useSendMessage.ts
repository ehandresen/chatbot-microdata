import { useCallback } from "react";
import { Chat, Message } from "@/types/chat";

interface UseSendMessageProps {
  chats: Chat[];
  activeChat: Chat | null;
  isFirstChat: boolean; // ✅ Sørger for at dette er inkludert
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
    (text: string) => {
      const now = Date.now();
      const newMessage: Message = { id: `${now}-${Math.random()}`, text, sender: "user" };

      // ✅ Finn neste tilgjengelige samtalenummer basert på eksisterende samtaler
      const existingNumbers = chats
        .map((chat) => parseInt(chat.title.replace("Samtale ", ""), 10)) // Hent ut tallene
        .filter((num) => !isNaN(num)); // Filtrer bort NaN-verdier

      const nextChatNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1; // Finn høyeste og legg til 1

      if (isFirstChat || !activeChat) {
        // 🚀 Opprett en ny samtale med riktig nummer
        const newChat: Chat = {
          id: now.toString(),
          title: `Samtale ${nextChatNumber}`, // ✅ Bruk dynamisk nummerering
          timestamp: now,
          messages: [newMessage],
        };

        setChats((prevChats) => {
          const updatedChats = [newChat, ...prevChats];
          localStorage.setItem("chats", JSON.stringify(updatedChats));
          return updatedChats;
        });

        setActiveChat(newChat);
        localStorage.setItem("activeChat", JSON.stringify(newChat));

        setIsFirstChat(false); // ✅ Sikrer at dette bare settes én gang

        // 🔹 Legger til bot-svar ETTER 1 sekund
        setTimeout(() => {
          const botReply: Message = {
            id: `${Date.now()}-${Math.random()}`,
            text: "Beklager, jeg forstår ikke helt ennå! 🚀",
            sender: "bot",
          };

          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === newChat.id ? { ...chat, messages: [...chat.messages, botReply] } : chat
            )
          );

          setActiveChat((prevActiveChat) =>
            prevActiveChat ? { ...prevActiveChat, messages: [...prevActiveChat.messages, botReply] } : null
          );
        }, 1000);
      } else {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === activeChat?.id ? { ...chat, messages: [...chat.messages, newMessage] } : chat
          )
        );

        setActiveChat((prevActiveChat) =>
          prevActiveChat ? { ...prevActiveChat, messages: [...prevActiveChat.messages, newMessage] } : null
        );

        // 🔹 Forsinket bot-svar for vanlige meldinger
        setTimeout(() => {
          const botReply: Message = {
            id: `${Date.now()}-${Math.random()}`,
            text: "Beklager, jeg forstår ikke helt ennå! 🚀",
            sender: "bot",
          };

          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === activeChat?.id ? { ...chat, messages: [...chat.messages, botReply] } : chat
            )
          );

          setActiveChat((prevActiveChat) =>
            prevActiveChat ? { ...prevActiveChat, messages: [...prevActiveChat.messages, botReply] } : null
          );
        }, 1000);
      }
    },
    [chats, activeChat, isFirstChat, setChats, setActiveChat, setIsFirstChat]
  );

  return { handleSendMessage };
};

export default useSendMessage;
