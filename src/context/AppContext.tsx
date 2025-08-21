import React, { useEffect } from "react";

type themeType = "light" | "dark";
type LanguageType = "en" | "id";

interface AppContextType {
    theme: themeType;
    language: LanguageType;
    setTheme: (theme: themeType) => void;
    setLanguage: (language: LanguageType) => void;
    t: (key: string) => string;
}

const locale: Record<LanguageType, { [key: string]: string }> = {
    id: {
        // Navigation & Header
        'nav.home': 'Beranda',
        'nav.archived': 'Terarsip',
        'nav.addNote': 'Tambah Catatan',
        'nav.logout': 'Keluar',
        'nav.profile': 'Profil',

        // breadcrumb
        'breadcrumb.notes': 'Catatan',
        'breadcrumb.archived': 'Terarsip',
        'breadcrumb.addNote': 'Tambah Catatan',

        // Authentication
        'auth.welcome': 'Selamat Datang di Aplikasi Catatan',
        'auth.subtitle': 'Silakan masuk atau daftar untuk melanjutkan',
        'auth.login': 'Masuk',
        'auth.noAccount': 'Belum punya akun?',
        'auth.register': 'Daftar',
        'auth.email': 'Email',
        'auth.emailPlaceholder': 'Masukkan alamat email Anda',
        'auth.password': 'Kata Sandi',
        'auth.passwordPlaceholder': 'Masukkan kata sandi Anda',
        'auth.name': 'Nama',
        'auth.namePlaceholder': 'Masukkan nama Anda',
        'auth.loginButton': 'Masuk',
        'auth.registerButton': 'Daftar',
        'auth.alreadyHaveAccount': 'Sudah punya akun?',
        'auth.registerHere': 'Daftar di sini',
        'auth.loginHere': 'Masuk di sini',
        'auth.loginFailed': 'Email atau kata sandi salah',
        'auth.registerFailed': 'Pendaftaran gagal. Silakan coba lagi.',

        // Notes
        'notes.title': 'Catatan Pribadi',
        'notes.searchPlaceholder': 'Cari catatan...',
        'notes.noNotes': 'Tidak ada catatan',
        'notes.addNote': 'Tambah Catatan Baru',
        'notes.addNoteDescription': 'Buat catatan baru untuk menyimpan ide, pemikiran, atau informasi penting Anda.',
        'notes.noteTitle': 'Judul Catatan',
        'notes.noteBody': 'Isi Catatan',
        'notes.save': 'Simpan',
        'notes.cancel': 'Batal',
        'notes.delete': 'Hapus',
        'notes.archive': 'Arsip',
        'notes.unarchive': 'Batal Arsip',
        'notes.back': 'Kembali',
        'notes.archivedNotes': 'Catatan Terarsip',
        'notes.activeNotes': 'Catatan Aktif',
        'notes.noNotesFound': 'Tidak ada catatan yang ditemukan',
        'notes.noArchivedNotes': 'Tidak ada catatan terarsip',

        // Add Note Page
        'addNote.title': 'Tambah Catatan Baru',
        'addNote.description': 'Buat catatan baru untuk menyimpan ide, pemikiran, atau informasi penting Anda.',
        'addNote.titlePlaceholder': 'Masukkan judul catatan...',
        'addNote.bodyPlaceholder': 'Tulis isi catatan di sini...',

        // Messages
        'message.loading': 'Memuat...',
        'message.checkingAuth': 'Memeriksa autentikasi...',
        'message.somethingWrong': 'Terjadi kesalahan. Silakan coba lagi.',
        'message.noteDeleted': 'Catatan berhasil dihapus',
        'message.noteArchived': 'Catatan berhasil diarsipkan',
        'message.noteUnarchived': 'Catatan berhasil dipulihkan dari arsip',

        // Buttons
        'button.goBack': 'Kembali',
        'button.backToHome': 'Kembali ke Beranda',

        // Errors
        'error.pageNotFound': '404 - Halaman tidak ditemukan',
        'error.bodyPageNotFound': 'Halaman yang Anda cari tidak ada',
    },
    en: {
        // Navigation & Header
        'nav.home': 'Home',
        'nav.archived': 'Archived',
        'nav.addNote': 'Add Note',
        'nav.logout': 'Logout',
        'nav.profile': 'Profile',

        // breadcrumb
        'breadcrumb.notes': 'Notes',
        'breadcrumb.archived': 'Archived',
        'breadcrumb.addNote': 'Add Note',

        // Authentication
        'auth.welcome': 'Welcome to the Note App',
        'auth.subtitle': 'Please log in or register to continue',
        'auth.login': 'Login',
        'auth.noAccount': 'Don\'t have an account?',
        'auth.register': 'Register',
        'auth.email': 'Email',
        'auth.emailPlaceholder': 'Enter your email address',
        'auth.password': 'Password',
        'auth.passwordPlaceholder': 'Enter your password',
        'auth.name': 'Name',
        'auth.namePlaceholder': 'Enter your name',
        'auth.loginButton': 'Login',
        'auth.registerButton': 'Register',
        'auth.alreadyHaveAccount': "Already have an account?",
        'auth.registerHere': 'Register here',
        'auth.loginHere': 'Login here',
        'auth.loginFailed': "Incorrect email or password",
        'auth.registerFailed': "Registration failed. Please try again.",

        // Notes
        'notes.title': "Personal Notes",
        'notes.searchPlaceholder': "Search notes...",
        'notes.noNotes': "No notes",
        'notes.addNote': "Add New Note",
        'notes.addNoteDescription': "Create a new note to save your ideas, thoughts, or important information.",
        'notes.noteTitle': "Note Title",
        'notes.noteBody': "Note Body",
        'notes.save': "Save",
        'notes.cancel': "Cancel",
        'notes.delete': "Delete",
        'notes.archive': "Archive",
        'notes.unarchive': "Unarchive",
        'notes.back': "Back",
        'notes.archivedNotes': "Archived Notes",
        'notes.activeNotes': "Active Notes",
        'notes.noNotesFound': "No notes found",
        'notes.noArchivedNotes': "No archived notes",

        // Add Note Page
        'addNote.title': "Add New Note",
        'addNote.description':
            "Create a new note to save your ideas, thoughts, or important information.",
        'addNote.titlePlaceholder': "Enter note title...",
        'addNote.bodyPlaceholder': "Write the note content here...",

        // Messages
        'message.loading': 'Loading...',
        'message.checkingAuth': 'Checking authentication...',
        'message.somethingWrong': 'Something went wrong. Please try again.',
        'message.noteDeleted': 'Note deleted successfully',
        'message.noteArchived': 'Note archived successfully',
        'message.noteUnarchived': 'Note unarchived successfully',

        // Buttons
        'button.goBack': 'Back',
        'button.backToHome': 'Back to Home',

        // Errors
        'error.pageNotFound': '404 - Page not found',
        'error.bodyPageNotFound': 'The page you are looking for does not exist',
    }
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}

interface AppProviderProps {
    children: React.ReactNode;
}

const getStoredTheme = (): themeType => {
    try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            return stored;
        }
    } catch (error) {
        console.warn("Failed to read theme from localStorage:", error);
    }
    return "light";
};

const getStoredLanguage = (): LanguageType => {
    try {
        const stored = localStorage.getItem("language");
        if (stored === "en" || stored === "id") {
            return stored;
        }
    } catch (error) {
        console.warn("Failed to read language from localStorage:", error);
    }
    return "en";
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [theme, setTheme] = React.useState<themeType>(getStoredTheme);
    const [language, setLanguage] = React.useState<LanguageType>(getStoredLanguage);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark", "light");

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.add("light");
        }

        try {
            localStorage.setItem("theme", theme);
        } catch (error) {
            console.warn("Failed to save theme to localStorage:", error);
        }
    }, [theme]);

    useEffect(() => {
        try {
            localStorage.setItem("language", language);
        } catch (error) {
            console.warn("Failed to save language to localStorage:", error);
        }
    }, [language]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const toggleLanguage = () => {
        setLanguage(prevLanguage => (prevLanguage === "en" ? "id" : "en"));
    }

    const t = (key: string): string => {
        return locale[language][key] || key;
    };

    return (
        <AppContext.Provider value={{
            theme,
            language,
            setTheme: toggleTheme,
            setLanguage: toggleLanguage,
            t
        }}>
            {children}
        </AppContext.Provider>
    );
}