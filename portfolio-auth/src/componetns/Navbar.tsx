import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import AdminOnly from "./guards/AdminOnly";

function Navbar() {
    const { user, logout } = useAuth();

    const isAdmin = user?.role === 'admin';
    const isUser = user?.role === 'user';

    return (
        <nav style={{display: 'flex', gap: '10px'}}>
            <Link to="/">Home</Link>


            {!user && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to ="register">Register</Link>
                </>
            )}

            {isUser && (
                <>
                    <Link to="/profile">Profile</Link>
                </>
            )}

            <AdminOnly>
                <Link to="/admin">Admin Dashboard</Link>
            </AdminOnly>

            {user && (<button onClick={logout}>Logout</button>
            )}
        </nav>
    );
}

export default Navbar;