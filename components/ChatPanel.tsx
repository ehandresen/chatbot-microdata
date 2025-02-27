const ChatPanel = () => {
    return (
      <div className="w-1/4 h-full bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Tidligere Samtaler</h2>
        <input
          type="text"
          placeholder="Søk i samtaler..."
          className="w-full p-2 border rounded-md mb-4"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded-md mb-4">Ny Samtale</button>
        <h3 className="text-md font-medium mb-2">Prosjekter</h3>
        <ul>
          <li className="p-2 bg-white rounded-md shadow mb-2">Prosjekt 1</li>
          <li className="p-2 bg-white rounded-md shadow mb-2">Prosjekt 2</li>
        </ul>
      </div>
    );
  };
  
  export default ChatPanel;