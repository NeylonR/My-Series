import { useLocation, Navigate, Outlet} from "react-router-dom";
import { selectUser } from "../../../utils/selector";
import { useSelector } from "react-redux";

export default function RequireAuth() {
    const user = useSelector(selectUser);
    const userToken = user.data?.token?.token;
    const location = useLocation();

    return (
        userToken ? (
            <Outlet/>
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    )
}