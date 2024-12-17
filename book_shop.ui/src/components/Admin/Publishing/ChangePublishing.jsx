import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"

const ChangePublishing = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [country, setCountry] = useState("");
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    const FindPublishing = async () => {
        setHidden(true);

        if (name === "") {
            setError("Введіть коректну назву видавництва");
        }
        else {
            try {
                const response = await axios.get(`${config.SERVER_URL}/publishing/${name}`);
                if (response.status === 200) {
                    setNewName(response.data.name);
                    setCountry(response.data.country);
                    setError("");
                    setHidden(false);
                }
            }
            catch {
                setError("Видавництва з такою назвою не знайдено");
                setCountry("");
                setNewName("");
            }
        }
    }

    const ChangePublishing = async () => {
        if (name === "" || country === "") {
            setError("Введіть дані в усі поля!");
        }
        else {
            try {
                const response = await axios.put(`${config.SERVER_URL}/publishing/${name}`, {
                    name: newName,
                    country
                }, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    navigator("/admin");
                }
            }
            catch {
                setError("Видавництва з такою назвою не знайдено");
            }
        }


    }

    return (
        <div>
            {error !== "" && error}
            <div>
                <input type="text" placeholder="Назва" value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <button onClick={FindPublishing}>Знайти</button>
            </div>
            {!hidden && <div>
                <div>
                    <input type="text" placeholder="Нова назва" value={newName}
                           onChange={(e) => setNewName(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder="Країна видавництва" value={country}
                           onChange={(e) => setCountry(e.target.value)}/>
                </div>
                <div>
                    <button onClick={ChangePublishing}>Редагувати</button>
                </div>
            </div>}
        </div>
    )
}

export default ChangePublishing;