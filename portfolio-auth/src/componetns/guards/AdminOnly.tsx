import type { ReactNode } from 'react';
import { useAuth } from '../../store/AuthContext';

interface Props {
    children: ReactNode;
}

function AdminOnly({ children }: Props) {
    const {user} = useAuth();

    if (!user || user.role !== 'admin') {
        return <></>;
    }

    return <>{children}</>;
}

export default AdminOnly;