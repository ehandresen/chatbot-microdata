import { useState, useEffect } from "react";

const useFirstChat = () => {
  const [isFirstChat, setIsFirstChat] = useState(true);

  useEffect(() => {
    const storedChats = localStorage.getItem("chats");
    if (storedChats && JSON.parse(storedChats).length > 0) {
      setIsFirstChat(false); 
    }
  }, []);

  return { isFirstChat, setIsFirstChat };
};

export default useFirstChat;
