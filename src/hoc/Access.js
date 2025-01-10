import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"
import Error from "../pages/general/Error";

export default function Access({ children, role }) {
    const appContext = useAppContext();
    const location = useLocation();

    if (!appContext.loginedUser) {
        return <Navigate to="/auth" state={{from: location}} />
    }
    else if (appContext.loginedUser?.role !== role) {
        return <Error code="403" />
    }

    return children
}
