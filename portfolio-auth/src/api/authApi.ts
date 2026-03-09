import type { LoginFormData, LoginResponse } from "../types/auth";
import type { User } from "../types/user";
import { apiClient } from "./apiClient";




export const authApi = {
    
    async login(email: string, password: string): Promise<LoginResponse> {
     return apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
     });
    },
    me(): Promise<User> {
        return apiClient<User>('/auth/me');
    },
    async register(email: string, password: string): Promise<LoginResponse> {
        return apiClient('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }
};

