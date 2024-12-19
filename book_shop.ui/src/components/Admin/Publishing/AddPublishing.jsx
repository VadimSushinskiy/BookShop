import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json";

const AddPublishing = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    const AddHandler = async () => {
        if (name === "" || country === "") {
            setError("Введіть дані в усі поля!")
        }
        else {
            try {
                const response = await axios.post(`${config.SERVER_URL}/publishing`, {
                    name,
                    country
                }, {
                    withCredentials: true
                });

                if (response.status === 201) {
                    navigator("/admin");
                }
            }
            catch {
                setError("Видавництво з такою назвою вже існує!");
            }
        }
    }

    return (
        <div className="box-container admin-container">
            {error !== "" && <div className="error">{error}</div>}
            <div className="admin-input-row">
                <div className="admin-input">
                    <div className="admin-label">Назва видавництва</div>
                    <input type="text" placeholder="Повне ім'я" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="admin-input">
                    <div className="admin-label">Країна видавництва</div>
                    <input type="text" placeholder="Країна автора" value={country}
                           onChange={(e) => setCountry(e.target.value)}/>
                </div>
            </div>
            <button onClick={AddHandler} className="button admin-button">Додати видавництво</button>
        </div>
    )
}

export default AddPublishing;