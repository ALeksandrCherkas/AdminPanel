import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types/user";
import { storage } from "../utils/storage";
import { ApiError } from "../api/apiClient";
import { authApi } from "../api/authApi";
import { setOnUnauthorizedHandler } from "../api/apiClient";
import { showError } from "../utils/toast";


interface AuthContextType {
    user: User | null;
    login: (user: User, token?: string) => void;
    logout: () => void;
    isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    useEffect(() => {
        setOnUnauthorizedHandler(logout);
    }, []);

    const login = (user: User, token?: string) => {
        setUser(user);
        if (token) {
            storage.setToken(token);
        }
        storage.setUser(user);
    };

    const logout = () => {
        setUser(null);
        storage.removeToken();
        storage.removeUser();
    };

    useEffect(() => {
        const token = storage.getToken();

        if (!token) {
            setIsAuthLoading(false);
            return;
        }

        authApi
            .me()
            .then((user) => {
                setUser(user);
            })
            .catch(() => {
                logout();
            })
            .finally(() => {
                setIsAuthLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function handleApiError(error: unknown) {
    if (error instanceof ApiError) {
        showError(error.message);
        
        if (error.status === 403) {
            console.warn("Access denied. You do not have permission to perform this action.");
        }
    }
}