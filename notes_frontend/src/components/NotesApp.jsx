import React, { useEffect, useMemo, useState } from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import NoteEditor from './note/NoteEditor';
import NoteViewer from './note/NoteViewer';
import styles from './styles/NotesApp.module.css';
import { createNote, deleteNote, fetchNotes, updateNote } from '../services/notesService';

const defaultColors = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#FFC107',
};

/**
 * NotesApp orchestrates the layout and connects UI with the notes service (Supabase).
 * It provides:
 * - Header with search and add button
 * - Sidebar with list and delete actions
 * - Main area with view/edit modes
 */
function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');
  const [isEditing, setIsEditing] = useState(false);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load notes (and whenever search changes)
  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchNotes({ search });
        if (!ignore) {
          setNotes(data);
          if (data.length > 0 && !activeId) {
            setActiveId(data[0].id);
          } else if (data.length === 0) {
            setActiveId(null);
          }
        }
      } catch (err) {
        if (!ignore) setError(err.message || 'Unable to load notes.');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeNote = useMemo(() => notes.find(n => n.id === activeId) || null, [notes, activeId]);

  async function handleAdd() {
    setBusy(true);
    setError('');
    try {
      const newNote = await createNote({ title: 'New note', content: '' });
      setNotes(prev => [newNote, ...prev]);
      setActiveId(newNote.id);
      setIsEditing(true);
    } catch (err) {
      setError(err.message || 'Failed to add note.');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    if (!id) return;
    const confirmDelete = window.confirm('Delete this note? This cannot be undone.');
    if (!confirmDelete) return;
    setBusy(true);
    setError('');
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
      if (activeId === id) {
        // Move selection to next available note
        const remaining = notes.filter(n => n.id !== id);
        setActiveId(remaining.length ? remaining[0].id : null);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete note.');
    } finally {
      setBusy(false);
    }
  }

  async function handleSave(edit) {
    if (!activeId) return;
    setBusy(true);
    setError('');
    try {
      const updated = await updateNote(activeId, edit);
      setNotes(prev => prev.map(n => (n.id === activeId ? updated : n)));
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to save note.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.appShell}>
      <Header
        colors={defaultColors}
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
        onAdd={handleAdd}
        search={search}
        onSearch={setSearch}
        busy={busy}
      />

      <div className={styles.body}>
        <Sidebar
          colors={defaultColors}
          notes={notes}
          activeId={activeId}
          onSelect={setActiveId}
          onDelete={handleDelete}
          loading={loading}
        />

        <main className={styles.main}>
          {error && <div className={styles.error} role="alert">{error}</div>}
          {!activeNote && !loading && (
            <div className={styles.emptyState}>
              <p>No notes yet.</p>
              <button className={styles.primaryBtn} onClick={handleAdd} disabled={busy}>
                + Create your first note
              </button>
            </div>
          )}
          {activeNote && !isEditing && (
            <NoteViewer
              note={activeNote}
              onEdit={() => setIsEditing(true)}
              colors={defaultColors}
            />
          )}
          {activeNote && isEditing && (
            <NoteEditor
              note={activeNote}
              onCancel={() => setIsEditing(false)}
              onSave={handleSave}
              colors={defaultColors}
              busy={busy}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default NotesApp;
