import React, { useMemo, useEffect } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import { useLocalStorage } from './hooks/useLocalStorage';
import { uid } from './utils/ids';

/**
 * Note object shape:
 * {
 *   id: string,
 *   title: string,
 *   content: string,
 *   createdAt: number,
 *   updatedAt: number
 * }
 */

/**
 * PUBLIC_INTERFACE
 * App component: Provides the main layout and state management for the notes app.
 * Features:
 * - Create, Edit, Delete, List, View, Search notes
 * - Persistent storage via localStorage
 * - Modern, minimalistic, light-themed design
 */
function App() {
  const [notes, setNotes] = useLocalStorage('notes_app_data_v1', []);
  const [selectedId, setSelectedId] = useLocalStorage('notes_app_selected_v1', null);
  const [searchQuery, setSearchQuery] = useLocalStorage('notes_app_search_v1', '');

  // Ensure the document has light theme attribute for CSS variables (light theme only)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const filteredNotes = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    const list = Array.isArray(notes) ? notes : [];
    const filtered = q
      ? list.filter(n =>
          (n.title || '').toLowerCase().includes(q) ||
          (n.content || '').toLowerCase().includes(q)
        )
      : list;
    // Sort by updatedAt desc
    return filtered.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [notes, searchQuery]);

  const selectedNote = useMemo(
    () => (Array.isArray(notes) ? notes.find(n => n.id === selectedId) : null) || null,
    [notes, selectedId]
  );

  // PUBLIC_INTERFACE
  // Create a new note and select it
  const handleCreate = () => {
    const now = Date.now();
    const newNote = {
      id: uid(),
      title: 'New note',
      content: '',
      createdAt: now,
      updatedAt: now
    };
    setNotes(prev => [newNote, ...(Array.isArray(prev) ? prev : [])]);
    setSelectedId(newNote.id);
  };

  // PUBLIC_INTERFACE
  // Update fields on the selected note (autosave)
  const handleUpdate = (partial) => {
    if (!selectedNote) return;
    setNotes(prev => {
      const list = Array.isArray(prev) ? prev : [];
      return list.map(n => {
        if (n.id !== selectedNote.id) return n;
        return {
          ...n,
          ...partial,
          updatedAt: Date.now()
        };
      });
    });
  };

  // PUBLIC_INTERFACE
  // Delete currently selected note after confirmation
  const handleDelete = () => {
    if (!selectedNote) return;
    const title = selectedNote.title || 'Untitled';
    const ok = window.confirm(`Delete note "${title}"? This action cannot be undone.`);
    if (!ok) return;
    setNotes(prev => {
      const list = Array.isArray(prev) ? prev : [];
      const filtered = list.filter(n => n.id !== selectedNote.id);
      // choose a new selection if any
      const next = filtered[0] ? filtered[0].id : null;
      setSelectedId(next);
      return filtered;
    });
  };

  // PUBLIC_INTERFACE
  // Select a note by id
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  // PUBLIC_INTERFACE
  // Update search text
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <div className="app-shell">
      <TopBar
        onCreate={handleCreate}
        onDelete={handleDelete}
        hasSelection={!!selectedNote}
      />
      <div className="content">
        <Sidebar
          notes={filteredNotes}
          selectedId={selectedId}
          onSelect={handleSelect}
          onCreate={handleCreate}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <NoteEditor note={selectedNote} onChange={handleUpdate} />
      </div>
    </div>
  );
}

export default App;
