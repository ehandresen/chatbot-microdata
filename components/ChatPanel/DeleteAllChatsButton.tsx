import React from "react";

interface DeleteAllChatsButtonProps {
  onDeleteAll: () => void;
}

const DeleteAllChatsButton: React.FC<DeleteAllChatsButtonProps> = ({ onDeleteAll }) => {
  return (
    <button
      onClick={onDeleteAll}
      className="w-full px-4 py-2 mt-4 bg-accent text-white font-bold rounded-full hover:bg-secondary transition"
    >
      Slett alle samtaler
    </button>
  );
};

export default DeleteAllChatsButton;
