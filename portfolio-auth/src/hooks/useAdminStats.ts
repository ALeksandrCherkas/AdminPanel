import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";
import type { AdminStats } from "../types/admin";

export function useAdminStats(){
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminApi.getStats()
        .then(setStats)
        .finally(()=> setLoading(false));
    }, []);
    return {stats, loading};
}   