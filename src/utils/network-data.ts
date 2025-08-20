const BASE_URL = 'https://notes-api.dicoding.dev/v1';

interface User {
    id: string;
    name: string;
    email: string;
}

interface Note {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    archived: boolean;
    owner: string;
}

interface LoginData {
    accessToken: string;
}

type ApiResult<T> = {
    error: boolean;
    data?: T;
    message?: string;
};

function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = getAccessToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const requestOptions: RequestInit = {
        ...options,
        headers,
    };

    console.log('Making request to:', url);
    console.log('Request options:', {
        method: requestOptions.method || 'GET',
        headers: requestOptions.headers,
        body: requestOptions.body || 'No body'
    });

    return fetch(url, requestOptions);
}

type LoginPayload = {
    email: string;
    password: string;
};

type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

type NotePayload = {
    title: string;
    body: string;
};

async function handleApiResponse<T>(response: Response): Promise<ApiResult<T>> {
    console.log(`Response status: ${response.status} ${response.statusText}`);

    let responseJson;
    try {
        responseJson = await response.json();
        console.log('Response data:', responseJson);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        return {
            error: true,
            message: 'Invalid response format from server'
        };
    }

    if (!response.ok) {
        console.error(`HTTP Error ${response.status}:`, responseJson);
        return {
            error: true,
            message: responseJson.message || `HTTP ${response.status}: ${response.statusText}`
        };
    }

    if (responseJson.status !== 'success') {
        console.error('API Error:', responseJson.message);
        return {
            error: true,
            message: responseJson.message
        };
    }

    return {
        error: false,
        data: responseJson.data
    };
}

async function login(payload: LoginPayload): Promise<ApiResult<LoginData>> {
    try {
        console.log('Attempting login with:', { email: payload.email, password: '***' });

        // Validate payload
        if (!payload.email || !payload.password) {
            return {
                error: true,
                message: 'Email and password are required'
            };
        }

        if (!payload.email.includes('@')) {
            return {
                error: true,
                message: 'Please enter a valid email address'
            };
        }

        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return await handleApiResponse<LoginData>(response);
    } catch (error) {
        console.error('Login network error:', error);
        return {
            error: true,
            message: 'Network error. Please check your connection.'
        };
    }
}

async function register(payload: RegisterPayload): Promise<ApiResult<void>> {
    try {
        console.log('Attempting register with:', {
            name: payload.name,
            email: payload.email,
            password: '***'
        });

        if (!payload.name || !payload.email || !payload.password) {
            return {
                error: true,
                message: 'Name, email and password are required'
            };
        }

        if (!payload.email.includes('@')) {
            return {
                error: true,
                message: 'Please enter a valid email address'
            };
        }

        if (payload.password.length < 6) {
            return {
                error: true,
                message: 'Password must be at least 6 characters'
            };
        }

        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return await handleApiResponse<void>(response);
    } catch (error) {
        console.error('Register network error:', error);
        return {
            error: true,
            message: 'Network error. Please check your connection.'
        };
    }
}

async function getUserLogged(): Promise<ApiResult<User>> {
    try {
        const token = getAccessToken();
        if (!token) {
            return {
                error: true,
                message: 'No access token found. Please login first.'
            };
        }

        console.log('Getting logged user info');
        const response = await fetchWithToken(`${BASE_URL}/users/me`);
        return await handleApiResponse<User>(response);
    } catch (error) {
        console.error('Get user error:', error);
        return {
            error: true,
            message: 'Failed to get user information'
        };
    }
}

async function addNote(payload: NotePayload): Promise<ApiResult<Note>> {
    try {
        console.log('Adding note with original payload:', payload);

        // Validate payload
        if (!payload.title || !payload.body) {
            return {
                error: true,
                message: 'Title and body are required'
            };
        }

        if (payload.title.trim().length === 0) {
            return {
                error: true,
                message: 'Title cannot be empty'
            };
        }

        // PERBAIKAN: Pastikan hanya mengirim field yang diizinkan
        const cleanPayload: NotePayload = {
            title: payload.title.trim(),
            body: payload.body.trim()
        };

        console.log('Sending clean payload:', cleanPayload);

        const response = await fetchWithToken(`${BASE_URL}/notes`, {
            method: 'POST',
            body: JSON.stringify(cleanPayload), // Gunakan cleanPayload
        });

        return await handleApiResponse<Note>(response);
    } catch (error) {
        console.error('Add note error:', error);
        return {
            error: true,
            message: 'Failed to add note'
        };
    }
}

async function getActiveNotes(): Promise<ApiResult<Note[]>> {
    try {
        console.log('Getting active notes');
        const response = await fetchWithToken(`${BASE_URL}/notes`);
        return await handleApiResponse<Note[]>(response);
    } catch (error) {
        console.error('Get active notes error:', error);
        return {
            error: true,
            message: 'Failed to get active notes'
        };
    }
}

async function getArchivedNotes(): Promise<ApiResult<Note[]>> {
    try {
        console.log('Getting archived notes');
        const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
        return await handleApiResponse<Note[]>(response);
    } catch (error) {
        console.error('Get archived notes error:', error);
        return {
            error: true,
            message: 'Failed to get archived notes'
        };
    }
}

async function getNote(id: string): Promise<ApiResult<Note>> {
    try {
        if (!id) {
            return {
                error: true,
                message: 'Note ID is required'
            };
        }

        console.log('Getting note:', id);
        const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
        return await handleApiResponse<Note>(response);
    } catch (error) {
        console.error('Get note error:', error);
        return {
            error: true,
            message: 'Failed to get note'
        };
    }
}

async function archiveNote(id: string): Promise<ApiResult<void>> {
    try {
        if (!id) {
            return {
                error: true,
                message: 'Note ID is required'
            };
        }

        console.log('Archiving note:', id);
        const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
            method: 'POST',
        });

        return await handleApiResponse<void>(response);
    } catch (error) {
        console.error('Archive note error:', error);
        return {
            error: true,
            message: 'Failed to archive note'
        };
    }
}

async function unarchiveNote(id: string): Promise<ApiResult<void>> {
    try {
        if (!id) {
            return {
                error: true,
                message: 'Note ID is required'
            };
        }

        console.log('Unarchiving note:', id);
        const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
            method: 'POST',
        });

        return await handleApiResponse<void>(response);
    } catch (error) {
        console.error('Unarchive note error:', error);
        return {
            error: true,
            message: 'Failed to unarchive note'
        };
    }
}

async function deleteNote(id: string): Promise<ApiResult<void>> {
    try {
        if (!id) {
            return {
                error: true,
                message: 'Note ID is required'
            };
        }

        console.log('Deleting note:', id);
        const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
            method: 'DELETE',
        });

        return await handleApiResponse<void>(response);
    } catch (error) {
        console.error('Delete note error:', error);
        return {
            error: true,
            message: 'Failed to delete note'
        };
    }
}

export {
    getAccessToken,
    putAccessToken,
    login,
    register,
    getUserLogged,
    addNote,
    getActiveNotes,
    getArchivedNotes,
    getNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
};

export type {
    User,
    Note,
    LoginData,
    ApiResult,
    LoginPayload,
    RegisterPayload,
    NotePayload,
};