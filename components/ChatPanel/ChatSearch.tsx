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
      className="w-full px-4 py-2 mb-4 bg-surface text-textSecondary border border-muted rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition"
    />
  );
};

export default ChatSearch;
