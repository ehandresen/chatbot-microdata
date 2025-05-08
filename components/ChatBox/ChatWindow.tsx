import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatPanel from "../ChatPanel/ChatPanel";
import NotePanel from "../NotePanel/NotePanel";
import useChat from "@/hooks/useChat";
import useSendMessage from "@/hooks/useSendMessage";
import useChatWindowState from "@/hooks/useChatWindowState";
import useDeleteChats from "@/hooks/useDeleteChats";

interface ChatWindowProps {
  closeChat: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ closeChat }) => {
  const {
    chats,
    activeChat,
    isFirstChat,
    setChats,
    setActiveChat,
    setIsFirstChat,
    startNewChat,
    openChat,
  } = useChat();

  const { isExpanded, toggleExpand } = useChatWindowState();

  const { handleSendMessage } = useSendMessage({
    chats,
    activeChat,
    isFirstChat,
    setChats,
    setActiveChat,
    setIsFirstChat,
  });

  const { handleDeleteAllChats } = useDeleteChats({ setChats, setActiveChat });

  const handleRenameChat = (chatId: string, newTitle: string) => {
    const updated = chats.map((chat) =>
      chat.id === chatId ? { ...chat, title: newTitle.trim() } : chat
    );
    setChats(updated);
    localStorage.setItem("chats", JSON.stringify(updated));
  };

  const handleDeleteChat = (chatId: string) => {
    const confirmed = window.confirm("Er du sikker på at du vil slette denne samtalen?");
    if (!confirmed) return;

    const updated = chats.filter((chat) => chat.id !== chatId);
    setChats(updated);
    localStorage.setItem("chats", JSON.stringify(updated));

    if (activeChat?.id === chatId) {
      setActiveChat(null);
      localStorage.removeItem("activeChat");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed ${isExpanded ? "inset-0 flex bg-white" : "bottom-16 right-4"}`}
    >
      {isExpanded && (
        <ChatPanel
          chats={chats}
          activeChat={activeChat}
          onSelectChat={openChat}
          onNewChat={startNewChat}
          onDeleteAllChats={handleDeleteAllChats}
          setChats={setChats}
          setActiveChat={setActiveChat}
          onRenameChat={handleRenameChat}
          onDeleteChat={handleDeleteChat}
        />
      )}
      <div
        className={`bg-white flex flex-col transition-all ${
          isExpanded
            ? "w-full max-w-[700px] h-full rounded-none mx-auto"
            : "w-[450px] h-[500px] rounded-lg border shadow-lg"
        }`}
      >
        <ChatHeader closeChat={closeChat} toggleExpand={toggleExpand} isExpanded={isExpanded} />
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
