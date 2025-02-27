import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatPanel from "../ChatPanel/ChatPanel";
import NotePanel from "../NotePanel";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface Chat {
  id: string;
  title: string;
  timestamp: number;
  messages: Message[];
}

interface ChatWindowProps {
  closeChat: () => void;
}
const ChatWindow: React.FC<ChatWindowProps> = ({ closeChat }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFirstChat, setIsFirstChat] = useState(true); // Holder styr på om første samtale er opprettet

    // Hente lagrede samtaler fra localStorage ved første åpning
    useEffect(() => {
      const storedChats = localStorage.getItem("chats");
      const storedActiveChat = localStorage.getItem("activeChat");
  
      if (storedChats) {
        const parsedChats: Chat[] = JSON.parse(storedChats);
        setChats(parsedChats);
  
        if (storedActiveChat) {
          const parsedActiveChat = JSON.parse(storedActiveChat);
          setActiveChat(parsedActiveChat);
        } else if (parsedChats.length > 0) {
          setActiveChat(parsedChats[0]); // Sett første samtale som aktiv hvis ingen er valgt
        }
      }
    }, []);
  
    // Oppdatere lagring når chats eller activeChat endres
    useEffect(() => {
      localStorage.setItem("chats", JSON.stringify(chats));
    }, [chats]);
  
    useEffect(() => {
      if (activeChat) {
          localStorage.setItem("activeChat", JSON.stringify(activeChat));
      }
    }, [activeChat]);

    // Starte en ny samtale
    const startNewChat = () => {
        if (isFirstChat) return; // Hvis første samtale er opprettet, stopp her
    
        const chatNumber = chats.length + 1; // Beregn tittel for samtale: Samtale 1, Samtale 2, osv.
        const now = Date.now();
        const newChat: Chat = {
            id: now.toString(),
            title: `Samtale ${chatNumber}`, // Setter tittel som "Samtale 1", "Samtale 2", osv.
            timestamp: now, // Lagre tidspunkt for samtale
            messages: [],
        };
    
        setChats((prevChats) => {
            const updatedChats = [newChat, ...prevChats];
            localStorage.setItem("chats", JSON.stringify(updatedChats)); // Lagre chats i localStorage
            return updatedChats;
        });
    
        setActiveChat(newChat); // Sett den nyopprettede chatten som aktiv
        localStorage.setItem("activeChat", JSON.stringify(newChat)); // Lagre activeChat i localStorage
    };

    // Åpne en eksisterende samtale
    const openChat = (chatId: string) => {
      const selectedChat = chats.find((chat) => chat.id === chatId);
      if (selectedChat) {
          setActiveChat(selectedChat);
      }
    };

    const handleSendMessage = (text: string) => {
        const now = Date.now();
        
        if (isFirstChat) {
            // Første samtale, opprett en ny samtale med "Samtale 1" som tittel
            const newChat: Chat = {
                id: now.toString(),
                title: `Samtale 1`, // Tittel for første samtale
                timestamp: now, // Lagre tidspunkt for samtale
                messages: [{ id: now, text, sender: "user" }],
            };
    
            // Legger til den nye samtalen i chats
            setChats((prevChats) => {
                const updatedChats = [newChat, ...prevChats];
                localStorage.setItem("chats", JSON.stringify(updatedChats)); // Lagre chats i localStorage
                return updatedChats;
            });
    
            setActiveChat(newChat); // Sett den nyopprettede chatten som aktiv
            localStorage.setItem("activeChat", JSON.stringify(newChat)); // Lagre activeChat i localStorage
    
            // Oppdaterer isFirstChat til false etter at den første samtalen er opprettet
            setIsFirstChat(false);
    
            // Simulert bot-svar etter en liten forsinkelse
            setTimeout(() => {
                const botReply: Message = {
                    id: Date.now(),
                    text: "Beklager, jeg forstår ikke helt ennå! 🚀",
                    sender: "bot",
                };
    
                setChats((prevChats) => {
                    const updatedChatsWithBot = prevChats.map((chat) =>
                        chat.id === newChat.id
                            ? { ...chat, messages: [...chat.messages, botReply] }
                            : chat
                    );
    
                    localStorage.setItem("chats", JSON.stringify(updatedChatsWithBot));
                    return updatedChatsWithBot;
                });
    
                setActiveChat((prevActiveChat) =>
                    prevActiveChat
                        ? { ...prevActiveChat, messages: [...prevActiveChat.messages, botReply] }
                        : null
                );
            }, 1000); // Simulert bot-respons etter 1 sekund
        } else {
            // For påfølgende meldinger, legg til meldingen i eksisterende chat
            const newMessage: Message = { id: now, text, sender: "user" };
    
            setChats((prevChats) => {
                const updatedChats = prevChats.map((chat) =>
                    chat.id === activeChat?.id
                        ? { ...chat, messages: [...chat.messages, newMessage] }
                        : chat
                );
    
                localStorage.setItem("chats", JSON.stringify(updatedChats));
                return updatedChats;
            });
    
            setActiveChat((prevActiveChat) =>
                prevActiveChat ? { ...prevActiveChat, messages: [...prevActiveChat.messages, newMessage] } : null
            );
    
            // Simulert bot-svar etter 1 sekund
            setTimeout(() => {
                const botReply: Message = {
                    id: Date.now(),
                    text: "Beklager, jeg forstår ikke helt ennå! 🚀",
                    sender: "bot",
                };
    
                setChats((prevChats) => {
                    const updatedChatsWithBot = prevChats.map((chat) =>
                        chat.id === activeChat?.id
                            ? { ...chat, messages: [...chat.messages, botReply] }
                            : chat
                    );
    
                    localStorage.setItem("chats", JSON.stringify(updatedChatsWithBot));
                    return updatedChatsWithBot;
                });
    
                setActiveChat((prevActiveChat) =>
                    prevActiveChat
                        ? { ...prevActiveChat, messages: [...prevActiveChat.messages, botReply] }
                        : null
                );
            }, 1000); // Simulert bot-respons etter 1 sekund
        }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed ${
          isExpanded ? "inset-0 flex bg-white" : "bottom-16 right-4"
        }`}
      >
        {isExpanded && (
<ChatPanel
  chats={chats}
  activeChat={activeChat} // Send activeChat som en prop til ChatPanel
  onSelectChat={openChat}
  onNewChat={startNewChat}
/>
        )}
        <div
          className={`bg-white flex flex-col transition-all ${
            isExpanded
              ? "w-full max-w-[700px] h-full rounded-none mx-auto"
              : "w-[450px] h-[500px] rounded-lg border shadow-lg"
          }`}
        >
          <ChatHeader
            closeChat={closeChat}
            toggleExpand={() => setIsExpanded(!isExpanded)}
            isExpanded={isExpanded}
          />
          <div className="flex-1 overflow-y-auto p-4">
            <ChatMessages messages={activeChat ? activeChat.messages : []} />
          </div>
          <div className="p-4 bg-white">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
        {isExpanded && <NotePanel />}
      </motion.div>
    );
  };
  
  export default ChatWindow;
