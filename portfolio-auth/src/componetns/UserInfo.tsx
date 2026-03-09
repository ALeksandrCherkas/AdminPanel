import { useAuth } from "../store/AuthContext";


function UserInfo() {
    const { user } = useAuth();
    
    if (!user) {
        return <p>Please log in to see your information.</p>;
    }

    return (
        <div>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}

export default UserInfo;