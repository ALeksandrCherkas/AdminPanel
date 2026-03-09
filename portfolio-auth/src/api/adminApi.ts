import type { AdminStats } from "../types/admin";
import { apiClient } from "./apiClient";
import type { User } from "../types/user";

export interface DashboardStats {
    Users: number;
    revenue: number;
    serverStatus: string;
}

export const adminApi = {
    getStats(): Promise<AdminStats>{
        return apiClient<AdminStats>('/admin/stats');
    },

    getUsers(page: number, limit: number): Promise<User[]> {
        return apiClient<User[]>(`/admin/users?page=${page}&limit=${limit}`);
    },
    deleteUser(userId: number) {
        return apiClient(`/admin/users/${userId}`, {
            method: 'DELETE',
        });
    },

    changeRole(id: number, role: string): Promise<User> {
        return apiClient(`/admin/users/${id}/role`, {
            method: 'PATCH',
            body: JSON.stringify({ role }),
        });
    },
}

