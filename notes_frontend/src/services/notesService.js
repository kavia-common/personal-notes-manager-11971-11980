import { getSupabase } from './supabaseClient';

const TABLE = 'notes'; // Expect a table with columns: id (uuid), title (text), content (text), created_at (timestamptz), updated_at (timestamptz)

// PUBLIC_INTERFACE
export async function fetchNotes({ search = '' } = {}) {
  /** Fetches notes, optionally filtered by a case-insensitive search on title and content. */
  const supabase = getSupabase();
  try {
    let query = supabase.from(TABLE).select('*').order('updated_at', { ascending: false });

    if (search && search.trim().length > 0) {
      const s = `%${search.trim()}%`;
      // ilike on both title and content using or filter
      query = query.or(`title.ilike.${s},content.ilike.${s}`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching notes:', err);
    throw new Error('Failed to fetch notes. Please try again.');
  }
}

// PUBLIC_INTERFACE
export async function createNote({ title, content }) {
  /** Creates a new note with the given title and content. Returns the created note. */
  const supabase = getSupabase();
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from(TABLE)
      .insert([{ title: title || 'Untitled', content: content || '', created_at: now, updated_at: now }])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error creating note:', err);
    throw new Error('Failed to create note.');
  }
}

// PUBLIC_INTERFACE
export async function updateNote(id, { title, content }) {
  /** Updates an existing note. Returns the updated note. */
  const supabase = getSupabase();
  try {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from(TABLE)
      .update({ title, content, updated_at: now })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error updating note:', err);
    throw new Error('Failed to update note.');
  }
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Deletes a note by id. Returns true on success. */
  const supabase = getSupabase();
  try {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error deleting note:', err);
    throw new Error('Failed to delete note.');
  }
}
