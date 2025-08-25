import React from 'react';
import styles from '../styles/Header.module.css';

// PUBLIC_INTERFACE
function Header({ colors, theme, onToggleTheme, onAdd, search, onSearch, busy }) {
  /** Header with app title, search box, add note button, and theme toggle. */
  return (
    <header className={styles.header} style={{ borderBottomColor: colors.secondary }}>
      <div className={styles.left}>
        <div className={styles.brand} style={{ color: colors.primary }}>
          Notes
        </div>
      </div>
      <div className={styles.center}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <div className={styles.right}>
        <button className={styles.primaryBtn} onClick={onAdd} disabled={busy} title="Add note">
          + Add
        </button>
        <button className={styles.iconBtn} onClick={onToggleTheme} title="Toggle theme" aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default Header;
