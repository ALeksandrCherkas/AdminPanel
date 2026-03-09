import { Outlet } from "react-router-dom";
import Navbar from "../componetns/Navbar";
import UserInfo from "../componetns/UserInfo";

function MainLayout() {
    return (
        <div>
            <Navbar />
            <UserInfo />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;