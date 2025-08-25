import React from 'react';
import styles from '../styles/NoteViewer.module.css';

// PUBLIC_INTERFACE
function NoteViewer({ note, onEdit, colors }) {
  /** Displays the selected note with an Edit button. */
  return (
    <div className={styles.viewer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{note.title || 'Untitled'}</h2>
        <button className={styles.primaryBtn} onClick={onEdit}>Edit</button>
      </div>
      <article className={styles.content}>
        {(note.content || '').length ? note.content : <em>No content</em>}
      </article>
    </div>
  );
}

export default NoteViewer;
