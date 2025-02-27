import { useState } from "react";

interface ChatSearchProps {
  onSearch: (query: string) => void;
}

const ChatSearch: React.FC<ChatSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Søk i samtaler..."
      className="w-full p-2 border rounded-md mb-4"
    />
  );
};

export default ChatSearch;
