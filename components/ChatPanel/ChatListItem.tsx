interface Chat {
    id: string;
    title: string; // Dato som tittel
    timestamp: number; // Tidspunkt for samtale
  }
  interface ChatListItemProps {
    chat: Chat;
    isActive: boolean; // Legg til isActive som en propp
    onClick: () => void;
  }
  
  const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
      const formattedDate = new Date(chat.timestamp).toLocaleDateString("no-NO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
  
      const formattedTime = new Date(chat.timestamp).toLocaleTimeString("no-NO", {
        hour: "2-digit",
        minute: "2-digit",
      });
  
      // Dynamisk styling: bruker Tailwind CSS-klasser
      const isActiveClass = isActive ? "border-2 border-blue-500 bg-blue-50" : "bg-white"; // Lys bakgrunn og tykkere border for aktiv chat
  
      return (
        <div
          onClick={onClick}
          className={`flex justify-between items-center p-3 rounded-md shadow cursor-pointer hover:bg-gray-200 transition ${isActiveClass}`}
        >
          <div>
            <p className="font-medium">{chat.title}</p>
            <p className="text-xs text-gray-500">{formattedDate} - {formattedTime}</p>
          </div>
        </div>
      );
  };
  
  export default ChatListItem;
  