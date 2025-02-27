import React from "react";

interface DeleteAllChatsButtonProps {
  onDeleteAll: () => void;
}

const DeleteAllChatsButton: React.FC<DeleteAllChatsButtonProps> = ({ onDeleteAll }) => {
  return (
    <button
      onClick={onDeleteAll}
      className="w-full px-4 py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
    >
      Slett alle samtaler
    </button>
  );
};

export default DeleteAllChatsButton;
