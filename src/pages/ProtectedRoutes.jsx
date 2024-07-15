import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function ProtectedRoutes() {
    const user = useAuth((state) => state.user);
    if (!user) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}

export default ProtectedRoutes