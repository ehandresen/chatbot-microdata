import { useState } from "react";

const useChatWindowState = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return { isExpanded, toggleExpand };
};

export default useChatWindowState;
