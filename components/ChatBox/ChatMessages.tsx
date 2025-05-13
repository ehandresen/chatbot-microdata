"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import MarkdownRenderer from "./MarkdownRenderer";
import { useSettingsStore } from "@/lib/SettingsStore";

interface ChatMessagesProps {
  messages?: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages = [] }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { textScale } = useSettingsStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 p-4 overflow-y-auto h-full space-y-4 bg-surface dark:bg-darkGray"
      style={{ fontSize: `${textScale}rem` }}
    >
      {messages.length === 0 ? (
        <p className="text-center text-midGray dark:text-lightGray">
          Hei! Hvordan kan jeg hjelpe deg?
        </p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
          >
            {message.sender === "bot" ? (
              <div className="bg-lightGray text-darkestGray rounded-2xl p-4 max-w-[75%] prose prose-sm leading-relaxed shadow-sm dark:bg-darkGray dark:text-white">
                <MarkdownRenderer content={message.text} />
              </div>
            ) : (
              <span className="inline-block px-4 py-2 rounded-2xl max-w-[75%] bg-accent text-textPrimary shadow-sm dark:bg-darkAccent">
                {message.text}
              </span>
            )}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
