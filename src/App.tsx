import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getUserLogged, getAccessToken, getActiveNotes, deleteNote, archiveNote, unarchiveNote } from './utils/network-data';
import type { Note } from './utils/NoteType';
import NoteHeader from './components/NoteHeader';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddNewNotePage from './pages/AddNewNotePage';
import ArchivedPage from './pages/ArchivedPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthenticatedApp: React.FC<{
  notes: Note[];
  user: User | null;
  onDeleteNote: (id: string) => void;
  onArchiveNote: (id: string) => void;
  onUnarchiveNote: (id: string) => void;
  onAddNewNote: (note: Note) => void;
  handleLogout: () => void;
}> = ({ notes, user, onDeleteNote, onArchiveNote, onUnarchiveNote, handleLogout, onAddNewNote }) => {
  return (
    <>
      <NoteHeader user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          <HomePage
            notes={notes}
            onSearchChange={(query) => console.log(`Search query: ${query}`)}
            onArchiveNote={onArchiveNote}
            onUnarchiveNote={onUnarchiveNote}
            onDeleteNote={onDeleteNote}
          />
        } />
        <Route path="/notes/:id" element={<DetailPage
          onDelete={onDeleteNote}
          onArchive={onArchiveNote}
          onUnarchive={onUnarchiveNote}
        />} />
        <Route path="/notes/new" element={<AddNewNotePage
          onNoteAdded={onAddNewNote}
        />} />
        <Route path="/archived" element={<ArchivedPage notes={notes} onUnarchiveNote={onUnarchiveNote} onDeleteNote={onDeleteNote} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

const UnauthenticatedApp: React.FC<{
  onLoginSuccess: (accessToken: string) => void;
}> = ({ onLoginSuccess }) => {
  return (
    <div className="notes-app p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <main>
          <h1 className="text-center text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Selamat Datang di Aplikasi Catatan
          </h1>
          <p className="text-center mb-4 text-gray-600 dark:text-gray-300">
            Silakan masuk atau daftar untuk melanjutkan
          </p>
          <Routes>
            <Route path="/*" element={<LoginPage onLogin={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUser(null);
    setNotes([]);
    navigate('/login');
  };

  const fetchNotes = React.useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const { data, error } = await getActiveNotes();
      if (error) {
        console.error("Failed to fetch notes:", error);
        return;
      }
      console.log("Notes fetched successfully:", data);
      setNotes(data || []);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  }, [isAuthenticated]);

  const onLoginSuccess = async (accessToken: string) => {
    console.log("Login success, token received:", accessToken.substring(0, 20) + "...");

    try {
      const savedToken = getAccessToken();
      if (!savedToken) {
        console.error("Token not found in localStorage after login!");
        return;
      }

      console.log("Getting user data...");
      const { data: userData, error } = await getUserLogged();

      if (error || !userData) {
        console.error('Failed to fetch user data:', error);
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      console.log("User data received:", userData);

      setUser(userData);
      setIsAuthenticated(true);
      setIsCheckingAuth(false);

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      localStorage.removeItem('accessToken');
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id)
      .then(({ error }) => {
        if (error) {
          console.error("Failed to delete note:", error);
        } else {
          setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
          console.log("Note deleted successfully");
        }
      })
      .catch(err => {
        console.error("Error deleting note:", err);
      }
      );
  };

  const handleArchiveNote = async (id: string) => {
    try {
      const { error } = await archiveNote(id);
      if (error) {
        console.error("Failed to archive note:", error);
      } else {
        setNotes(prevNotes => prevNotes.map(note =>
          note.id === id ? { ...note, archived: true } : note
        ));
        console.log("Note archived successfully");
      }
    } catch (err) {
      console.error("Error archiving note:", err);
    }
  };

  const handleAddNewNote = async (note: Note) => {
    setNotes(prevNotes => [...prevNotes, note]);
  }

  const handleUnarchiveNote = async (id: string) => {
    try {
      const { error } = await unarchiveNote(id);
      if (error) {
        console.error("Failed to unarchive note:", error);
      } else {
        setNotes(prevNotes => prevNotes.map(note =>
          note.id === id ? { ...note, archived: false } : note
        ));
        console.log("Note unarchived successfully");
      }
    } catch (err) {
      console.error("Error unarchiving note:", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication status...");

      const token = getAccessToken();
      if (!token) {
        console.log("No token found");
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      console.log("Token found, verifying with server...");

      try {
        const { data, error } = await getUserLogged();
        if (!error && data) {
          console.log("User verified:", data);
          setUser(data);
          setIsAuthenticated(true);
        } else {
          console.log("Token invalid or expired:", error);
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated, fetchNotes]);

  if (isCheckingAuth) {
    return (
      <div className="notes-app p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-300">
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <AuthenticatedApp
          notes={notes}
          user={user}
          onDeleteNote={handleDeleteNote}
          onArchiveNote={handleArchiveNote}
          onUnarchiveNote={handleUnarchiveNote}
          handleLogout={handleLogout}
          onAddNewNote={handleAddNewNote}
        />
      ) : (
        <UnauthenticatedApp onLoginSuccess={onLoginSuccess} />
      )}
    </div>
  );
};

export default App;