import {useContext, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Admin.css"

const AdminPanel = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const adminButtonInformation = [
        {text: "Додати нову книгу", link: "book/add"},
        {text: "Додати існуючу книгу", link: "book/add-count"},
        {text: "Змінити книгу", link: "book/change"},
        {text: "Видалити книгу", link: "book/delete"},
        {text: "Додати автора", link: "author/add"},
        {text: "Змінити автора", link: "author/change"},
        {text: "Видалити автора", link: "author/delete"},
        {text: "Додати видавництво", link: "publishing/add"},
        {text: "Змінити видавництво", link: "publishing/change"},
        {text: "Видалити видавництво", link: "publishing/delete"}];

    const ownerButtonInformation = [
        {text: "Користувачі", link: "stat/users"},
        {text: "Книги", link: "stat/books"},
        {text: "Автори", link: "stat/authors"},
        {text: "Видавництва", link: "stat/publishings"}];

    const GetButtonsJSX = (buttonInformation) => {
        return buttonInformation.map((button) => {
            return (
                <div>
                    <Link to={button.link}>
                        <button className="button">{button.text}</button>
                    </Link>
                </div>
            )
        })
    }

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("..", {relative: "path"});
        }
    }, []);

    return (
        <div className="admin-panel">
            <title>КнигаUA | Адміністрування</title>
            {GetButtonsJSX(adminButtonInformation)}
            {user?.role === "Owner" && <>
                {GetButtonsJSX(ownerButtonInformation)}
            </>}
        </div>
    )
}

export default AdminPanel;