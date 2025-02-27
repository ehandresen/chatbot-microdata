const NotePanel = () => {
    return (
      <div className="w-1/4 h-full bg-gray-100 p-4 border-l">
        <h2 className="text-lg font-semibold mb-4">Notater</h2>
        <input
          type="text"
          placeholder="Søk i notater..."
          className="w-full p-2 border rounded-md mb-4"
        />
        <button className="w-full bg-green-600 text-white p-2 rounded-md mb-4">Nytt Notat</button>
        <h3 className="text-md font-medium mb-2">Organiser</h3>
        <ul>
          <li className="p-2 bg-white rounded-md shadow mb-2">Kategori 1</li>
          <li className="p-2 bg-white rounded-md shadow mb-2">Kategori 2</li>
        </ul>
      </div>
    );
  };
  
  export default NotePanel;