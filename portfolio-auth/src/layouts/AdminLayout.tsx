import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import AdminSidebar from "../componetns/AdminSidebar";
import AdminHeader from "../componetns/AdminHeadre";

function AdminLayout() {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return (
        <div style={{ display: 'flex', minHeight: '80vh' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '20px' }}>
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;