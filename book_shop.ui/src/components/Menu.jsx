import {Link} from "react-router-dom";
import GetUser from "../tools/GetUser";
import axios from "axios";
import {useContext} from "react";
import UserContext from "../context/UserContext";

const Menu = () => {
    const {user, setUser} = useContext(UserContext);
    const exitHandler = async () => {
        const response = await axios.get("https://localhost:7259/api/user/logout", {
            withCredentials: true
        });
        if (response.status === 200) {
            setUser(GetUser());
        }
    }

    return (
        <nav>
            <Link to=".">Home</Link>
            {!user && <Link to="login">Login</Link>}
            {!user && <Link to="register">Register</Link>}
            {user && <Link to="statuses">Orders</Link>}
            {user?.role === "Admin" && <Link to="admin">Admin</Link>}
            <Link to="cart">Cart</Link>
            {user && <span onClick={exitHandler}>Вийти</span>}
        </nav>
    )
}

export default Menu;