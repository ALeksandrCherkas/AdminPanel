import { useLocation } from "react-router-dom";
import { pageTitles } from "../utils/pageMeta";
import { useEffect } from "react";


function AdminHeader() {
    const location = useLocation();
    const title = pageTitles[location.pathname] || 'Admin Panel';

    useEffect(() => {
        document.title = title;
    }, [title]);
    const segments = location.pathname.split('/').filter(Boolean);

    return (
        <div 
        style={{
            borderBottom: '1px solid black',
            paddingBottom: '10px',
            marginBottom: '20px',
        }}>
            <h2>Admin Panel</h2>
            <div style={{opacity: 0.6}}>
                {segments.map((seg, index) => (
                    <span key={index}>
                        {seg}{index < segments.length - 1 && ' / '}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default AdminHeader;