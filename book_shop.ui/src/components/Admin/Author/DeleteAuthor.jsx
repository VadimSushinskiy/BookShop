import {useState} from "react";
import axios from "axios";
import config from "../../../../config.json"
import {toast} from "react-toastify";

const DeleteAuthor = () => {

    const [name, setName] = useState("");

    const handleDelete = async () => {
        if (name === "") {
            toast.error("Введіть коректне ім'я", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.delete(`${config.SERVER_URL}/author/${name}`, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    setName("");
                    toast.success("Автора успішно видалено!");
                }
            }
            catch {
                toast.error("Такого автора не існує", {autoClose: 2000});
            }
        }
    }

    return (
        <div className="admin-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single admin-find">
                    <div className="login-input-label">Повне ім'я</div>
                    <input type="text" placeholder="Повне ім'я" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <div>
                <button onClick={handleDelete} className="button admin-button">Видалити</button>
            </div>
        </div>
    )
}

export default DeleteAuthor;