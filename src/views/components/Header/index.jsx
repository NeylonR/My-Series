import { Link } from "react-router-dom";
import HeaderStyle from "../../../utils/style/HeaderStyle";
import { selectUser } from "../../../utils/selector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as userLogout } from "../../../features/user";
export default function Header() {
    const user = useSelector(selectUser);
    const userToken = user.data?.token?.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = async() => {
        dispatch(userLogout());
        navigate('/');
    };
    return (
        <HeaderStyle>
            <nav>
                <ul className="mainNavUl">
                    <li><Link to={'/'}>Home</Link></li>
                    { !userToken ? (
                    <>
                        <li><Link to={'/signup'}>Signup</Link></li>
                        <li><Link to={'/login'}>Login</Link></li>
                    </> ) : (
                        <>
                        {/* <li><Link to={'/profile'}>Profile</Link></li> */}
                        <li><button onClick={logout}>Logout</button></li>
                        </>
                    )}
                    
                </ul>
            </nav>
        </HeaderStyle>
    );
};