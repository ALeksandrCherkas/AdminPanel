import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";
import { useAuth } from "../store/AuthContext";



function ProtectedRoute({children }: {children: JSX.Element}) {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;