const ChatInput = () => {
    return (
      <div className="flex mt-2">
        <input
          type="text"
          placeholder="Skriv en melding..."
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
          Send
        </button>
      </div>
    );
  };
  
  export default ChatInput;
  