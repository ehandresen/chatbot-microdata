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
        className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-darkestGray placeholder-midGray"
      />
      <button
        onClick={handleSend}
        className="px-6 py-2 font-bold hover:bg-lightBlueAccent transition"
      >
       <img
    src="/images/Send-icon.png"
    alt="Send"
    className="w-5 h-5"
  />
      </button>
    </div>
  );
};

export default ChatInput;
