"use client";
import { useState } from "react";
import ChatToggleButton from "./ChatToggleButton";
import ChatWindow from "./ChatWindow";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-2 right-4 z-5">
      <ChatToggleButton isOpen={isOpen} toggleChat={() => setIsOpen(!isOpen)} />
      {isOpen && <ChatWindow closeChat={() => setIsOpen(false)} />}
    </div>
  );
};

export default ChatBox;
