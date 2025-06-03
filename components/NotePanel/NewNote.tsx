import { useState } from "react";

interface Note {
  id?: string;
  title: string;
  content: string;
  folderId?: string;
  tags?: string[];
}

interface NewNoteProps {
  note?: Note;
  onSave: (note: Note) => void;
  onCancel: () => void;
  selectedFolder: string | null;
}

const colorOptions = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F6"];

const NewNote: React.FC<NewNoteProps> = ({ note, onSave, onCancel, selectedFolder }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState<string[]>(note?.tags || []);

  const toggleTag = (color: string) => {
    setTags((prev) =>
      prev.includes(color) ? prev.filter((t) => t !== color) : [...prev, color]
    );
  };

  const handleSave = () => {
    onSave({ id: note?.id || undefined, title, content, folderId: selectedFolder, tags });
  };

  return (
    <div className="flex flex-col p-4 bg-white h-full">
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-2"
        placeholder="Tittel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded-md mb-2"
        placeholder="Skriv notatet ditt her..."
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Fargevalg for tags */}
      <div className="flex space-x-2 mb-4">
        {colorOptions.map((color) => (
          <div
            key={color}
            className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
              tags.includes(color) ? "border-black" : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => toggleTag(color)}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md">
          Avbryt
        </button>
        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md">
          Lagre
        </button>
      </div>
    </div>
  );
};

export default NewNote;
