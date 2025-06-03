// Chatbubble

interface ChatToggleButtonProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ toggleChat }) => {
  return (
    <button
  onClick={toggleChat}
  className="w-[65px] h-[65px] flex items-center justify-center rounded-full shadow-lg hover:scale-110 hover:shadow-blue-400/40 hover:shadow-xl transition-transform duration-200 ease-in-out"
  aria-label="Toggle chat"
>
  <img
    src="/images/ChatBubble-icon.png"
    alt="Chat Bubble"
    className="w-15 h-15 transform scale-x[-1]"
  />
</button>

  );
};

export default ChatToggleButton;
