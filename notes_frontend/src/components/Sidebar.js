import React from 'react';
import SearchBar from './SearchBar';
import NoteListItem from './NoteListItem';

/**
 * PUBLIC_INTERFACE
 * Sidebar component renders the search input and the list of notes.
 * Props:
 * - notes: array of note objects [{ id, title, content, createdAt, updatedAt }]
 * - selectedId: id of the currently selected note
 * - onSelect: function(id) to select a note
 * - onCreate: function() to create a new note
 * - searchQuery: current search text
 * - onSearchChange: function(value) to update the search text
 */
export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  onCreate,
  searchQuery,
  onSearchChange
}) {
  return (
    <aside className="sidebar" role="complementary" aria-label="Notes Sidebar">
      <div className="sidebar__header">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <button className="btn btn-secondary btn-block" onClick={onCreate} aria-label="Create new note from sidebar">
          + New
        </button>
      </div>
      <nav className="notes-list" aria-label="Notes list">
        {notes.length === 0 ? (
          <div className="empty-list" role="note">No notes found</div>
        ) : (
          notes.map(note => (
            <NoteListItem
              key={note.id}
              note={note}
              isSelected={note.id === selectedId}
              onClick={() => onSelect(note.id)}
            />
          ))
        )}
      </nav>
    </aside>
  );
}
