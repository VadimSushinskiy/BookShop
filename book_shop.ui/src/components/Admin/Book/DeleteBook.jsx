import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"
import "../Admin.css"
import {toast} from "react-toastify";

const DeleteBook = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [id, setId] = useState(0);

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    const handleDelete = async () => {
        if (id === undefined || id <= 0) {
            toast.error("Введіть коректне значення id", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.delete(`${config.SERVER_URL}/book/${id}`, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    setId(0);
                    toast.success("Книгу успішно видалено");
                }
            }
            catch {
                toast.error("Книги з таким id не існує", {autoClose: 2000});
            }
        }
    }

    return (
        <div className="admin-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single admin-find">
                    <div className="login-input-label">Id</div>
                    <input type="number" placeholder="Id" value={id}
                           onChange={(e) => setId(+e.target.value)}/>
                </div>
            </div>
            <div>
                <button onClick={handleDelete} className="button admin-button">Видалити</button>
            </div>
        </div>
    )
}

export default DeleteBook;