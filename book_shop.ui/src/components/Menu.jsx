import {Link} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import {FaUser, FaShoppingCart, FaRegFileAlt, FaPhoneAlt} from "react-icons/fa";
import GetUser from "../tools/GetUser";
import UserContext from "../context/UserContext";
import config from "../../config.json"
import "./Menu.css"
import {MdAdminPanelSettings} from "react-icons/md";

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
            <div className="cart-user">
                {(user?.role === "Admin" || user?.role === "Owner") && <Link to="admin" className="link-icon">
                    <MdAdminPanelSettings className="icon"/>
                    <div className="menu-link">Адміністрування</div>
                </Link>}
                <div className="phone-flex">
                    <div className="phone">
                        <FaPhoneAlt className="phone-icon"/>
                        <div>+38(097)488-32-92</div>
                    </div>
                    <div>Пн-Пт, 8:00-20:00</div>
                </div>
                {user && <Link to="statuses"  className="link-icon">
                    <FaRegFileAlt className="icon"/>
                    <div className="menu-link">Замовлення</div>
                </Link>}
                <Link to="cart" className="link-icon">
                    <FaShoppingCart className="icon"/>
                    <div  className="menu-link">Кошик</div>
                </Link>
                {!user && <Link to="login" className="link-icon first-icon">
                    <FaUser className="icon"/>
                    <div  className="menu-link">Увійти</div>
                </Link>}
                {user && <span onClick={exitHandler} className="menu-link first-icon link-icon">Вийти</span>}
            </div>
        </nav>
    )
}

export default Menu;