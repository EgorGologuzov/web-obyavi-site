import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"

export default function RoleNavigator() {
    const {loginedUser} = useAppContext();

    switch (loginedUser?.role) {
        case "moder":
            return (<Navigate to="/m" />);
        case "client":
            return (<Navigate to="/c" />);
        default:
            return (<Navigate to="/presentation" />)
    }
}
