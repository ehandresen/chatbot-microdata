import { useState } from "react";
import { FaFolder, FaEdit } from "react-icons/fa";

interface Folder {
  id: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  tags?: string[];
}

interface NoteListProps {
  notes: Note[];
  folders: Folder[];
  onEditNote: (note: Note) => void;
  onEditFolder: (folderId: string, newName: string) => void;
  onSelectFolder: (folderId: string | null) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, folders, onEditNote, onEditFolder, onSelectFolder }) => {
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [folderName, setFolderName] = useState<string>("");

  const handleFolderEdit = (folder: Folder) => {
    setEditingFolderId(folder.id);
    setFolderName(folder.name);
  };

  const handleFolderSave = (folderId: string) => {
    if (folderName.trim()) {
      onEditFolder(folderId, folderName.trim());
    }
    setEditingFolderId(null);
  };

  return (
    <div className="mt-4">
      {/* Hvis det finnes mapper, vis dem øverst */}
      {folders.length > 0 && (
        <ul className="mb-4">
          {folders.map((folder) => (
            <li
              key={folder.id}
              className="flex items-center justify-between p-2 bg-blue-100 rounded-md shadow mb-2 cursor-pointer hover:bg-blue-200"
              onClick={() => onSelectFolder(folder.id)}
            >
              <div className="flex items-center">
                <FaFolder className="mr-2 text-blue-600" />
                {editingFolderId === folder.id ? (
                  <input
                    type="text"
                    className="border rounded p-1"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    onBlur={() => handleFolderSave(folder.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleFolderSave(folder.id)}
                    autoFocus
                  />
                ) : (
                  <span>{folder.name}</span>
                )}
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleFolderEdit(folder); }}>
                <FaEdit className="text-gray-500 hover:text-gray-700" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Vis notater under mapper */}
      {notes.length === 0 ? (
        <p className="text-gray-500">Ingen notater funnet</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-2 bg-white rounded-md shadow mb-2 cursor-pointer hover:bg-gray-200 flex justify-between items-center"
              onClick={() => onEditNote(note)}
            >
              <span>{note.title}</span>
              {note.tags && (
                <div className="flex space-x-1">
                  {note.tags.map((tag) => (
                    <span key={tag} className="w-4 h-4 rounded-full" style={{ backgroundColor: tag }}></span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;