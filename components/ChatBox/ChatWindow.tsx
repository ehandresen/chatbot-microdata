import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatPanel from "../ChatPanel/ChatPanel";
import NotePanel from "../NotePanel";
import useChat from "@/hooks/useChat";
import useSendMessage from "@/hooks/useSendMessage";
import useChatWindowState from "@/hooks/useChatWindowState"; // ✅ Ny hook for ekspandering
import useDeleteChats from "@/hooks/useDeleteChats"; // ✅ Ny hook for sletting

interface ChatWindowProps {
  closeChat: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ closeChat }) => {
  const {
    chats,
    activeChat,
    isFirstChat, // ✅ Legger til isFirstChat
    setChats,
    setActiveChat,
    setIsFirstChat, // ✅ Legger til setIsFirstChat
    startNewChat,
    openChat,
  } = useChat();

  const { isExpanded, toggleExpand } = useChatWindowState(); // ✅ Bruker ny hook
  const { handleSendMessage } = useSendMessage({
    chats,
    activeChat,
    isFirstChat, // ✅ Sender isFirstChat til useSendMessage
    setChats,
    setActiveChat,
    setIsFirstChat, // ✅ Sender setIsFirstChat til useSendMessage
  });
  const { handleDeleteAllChats } = useDeleteChats({ setChats, setActiveChat }); // ✅ Bruker ny hook

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
          onDeleteAllChats={handleDeleteAllChats} // ✅ Sender prop til ChatPanel
        />
      )}
      <div
        className={`bg-white flex flex-col transition-all ${
          isExpanded ? "w-full max-w-[700px] h-full rounded-none mx-auto" : "w-[450px] h-[500px] rounded-lg border shadow-lg"
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
