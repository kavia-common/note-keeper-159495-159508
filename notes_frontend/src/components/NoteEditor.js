import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteEditor renders inputs for editing a note's title and content.
 * Props:
 * - note: { id, title, content, createdAt, updatedAt } | null
 * - onChange: function(partial) where partial is { title?: string, content?: string }
 */
export default function NoteEditor({ note, onChange }) {
  if (!note) {
    return (
      <div className="empty-state" role="region" aria-label="No note selected">
        <div className="empty-state__icon" aria-hidden="true">🗒️</div>
        <h2 className="empty-state__title">No note selected</h2>
        <p className="empty-state__subtitle">Select a note from the left or create a new one.</p>
      </div>
    );
  }

  return (
    <section className="editor" role="main" aria-label="Note editor">
      <input
        className="editor__title"
        value={note.title || ''}
        placeholder="Title"
        onChange={(e) => onChange({ title: e.target.value })}
        aria-label="Note title"
      />
      <div className="editor__meta" aria-label="Note meta information">
        <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
        <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
      </div>
      <textarea
        className="editor__content"
        value={note.content || ''}
        placeholder="Start typing your note..."
        onChange={(e) => onChange({ content: e.target.value })}
        aria-label="Note content"
      />
    </section>
  );
}
