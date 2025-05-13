// ChatHeader.tsx - Window/Chat functionality buttons
interface ChatHeaderProps {
  closeChat: () => void;
  toggleExpand: () => void;
  isExpanded: boolean;
  openSettings: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  closeChat,
  toggleExpand,
  isExpanded,
  openSettings,
}) => {
  
  return (
    <div className="flex justify-between items-center bg-primary text-textPrimary px-3 py-3 rounded-t-xl shadow">

      {/* Chatbot logo and name "Orien" */}
      <div className="flex items-center space-x-2">
        <img src="/images/OrienFace-icon.png" alt="Orien Icon" className="w-10 h-10" />
        <h2 className="text-lg font-bold">Orien</h2>
      </div>

      {/* Collection of window/chatbot functionality buttons */}
      <div className="flex space-x-2">
        {/* Help Button, hover displays information about Orien Chatbot */}
        <div className="relative group">
          <button>
            <img src="/images/Help-icon.png" alt="Help" className="w-10 h-10" />
          </button>
          {/* Div holding text about chatbot Orien */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded bg-darkestGray text-textPrimary 
          text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            <p>Om Orien</p>
            <div className="h-px my-1 bg-textPrimary opacity-50" />
            <p>Orien er en chatbot laget for at du raskt og enkelt</p>
            <p>kan finne riktige variabler og kommandoer,</p>
            <p>som du kan bruke for å hente frem</p>
            <p>statistikk og data i analyseverktøyet her på microdata.no!</p>
          </div>
        </div>

        {/* Expand button, onClick expands/un-expands chatbot, dynamically changes icon shown */}
        <button onClick={toggleExpand}>
          <img
            src={isExpanded ? "/images/PopIn-icon.png" : "/images/PopOut-icon.png"}
            alt={isExpanded ? "PopIn" : "PopOut"} className="w-10 h-10"
          />
        </button>

        {/* Settings button, onClick opens settings */}
        <button onClick={openSettings}>
          <img src="/images/Settings-icon.png" alt="Settings" className="w-10 h-10" />
        </button>

        {/* Close button, onClick closes down chatbot */}
        <button onClick={closeChat}>
          <img src="/images/Close-icon.png" alt="Close" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
