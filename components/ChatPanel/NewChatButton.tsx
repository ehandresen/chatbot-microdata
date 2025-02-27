import { useState } from "react";

interface NewChatButtonProps {
  onClick: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    onClick();
    setTimeout(() => setIsLoading(false), 500); // Simulert kort delay for UX
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full p-2 rounded-md mb-4 transition ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isLoading ? "Oppretter..." : "Ny Samtale"}
    </button>
  );
};

export default NewChatButton;
