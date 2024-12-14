import {useContext, useEffect, useState} from "react";
import UserContext from "../../../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ChangeAuthor = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [country, setCountry] = useState("");
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user?.role !== "Admin") {
            navigator("/admin");
        }
    }, []);

    const FindAuthor = async () => {
        setHidden(true);

        if (name === "") {
            setError("Введіть коректне ім'я автора");
        }
        else {
            try {
                const response = await axios.get(`https://localhost:7259/api/author/${name}`);
                if (response.status === 200) {
                    setNewName(response.data.fullname);
                    setCountry(response.data.country);
                    setError("");
                    setHidden(false);
                }
            }
            catch {
                setError("Автора з таким ім'ям не знайдено");
                setCountry("");
                setNewName("");
            }
        }
    }

    const ChangeAuthor = async () => {
        if (name === "" || country === "") {
            setError("Введіть дані в усі поля!");
        }
        else {
            try {
                const response = await axios.put(`https://localhost:7259/api/author/${name}`, {
                    fullname: newName,
                    country
                }, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    navigator("/admin");
                }
            }
            catch {
                setError("Автора з таким ім'ям не знайдено");
            }
        }


    }

    return (
        <div>
            {error !== "" && error}
            <div>
                <input type="text" placeholder="Повне ім'я" value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <button onClick={FindAuthor}>Знайти</button>
            </div>
            {!hidden && <div>
                <div>
                    <input type="text" placeholder="Нове ім'я" value={newName}
                           onChange={(e) => setNewName(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder="Країна автора" value={country}
                           onChange={(e) => setCountry(e.target.value)}/>
                </div>
                <div>
                    <button onClick={ChangeAuthor}>Редагувати</button>
                </div>
            </div>}
        </div>
    )
}

export default ChangeAuthor;