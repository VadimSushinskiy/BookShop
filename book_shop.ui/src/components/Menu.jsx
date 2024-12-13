import {NavLink} from "react-router-dom";
import GetUser from "../tools/GetUser";

const Menu = () => {
    return (
        <nav>
            <NavLink to="." end>Home</NavLink>
            {!GetUser() && <NavLink to="login">Login</NavLink>}
            {!GetUser() && <NavLink to="register">Register</NavLink>}
        </nav>
    )
}

export default Menu;