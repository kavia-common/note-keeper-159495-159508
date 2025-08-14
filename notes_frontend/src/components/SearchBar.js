import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar provides a text input for searching notes.
 * Props:
 * - value: string
 * - onChange: function(nextValue)
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        className="input"
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search notes"
      />
    </div>
  );
}
