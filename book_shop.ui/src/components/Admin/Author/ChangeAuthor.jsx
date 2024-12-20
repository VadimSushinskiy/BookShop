import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"
import {toast} from "react-toastify";

const ChangeAuthor = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [country, setCountry] = useState("");
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    const FindAuthor = async () => {
        setHidden(true);

        if (name === "") {
            toast.error("Введіть коректне ім'я автора", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.get(`${config.SERVER_URL}/author/${name}`);
                if (response.status === 200) {
                    setNewName(response.data.fullname);
                    setCountry(response.data.country);
                    setHidden(false);
                }
            }
            catch {
                toast.error("Автора з таким ім'ям не знайдено", {autoClose: 2000});
                setCountry("");
                setNewName("");
            }
        }
    }

    const ChangeAuthor = async () => {
        if (name === "" || country === "") {
            toast.error("Введіть дані в усі поля", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.put(`${config.SERVER_URL}/author/${name}`, {
                    fullname: newName,
                    country
                }, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    toast.success("Автора успішно змінено!");
                    setHidden(true);
                    setName("");
                }
            }
            catch {
                toast.error("Автора з таким ім'ям не знайдено", {autoClose: 2000});
            }
        }


    }

    return (
        <div className="box-container admin-container">
            <div className="admin-input-row">
                <div className="admin-input admin-single admin-find">
                    <div className="login-input-label">Повне ім'я</div>
                    <input type="text" placeholder="Повне ім'я" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <button onClick={FindAuthor} className="button admin-button">Знайти</button>
            {!hidden && <>
                <div className="admin-input-row">
                    <div className="admin-input">
                        <div className="admin-label">Нове ім'я</div>
                        <input type="text" placeholder="Нове ім'я" value={newName}
                               onChange={(e) => setNewName(e.target.value)}/>
                    </div>
                    <div className="admin-input">
                        <div className="admin-label">Країна автора</div>
                        <input type="text" placeholder="Країна автора" value={country}
                               onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <button onClick={ChangeAuthor} className="button admin-button">Редагувати</button>
                </div>
            </>}
        </div>
    )
}

export default ChangeAuthor;