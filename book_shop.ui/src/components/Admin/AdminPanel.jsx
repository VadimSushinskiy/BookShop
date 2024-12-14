import {useContext, useEffect} from "react";
import UserContext from "../../context/UserContext";
import {Link, useNavigate} from "react-router-dom";

const AdminPanel = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    useEffect(() => {
        if (user?.role !== "Admin") {
            navigator("/admin");
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
        </>
    )
}

export default AdminPanel;