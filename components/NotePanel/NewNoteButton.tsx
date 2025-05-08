interface NewNoteButtonProps {
  onClick: () => void;
}

const NewNoteButton: React.FC<NewNoteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-4 rounded-full font-bold mb-4 bg-secondary text-textPrimary hover:bg-primary transition"
    >
      Nytt Notat
    </button>
  );
};

export default NewNoteButton;
