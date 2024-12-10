import {NavLink} from "react-router-dom";

const Menu = () => {
    return (
        <nav>
            <NavLink to="." end>Home</NavLink>
            <NavLink to="login">Login</NavLink>
            <NavLink to="register">Register</NavLink>
        </nav>
    )
}

export default Menu;