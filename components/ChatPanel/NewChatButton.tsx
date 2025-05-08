import { useState } from "react";

interface NewChatButtonProps {
  onClick: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    onClick();
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full py-2 px-4 rounded-full font-bold transition ${
        isLoading
          ? "bg-muted text-darkGray cursor-not-allowed"
          : "bg-primary text-textPrimary hover:bg-secondary"
      }`}
    >
      {isLoading ? "Oppretter..." : "Ny Samtale"}
    </button>
  );
};

export default NewChatButton;
