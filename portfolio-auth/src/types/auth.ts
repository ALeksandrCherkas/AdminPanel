import type {User} from "./user";

export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}