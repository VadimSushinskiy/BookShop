import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"

const AddAuthor = () => {
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
                const response = await axios.post(`${config.SERVER_URL}/author`, {
                    fullname: name,
                    country
                }, {
                    withCredentials: true
                });

                if (response.status === 201) {
                    navigator("/admin");
                }
            }
            catch {
                setError("Автор з таким ім'я вже існує!");
            }
        }
    }

    return (
        <div>
            {error !== "" && error}
            <div>
                <input type="text" placeholder="Повне ім'я" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <input type="text" placeholder="Країна автора" value={country} onChange={(e) => setCountry(e.target.value)}/>
            </div>
            <button onClick={AddHandler}>Додати автора</button>
        </div>
    )
}

export default AddAuthor;