import React, { useEffect, useState } from 'react';
import styles from '../styles/NoteEditor.module.css';

// PUBLIC_INTERFACE
function NoteEditor({ note, onCancel, onSave, colors, busy }) {
  /** An editor for the current note with title and content fields and Save/Cancel actions. */
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note?.id]); // update when switching notes

  const canSave = title.trim().length > 0 || content.trim().length > 0;

  return (
    <div className={styles.editor}>
      <div className={styles.formRow}>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
      </div>
      <div className={styles.formRow}>
        <textarea
          className={styles.contentInput}
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          aria-label="Note content"
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.secondaryBtn} onClick={onCancel} disabled={busy}>Cancel</button>
        <button
          className={styles.primaryBtn}
          onClick={() => onSave({ title, content })}
          disabled={!canSave || busy}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;
