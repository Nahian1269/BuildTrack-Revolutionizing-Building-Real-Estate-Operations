import React, { useState, useEffect } from 'react';
import { FileText, Save, Plus, X, Edit3 } from 'lucide-react';

const NotePad = () => {
    const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState('');


  useEffect(() => {
    const savedNotes = localStorage.getItem('notepad-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notepad-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote.trim(),
        timestamp: new Date().toLocaleString(),
        lastModified: new Date().toLocaleString(),
      };
      setNotes(prev => [note, ...prev]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const startEditing = (note) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (editContent.trim()) {
      setNotes(prev => prev.map(note => 
        note.id === editingNote 
          ? { ...note, content: editContent.trim(), lastModified: new Date().toLocaleString() }
          : note
      ));
    }
    setEditingNote(null);
    setEditContent('');
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setEditContent('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      action();
    }
  };

  return (
    <div className="bg-white w-4/5 mt-10 text-black rounded-4xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-gray-900">Project Notes</h3>
      </div>
      <div className="mb-4">
        <div className="relative">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addNote)}
            placeholder="Add a new note... (Ctrl+Enter to save)"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows="3"
          />
          <button
            onClick={addNote}
            disabled={!newNote.trim()}
            className="absolute bottom-2 right-2 p-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No notes yet. Add your first note above!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-gray-50 rounded-lg p-4 group hover:bg-gray-100 transition-colors">
              {editingNote === note.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                    className="w-full p-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    rows="3"
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={saveEdit}
                      className="flex items-center space-x-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded transition-colors"
                    >
                      <Save className="h-3 w-3" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                    >
                      <X className="h-3 w-3" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-gray-900 whitespace-pre-wrap break-words">{note.content}</p>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <button
                        onClick={() => startEditing(note)}
                        className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit note"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete note"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Created: {note.timestamp}</span>
                    {note.lastModified !== note.timestamp && (
                      <span>Modified: {note.lastModified}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {notes.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setNotes([])}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            Clear All Notes
          </button>
        </div>
      )}
    </div>
  );
};
export default NotePad;