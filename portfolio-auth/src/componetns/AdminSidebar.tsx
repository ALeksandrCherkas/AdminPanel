import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AdminSidebar() {
    const location = useLocation();
    const isActive = (path: string) => {
        return location.pathname.startsWith(path);
    }
    const linkStyle = (path: string) => ({
            padding: '6px',
            textDecoration: 'none',
            color: isActive(path) ? 'blue' : 'black',
            backgroundColor: isActive(path) ? '#e0e0e0' : 'transparent',
            borderRadius: '4px'
        });


    return (
        <aside 
            style={{
                border: '1px solid black', 
                padding: '10px', 
                width: '200px'
            }}
            >
                <h3>Admin Panel</h3>

                <nav style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Link to="/admin" style={linkStyle('/admin')}>Dashboard</Link>
                    
                    <Link to="/admin/users" style={linkStyle('/admin/users')}>Manage Users</Link>
                    
                    <Link to="/admin/settings" style={linkStyle('/admin/settings')}>Settings</Link>
                </nav>
        </aside>
    );
}

export default AdminSidebar;