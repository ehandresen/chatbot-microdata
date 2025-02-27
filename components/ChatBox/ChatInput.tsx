import useChatInput from "@/hooks/useChatInput";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const { message, setMessage, handleSend, handleKeyDown } = useChatInput(onSendMessage);

  return (
    <div className="flex mt-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Skriv en melding..."
        className="flex-1 p-2 border rounded-l-md focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
