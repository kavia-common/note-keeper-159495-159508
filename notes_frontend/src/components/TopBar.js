import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TopBar component renders the application header with the app name and primary actions.
 * Props:
 * - onCreate: function to create a new note
 * - onDelete: function to delete the currently selected note
 * - hasSelection: boolean indicating if a note is selected
 */
export default function TopBar({ onCreate, onDelete, hasSelection }) {
  return (
    <header className="topbar" role="banner" aria-label="Application Top Bar">
      <div className="topbar__left">
        <div className="app-logo" aria-hidden="true">📝</div>
        <h1 className="app-title">Note Keeper</h1>
      </div>
      <div className="topbar__actions" role="toolbar" aria-label="Primary actions">
        <button
          className="btn btn-primary"
          onClick={onCreate}
          aria-label="Create a new note"
        >
          + New Note
        </button>
        <button
          className="btn btn-danger"
          onClick={onDelete}
          aria-label="Delete selected note"
          disabled={!hasSelection}
          title={!hasSelection ? 'Select a note to delete' : 'Delete selected note'}
        >
          Delete
        </button>
      </div>
    </header>
  );
}
