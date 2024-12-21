import {useContext, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Admin.css"

const AdminPanel = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("..", {relative: "path"});
        }
    }, []);

    return (
        <div className="admin-panel">
            <title>КнигаUA | Адміністрування</title>
            <div>
                <Link to="book/add">
                    <button className="button">Додати книгу</button>
                </Link>
            </div>
            <div>
                <Link to="book/change">
                    <button className="button">Змінити книгу</button>
                </Link>
            </div>
            <div>
                <Link to="book/delete">
                    <button className="button">Видалити книгу</button>
                </Link>
            </div>
            <div>
                <Link to="author/add">
                    <button className="button">Додати автора</button>
                </Link>
            </div>
            <div>
                <Link to="author/change">
                    <button className="button">Змінити автора</button>
                </Link>
            </div>
            <div>
                <Link to="author/delete">
                    <button className="button">Видалити автора</button>
                </Link>
            </div>
            <div>
                <Link to="publishing/add">
                    <button className="button">Додати видавництво</button>
                </Link>
            </div>
            <div>
                <Link to="publishing/change">
                    <button className="button">Змінити видавництво</button>
                </Link>
            </div>
            <div>
                <Link to="publishing/delete">
                    <button className="button">Видалити видавництво</button>
                </Link>
            </div>
            {user?.role === "Owner" && <div>
                <Link to="users">
                    <button className="button">Користувачі</button>
                </Link>
            </div>}
        </div>
    )
}

export default AdminPanel;