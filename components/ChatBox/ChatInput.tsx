import useChatInput from "@/hooks/useChatInput";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const { message, setMessage, handleSend, handleKeyDown } = useChatInput(onSendMessage);

  return (
    <div className="flex mt-2 rounded-full overflow-hidden shadow border border-muted bg-surface">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Skriv en melding..."
        className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-textSecondary placeholder-midGray"
      />
      <button
        onClick={handleSend}
        className="bg-accent text-white px-6 py-2 font-bold hover:bg-secondary transition"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
