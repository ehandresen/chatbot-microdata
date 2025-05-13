"use client";

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
import SettingsPanel from "../ChatPanel/SettingsPanel";
import React, { useState } from "react";
import { useSettingsStore } from "@/lib/SettingsStore";

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
  const { textScale } = useSettingsStore();
  const [showSettings, setShowSettings] = useState(false);

  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

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
      className={`fixed ${
        isExpanded ? "inset-0 flex bg-surface dark:bg-darkGray" : "bottom-16 right-4"
      }`}
      style={{ fontSize: `${textScale}rem` }}
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
        className={`flex flex-col transition-all ${
          isExpanded
            ? "w-full max-w-[700px] h-full rounded-none mx-auto bg-surface dark:bg-darkGray"
            : "w-[450px] h-[500px] rounded-lg border shadow-lg bg-surface dark:bg-darkGray dark:border-midGray"
        }`}
      >
        <ChatHeader
          closeChat={closeChat}
          toggleExpand={toggleExpand}
          isExpanded={isExpanded}
          openSettings={openSettings}
        />
        <div className="flex-1 overflow-y-auto p-4">
          <ChatMessages messages={activeChat ? activeChat.messages : []} />
        </div>
        <div className="p-4 bg-surface dark:bg-darkGray">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
      {isExpanded && <NotePanel />}
      {showSettings && <SettingsPanel onClose={closeSettings} />}
    </motion.div>
  );
};

export default ChatWindow;
