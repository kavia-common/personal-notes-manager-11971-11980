import React from 'react';
import './App.css';
import NotesApp from './components/NotesApp';

/**
 * Root App component renders the NotesApp.
 * Theme is handled inside NotesApp; App remains minimal as entry hook.
 */
// PUBLIC_INTERFACE
function App() {
  /** This is the public entry point for the React application. */
  return (
    <div className="App" data-theme="light">
      <NotesApp />
    </div>
  );
}

export default App;
