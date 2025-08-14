import React from 'react';

/**
 * Format timestamp to a short readable string.
 * PUBLIC_INTERFACE
 * @param {number} ts - milliseconds since epoch
 * @returns {string} short human-readable date/time
 */
export function formatShortDate(ts) {
  try {
    const d = new Date(ts);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    if (sameDay) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString();
  } catch (e) {
    return '';
  }
}

/**
 * PUBLIC_INTERFACE
 * NoteListItem renders a clickable note item in the sidebar.
 * Props:
 * - note: { id, title, content, updatedAt }
 * - isSelected: boolean
 * - onClick: function
 */
export default function NoteListItem({ note, isSelected, onClick }) {
  const firstLine = (note.content || '').split('\n')[0].slice(0, 80);
  const classes = ['note-item'];
  if (isSelected) classes.push('note-item--selected');

  return (
    <button className={classes.join(' ')} onClick={onClick} aria-pressed={isSelected} aria-label={`Open note ${note.title || 'Untitled'}`}>
      <div className="note-item__header">
        <div className="note-item__title">{note.title || 'Untitled'}</div>
        <div className="note-item__date" title={new Date(note.updatedAt).toLocaleString()}>
          {formatShortDate(note.updatedAt)}
        </div>
      </div>
      <div className="note-item__snippet">{firstLine || 'No content'}</div>
    </button>
  );
}
