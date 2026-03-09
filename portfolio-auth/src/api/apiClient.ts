import { storage } from "../utils/storage";
import { API_BASE_URL } from "../config/apiConfig";


let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorizedHandler(handler: () => void) {
    onUnauthorized = handler;
}

export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}


export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = storage.getToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
    
    if (!response.ok) {
        let message = "Something went wrong";
        try{
            const data = await response.json();
            message = data.message || message;
        } catch{}

        if (response.status === 401 && onUnauthorized) {
            onUnauthorized();
        }
        throw new ApiError(response.status, message);
    }
    return response.json();
}