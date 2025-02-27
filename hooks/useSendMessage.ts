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

const getNextChatNumber = (chats: Chat[]): number => {
  const existingNumbers = chats
    .map((chat) => parseInt(chat.title.replace("Samtale ", ""), 10))
    .filter((num) => !isNaN(num));

  return existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
};

const createNewChat = (
  text: string,
  chats: Chat[],
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>,
  setIsFirstChat: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const now = Date.now();
  const nextChatNumber = getNextChatNumber(chats);

  const newChat: Chat = {
    id: now.toString(),
    title: `Samtale ${nextChatNumber}`,
    timestamp: now,
    messages: [{ id: `${now}-${Math.random()}`, text, sender: "user" }],
  };

  setChats((prevChats) => {
    const updatedChats = [newChat, ...prevChats];
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    return updatedChats;
  });

  setActiveChat(newChat);
  localStorage.setItem("activeChat", JSON.stringify(newChat));

  setIsFirstChat(false);
};

const addMessageToChat = (
  text: string,
  activeChat: Chat | null,
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>
) => {
  const now = Date.now();
  const newMessage: Message = { id: `${now}-${Math.random()}`, text, sender: "user" };

  setChats((prevChats) =>
    prevChats.map((chat) =>
      chat.id === activeChat?.id ? { ...chat, messages: [...chat.messages, newMessage] } : chat
    )
  );

  setActiveChat((prevActiveChat) =>
    prevActiveChat ? { ...prevActiveChat, messages: [...prevActiveChat.messages, newMessage] } : null
  );
};

const addBotReply = (
  chatId: string,
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>
) => {
  setTimeout(() => {
    const botReply: Message = {
      id: `${Date.now()}-${Math.random()}`,
      text: "Beklager, jeg forstår ikke helt ennå! 🚀",
      sender: "bot",
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, botReply] } : chat
      )
    );

    setActiveChat((prevActiveChat) =>
      prevActiveChat ? { ...prevActiveChat, messages: [...prevActiveChat.messages, botReply] } : null
    );
  }, 1000);
};

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
      if (isFirstChat || !activeChat) {
        createNewChat(text, chats, setChats, setActiveChat, setIsFirstChat);
        addBotReply(Date.now().toString(), setChats, setActiveChat);
      } else {
        addMessageToChat(text, activeChat, setChats, setActiveChat);
        addBotReply(activeChat.id, setChats, setActiveChat);
      }
    },
    [chats, activeChat, isFirstChat, setChats, setActiveChat, setIsFirstChat]
  );

  return { handleSendMessage };
};

export default useSendMessage;
