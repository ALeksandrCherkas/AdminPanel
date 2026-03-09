import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";


function ProtectedLayout(){
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

export default ProtectedLayout;