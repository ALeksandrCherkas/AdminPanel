import type {User } from "./user";

export interface AdminStats{
    userCount: number;
    adminsCount: number;
    latestUsers: User[];
    serverStatus: string;
}