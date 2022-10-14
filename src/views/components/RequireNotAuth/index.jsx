import { useLocation, Navigate, Outlet} from "react-router-dom";
import { selectUser } from "../../../utils/selector";
import { useSelector } from "react-redux";

export default function RequireNotAuth() {
    const user = useSelector(selectUser);
    const userToken = user.data?.token?.token;
    const location = useLocation();

    return (
        userToken ? (
            <Navigate to="/" state={{ from: location }} replace />
        ) : (
            <Outlet/>
        )
    )
}