import React from 'react';
import styles from '../styles/Sidebar.module.css';

// PUBLIC_INTERFACE
function Sidebar({ colors, notes, activeId, onSelect, onDelete, loading }) {
  /** Sidebar listing notes with active state and delete control. */
  return (
    <aside className={styles.sidebar} aria-label="Notes list">
      {loading && <div className={styles.loading}>Loading…</div>}
      {!loading && notes.length === 0 && <div className={styles.empty}>No notes</div>}

      <ul className={styles.list}>
        {notes.map((n) => {
          const isActive = n.id === activeId;
          return (
            <li
              key={n.id}
              className={`${styles.item} ${isActive ? styles.active : ''}`}
              onClick={() => onSelect(n.id)}
            >
              <div className={styles.itemMain}>
                <div className={styles.title} title={n.title}>
                  {n.title || 'Untitled'}
                </div>
                <div className={styles.preview} title={n.content}>
                  {(n.content || '').slice(0, 60)}
                </div>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(n.id);
                }}
                title="Delete note"
                aria-label="Delete note"
              >
                🗑
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
