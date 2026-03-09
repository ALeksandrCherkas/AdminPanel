import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import type { JSX } from "react/jsx-dev-runtime";



function AdminRoute({children }: {children: JSX.Element}) {
    const { user, isAuthLoading } = useAuth();
    
    if (isAuthLoading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;   
    }

    if (user.role !== "admin"){
        return <Navigate to="/" replace />;
    }

    console.log("AdminRoute user:", user);
    console.log("Loading:", isAuthLoading);
    return <Outlet />;
}

export default AdminRoute;