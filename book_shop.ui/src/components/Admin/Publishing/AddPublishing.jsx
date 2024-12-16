import {useContext, useEffect, useState} from "react";
import UserContext from "../../../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddPublishing = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user?.role !== "Admin") {
            navigator("/admin");
        }
    }, []);

    const AddHandler = async () => {
        if (name === "" || country === "") {
            setError("Введіть дані в усі поля!")
        }
        else {
            try {
                const response = await axios.post("https://localhost:7259/api/publishing", {
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
        <div>
            {error !== "" && error}
            <div>
                <input type="text" placeholder="Назва видавництва" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <input type="text" placeholder="Країна видавництва" value={country} onChange={(e) => setCountry(e.target.value)}/>
            </div>
            <button onClick={AddHandler}>Додати видавництво</button>
        </div>
    )
}

export default AddPublishing;