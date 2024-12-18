import {Link} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import {FaUser, FaShoppingCart, FaRegFileAlt, FaPhoneAlt} from "react-icons/fa";
import GetUser from "../tools/GetUser";
import UserContext from "../context/UserContext";
import config from "../../config.json"
import "./Menu.css"

const Menu = () => {
    const {user, setUser} = useContext(UserContext);
    const exitHandler = async () => {
        const response = await axios.get(`${config.SERVER_URL}/user/logout`, {
            withCredentials: true
        });
        if (response.status === 200) {
            setUser(GetUser());
        }
    }

    return (
        <nav>
            <Link to="." className="link-home">Магазин</Link>

            {(user?.role === "Admin" || user?.role === "Owner") && <Link to="admin">Admin</Link>}

            <div className="cart-user">
                <div className="phone-flex">
                    <div className="phone">
                        <FaPhoneAlt className="phone-icon"/>
                        <div>+38(097)488-32-92</div>
                    </div>
                    <div>Пн-Пт, 8:00-20:00</div>
                </div>
                {user && <div className="link-icon">
                    <FaRegFileAlt className="icon"/>
                    <Link to="statuses" className="menu-link">Замовлення</Link>
                </div>}
                <div className="link-icon">
                    <FaShoppingCart className="icon"/>
                    <Link to="cart" className="menu-link">Кошик</Link>
                </div>
                {!user && <div className="link-icon login">
                    <FaUser className="icon"/>
                    <Link to="login" className="menu-link">Увійти</Link>
                </div>}
                {user && <span onClick={exitHandler} className="menu-link login link-icon">Вийти</span>}
            </div>
        </nav>
    )
}

export default Menu;