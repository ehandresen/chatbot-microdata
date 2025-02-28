import { useState, useEffect } from "react";
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import NewNoteButton from "./NewNoteButton";
import NewFolderButton from "./NewFolderButton";

interface Note {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  tags?: string[];
}

interface Folder {
  id: string;
  name: string;
  parentFolderId?: string;
}

const NotePanel = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    const savedFolders = localStorage.getItem("folders");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const handleCreateNote = () => {
    setIsCreating(true);
    setSelectedNote(null);
  };

  const handleSaveNote = (note: Note) => {
    if (note.id) {
      setNotes((prev) => prev.map((n) => (n.id === note.id ? note : n)));
    } else {
      const newNote = { ...note, id: Date.now().toString(), folderId: selectedFolder };
      setNotes((prev) => [...prev, newNote]);
    }
    setIsCreating(false);
    setSelectedNote(null);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsCreating(true);
  };

  const handleCreateFolder = () => {
    const newFolder = { id: Date.now().toString(), name: "Ny mappe", parentFolderId: selectedFolder };
    setFolders((prev) => [...prev, newFolder]);
  };

  const handleEditFolder = (folderId: string, newName: string) => {
    setFolders((prev) => prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f)));
  };

  const handleGoBack = () => {
    const currentFolder = folders.find((folder) => folder.id === selectedFolder);
    setSelectedFolder(currentFolder?.parentFolderId || null);
  };

  return (
    <div className="w-1/4 h-full bg-gray-100 p-4 border-l flex flex-col">
      {selectedFolder && (
        <button onClick={handleGoBack} className="mb-2 bg-gray-300 p-2 rounded-md">Tilbake</button>
      )}
      {isCreating ? (
        <NewNote note={selectedNote} onSave={handleSaveNote} onCancel={() => setIsCreating(false)} />
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">
            {selectedFolder ? folders.find((folder) => folder.id === selectedFolder)?.name : "Notater"}
          </h2>
          <NewFolderButton onClick={handleCreateFolder} />
          <NewNoteButton onClick={handleCreateNote} />
          <NoteList 
            notes={notes.filter((note) => note.folderId === selectedFolder)} 
            folders={folders.filter((folder) => folder.parentFolderId === selectedFolder)} 
            onEditNote={handleEditNote} 
            onEditFolder={handleEditFolder} 
            onSelectFolder={setSelectedFolder} 
          />
        </>
      )}
    </div>
  );
};

export default NotePanel;