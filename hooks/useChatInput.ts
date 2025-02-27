import { useState } from "react";

const useChatInput = (onSendMessage: (message: string) => void) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSendMessage(message);
    setMessage(""); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return {
    message,
    setMessage,
    handleSend,
    handleKeyDown,
  };
};

export default useChatInput;
