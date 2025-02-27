import { useState, useEffect } from "react";

const useFirstChat = () => {
  const [isFirstChat, setIsFirstChat] = useState(true);

  useEffect(() => {
    const storedChats = localStorage.getItem("chats");
    if (storedChats && JSON.parse(storedChats).length > 0) {
      setIsFirstChat(false); // ✅ Hvis det finnes samtaler, er det ikke første gang
    }
  }, []);

  return { isFirstChat, setIsFirstChat };
};

export default useFirstChat;
