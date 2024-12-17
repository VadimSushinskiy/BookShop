import {useContext, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../../context/UserContext";

const AdminPanel = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("..", {relative: "path"});
        }
    }, []);

    return (
        <>
            <div>
                <Link to="book/add">Додати книгу</Link>
            </div>
            <div>
                <Link to="book/change">Редагувати книгу</Link>
            </div>
            <div>
                <Link to="book/delete">Видалити книгу</Link>
            </div>
            <div>
                <Link to="author/add">Додати автора</Link>
            </div>
            <div>
                <Link to="author/change">Редагувати автора</Link>
            </div>
            <div>
                <Link to="publishing/add">Додати видавництво</Link>
            </div>
            <div>
                <Link to="publishing/change">Редагувати видавництво</Link>
            </div>
            {user?.role === "Owner" && <div>
                <Link to="users">Користувачі</Link>
            </div>}
        </>
    )
}

export default AdminPanel;