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

        // Authentication
        'auth.welcome': 'Selamat Datang di Aplikasi Catatan',
        'auth.subtitle': 'Silakan masuk atau daftar untuk melanjutkan',
        'auth.login': 'Masuk',
        'auth.register': 'Daftar',
        'auth.email': 'Email',
        'auth.password': 'Kata Sandi',
        'auth.name': 'Nama',
        'auth.confirmPassword': 'Konfirmasi Kata Sandi',
        'auth.loginButton': 'Masuk',
        'auth.registerButton': 'Daftar',
        'auth.dontHaveAccount': 'Belum punya akun?',
        'auth.alreadyHaveAccount': 'Sudah punya akun?',
        'auth.registerHere': 'Daftar di sini',
        'auth.loginHere': 'Masuk di sini',
        'auth.loginSuccess': 'Berhasil masuk!',
        'auth.registerSuccess': 'Pendaftaran berhasil! Silakan masuk dengan akun Anda.',
        'auth.loginFailed': 'Email atau kata sandi salah',
        'auth.registerFailed': 'Pendaftaran gagal. Silakan coba lagi.',
        'auth.allFieldsRequired': 'Semua kolom wajib diisi',
        'auth.emailPasswordRequired': 'Email dan kata sandi wajib diisi',

        // Notes
        'notes.title': 'Catatan Pribadi',
        'notes.searchPlaceholder': 'Cari catatan...',
        'notes.noNotes': 'Tidak ada catatan',
        'notes.noNotesDesc': 'Belum ada catatan yang dibuat. Mulai dengan menambahkan catatan pertama Anda!',
        'notes.addNote': 'Tambah Catatan Baru',
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

        // Add Note Page
        'addNote.title': 'Tambah Catatan Baru',
        'addNote.description': 'Buat catatan baru untuk menyimpan ide, pemikiran, atau informasi penting Anda.',
        'addNote.titlePlaceholder': 'Masukkan judul catatan...',
        'addNote.bodyPlaceholder': 'Tulis isi catatan di sini...',
        'addNote.success': 'Catatan berhasil ditambahkan!',
        'addNote.failed': 'Gagal menambahkan catatan. Silakan coba lagi.',

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
        'button.tryAgain': 'Coba Lagi',

        // Errors
        'error.noteNotFound': 'Catatan tidak ditemukan',
        'error.invalidNoteId': 'ID catatan tidak valid',
        'error.loadNote': 'Gagal memuat catatan',
        'error.pageNotFound': 'Halaman tidak ditemukan',
    },
    en: {
        // Navigation & Header
        'nav.home': 'Home',
        'nav.archived': 'Archived',
        'nav.addNote': 'Add Note',
        'nav.logout': 'Logout',
        'nav.profile': 'Profile',

        // Authentication
        'auth.welcome': 'Welcome to the Note App',
        'auth.subtitle': 'Please log in or register to continue',
        'auth.login': 'Login',
        'auth.register': 'Register',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.name': 'Name',
        'auth.confirmPassword': 'Confirm Password',
        'auth.loginButton': 'Login',
        'auth.registerButton': 'Register',
        'auth.dontHaveAccount': "Don't have an account?",
        'auth.alreadyHaveAccount': "Already have an account?",
        'auth.registerHere': 'Register here',
        'auth.loginHere': 'Login here',
        'auth.loginSuccess': 'Login successful!',
        'auth.registerSuccess': "Registration successful! Please log in with your account.",
        'auth.loginFailed': "Incorrect email or password",
        'auth.registerFailed': "Registration failed. Please try again.",
        'auth.allFieldsRequired': "All fields are required",
        'auth.emailPasswordRequired': "Email and password are required",

        // Notes
        'notes.title': "Personal Notes",
        'notes.searchPlaceholder': "Search notes...",
        'notes.noNotes': "No notes",
        'notes.noNotesDesc': "You haven't created any notes yet. Start by adding your first note!",
        'notes.addNote': "Add New Note",
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

        // Add Note Page
        'addNote.title': "Add New Note",
        'addNote.description':
            "Create a new note to save your ideas, thoughts, or important information.",
        'addNote.titlePlaceholder': "Enter note title...",
        'addNote.bodyPlaceholder': "Write the note content here...",
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

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [theme, setTheme] = React.useState<themeType>("light");
    const [language, setLanguage] = React.useState<LanguageType>("en");

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark", "light");

        if (theme === "dark") {
            root.classList.add("dark");
        }
        else {
            root.classList.add("light");
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("language", language);
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
        <AppContext.Provider value={{ theme, language, setTheme: toggleTheme, setLanguage: toggleLanguage, t }}>
            {children}
        </AppContext.Provider>
    );
}