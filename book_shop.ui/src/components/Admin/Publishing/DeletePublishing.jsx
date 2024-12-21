import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"
import {toast} from "react-toastify";

const DeletePublishing = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    const handleDelete = async () => {
        if (name === "") {
            toast.error("Введіть коректну назву", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.delete(`${config.SERVER_URL}/publishing/${name}`, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    setName("");
                    toast.success("Видавництво успішно видалено!");
                }
            }
            catch {
                toast.error("Такого видавництва не існує", {autoClose: 2000});
            }
        }
    }

    return (
        <div className="admin-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single admin-find">
                    <div className="login-input-label">Назва видавництва</div>
                    <input type="text" placeholder="Назва видавництва" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <div>
                <button onClick={handleDelete} className="button admin-button">Видалити</button>
            </div>
        </div>
    )
}

export default DeletePublishing;