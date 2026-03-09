import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";
import type { User } from "../types/user";
import { useQuery } from "@tanstack/react-query";

export function useUsers(){
    return useQuery({
        queryKey: ['users'],
        queryFn: adminApi.getUsers,
    });
}