interface NewFolderButtonProps {
    onClick: () => void;
  }
  
  const NewFolderButton: React.FC<NewFolderButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="w-full bg-blue-600 text-white p-2 rounded-md mb-4 flex items-center justify-center"
      >
        ➕ Ny Mappe
      </button>
    );
  };
  
  export default NewFolderButton;
  