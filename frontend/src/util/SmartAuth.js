import { useLocation } from "react-router-dom";
import { Login } from "../pages/Login";

export function RequireAuth({ children }) {
    let location = useLocation();
    let isAuthenticated = true;
    return isAuthenticated ? children : <Login redirect={location.pathname} />;
}

export function getMyCitizenID() {
    //TODO read citizen_id from cookie and validate from smartauth
    return 1;
}
