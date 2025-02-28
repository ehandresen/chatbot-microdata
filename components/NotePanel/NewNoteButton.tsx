interface NewNoteButtonProps {
    onClick: () => void;
  }
  
  const NewNoteButton: React.FC<NewNoteButtonProps> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="w-full bg-green-600 text-white p-2 rounded-md mb-4"
      >
        Nytt Notat
      </button>
    );
  };
  
  export default NewNoteButton;
  