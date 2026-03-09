import Card from "../componetns/Card";
import { use, useEffect, useState } from "react";
import { adminApi, type DashboardStats } from "../api/adminApi";
import { useAdminStats } from "../hooks/useAdminStats";
import { useUsers } from "../hooks/useUsers";
import { showSuccess } from "../utils/toast";
import ConfirmDialog from "../componetns/ui/ConfirmDialog";
import { useDeleteUser } from "../hooks/useDeleteUser";

function Admin() {
    const deleteUserMutation = useDeleteUser();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const { stats, loading } = useAdminStats();
    const {data: users, isLoading, error} = useUsers();
    if (isLoading) {
        return <p>Loading dashboard...</p>;
    }
    if (error) {
        return <p>Error loading data</p>;
    }
    if (!stats) {
        return <p>Loading</p>
    }

    return  (
        <div>
            <h1>Admin Dashboard</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginTop: '20px',
            }}>

                <Card title="Users">
                    <p>👥 Users: {stats.userCount}</p>

                </Card>

                <Card title="Revenue">
                    <p>Admins: {stats.adminsCount}</p>
                </Card>
                <Card title="Server Status">
                    <p>⚙️ {stats.serverStatus}</p>
                </Card>
            </div>

            <h3>All Users</h3>
            <ul>
            {users?.map((u) => (
                <li key={u.id}>
                {u.email} — {u.role}

                <button
                    onClick={()=> setSelectedUserId(u.id)}
                >
                    Delete
                </button>

                <button
                    onClick={async () => {
                    const newRole = u.role === "admin" ? "user" : "admin";
                    await adminApi.changeRole(u.id, newRole);
                    showSuccess("Role updated");
                    reload();
                    }}
                >
                    Toggle Role
                </button>
                </li>
            ))}
            </ul>

            <ConfirmDialog
                isOpen={selectedUserId !== null}
                title="Delete User"
                message="Are you sure you want to delete this user?"
                onCancel={() => setSelectedUserId(null)}
                onConfirm={async () => {
                    if (selectedUserId !== null) {
                    deleteUserMutation.mutate(selectedUserId);
                    showSuccess("User deleted");
                    setSelectedUserId(null);
                    }
                }}
            />
        </div>
    );
}

export default Admin;
