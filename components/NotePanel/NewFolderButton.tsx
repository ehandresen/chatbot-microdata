interface NewFolderButtonProps {
  onClick: () => void;
}

const NewFolderButton: React.FC<NewFolderButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-4 rounded-full font-bold mb-2 bg-primary text-textPrimary hover:bg-secondary transition flex items-center justify-center"
    >
      ➕ Ny Mappe
    </button>
  );
};

export default NewFolderButton;
