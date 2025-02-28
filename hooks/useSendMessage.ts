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

  return newChat;
};

const addMessageToChat = (
  text: string,
  sender: "user" | "bot",
  activeChat: Chat | null,
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>
) => {
  if (!activeChat) return;

  const now = Date.now();
  const newMessage: Message = { id: `${now}-${Math.random()}`, text, sender };

  setChats((prevChats) =>
    prevChats.map((chat) =>
      chat.id === activeChat.id ? { ...chat, messages: [...chat.messages, newMessage] } : chat
    )
  );

  setActiveChat((prevActiveChat) =>
    prevActiveChat ? { ...prevActiveChat, messages: [...prevActiveChat.messages, newMessage] } : null
  );
};

const fetchBotReply = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userMessage }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error from API:", data.error || "Unknown error");
      return "Beklager, det oppstod en feil med chatboten. 🚀";
    }

    return data.response; // API response should contain the chatbot's reply
  } catch (error) {
    console.error("Failed to fetch bot reply:", error);
    return "Beklager, jeg kunne ikke svare akkurat nå. 🚀";
  }
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
    async (text: string) => {
      let chat = activeChat;

      if (isFirstChat || !activeChat) {
        chat = createNewChat(text, chats, setChats, setActiveChat, setIsFirstChat);
      } else {
        addMessageToChat(text, "user", activeChat, setChats, setActiveChat);
      }

      if (chat) {
        const botReply = await fetchBotReply(text);
        addMessageToChat(botReply, "bot", chat, setChats, setActiveChat);
      }
    },
    [chats, activeChat, isFirstChat, setChats, setActiveChat, setIsFirstChat]
  );

  return { handleSendMessage };
};

export default useSendMessage;
