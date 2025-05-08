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

const NoteList: React.FC<NoteListProps> = ({
  notes,
  folders,
  onEditNote,
  onEditFolder,
  onSelectFolder,
}) => {
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
      {/* Folders */}
      {folders.length > 0 && (
        <ul className="mb-4">
          {folders.map((folder) => (
            <li
              key={folder.id}
              className="flex items-center justify-between p-2 bg-lightGray rounded-md shadow-sm mb-2 cursor-pointer hover:bg-muted transition"
              onClick={() => onSelectFolder(folder.id)}
            >
              <div className="flex items-center">
                <FaFolder className="mr-2 text-primary" />
                {editingFolderId === folder.id ? (
                  <input
                    type="text"
                    className="border border-border rounded px-2 py-1 text-sm"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    onBlur={() => handleFolderSave(folder.id)}
                    onKeyDown={(e) => e.key === "Enter" && handleFolderSave(folder.id)}
                    autoFocus
                  />
                ) : (
                  <span className="text-textSecondary">{folder.name}</span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFolderEdit(folder);
                }}
              >
                <FaEdit className="text-midGray hover:text-darkGray transition" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Notes */}
      {notes.length === 0 ? (
        <p className="text-midGray">Ingen notater funnet</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-2 bg-surface rounded-md shadow-sm mb-2 cursor-pointer hover:bg-muted transition flex justify-between items-center"
              onClick={() => onEditNote(note)}
            >
              <span className="text-textSecondary">{note.title}</span>
              {note.tags && (
                <div className="flex space-x-1">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: tag }}
                    ></span>
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
