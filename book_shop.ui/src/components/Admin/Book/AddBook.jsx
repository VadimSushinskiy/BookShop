import {useContext, useEffect, useState} from "react";
import UserContext from "../../../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddBook = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [data, setData] = useState({
        name: "",
        description: "",
        genre: "",
        language: "",
        authorName: "",
        publishingName: "",
        volume: 0,
        price: 0
    });
    const [error, setError] = useState("");

    const handleChange = (event, name) => {
        setData({...data, [name]: event.target.value});
    }

    const AddHandler = async () => {
        for (let key in data) {
            if (data[key] === "" || +data[key] <= 0) {
                setError("Заповніть всі поля корректними значеннями!");
                return;
            }
        }

        try {
            const response = await axios.post("https://localhost:7259/api/book", data, {
                withCredentials: true
            });

            if (response.status === 201) {
                navigator("/admin");
            }
        }
        catch {
            setError("Такого автора або видавництва не існує!");
        }
    }

    useEffect(() => {
        if (user?.role !== "Admin") {
            navigator("..", {relative: "path"});
        }
    }, []);

    return (
        <div>
            {error !== "" && error}
            <div>
                <input type="text" placeholder="Назва" value={data.name} onChange={(e) => handleChange(e, "name")}/>
            </div>
            <div>
                <textarea placeholder="Опис" value={data.description} onChange={(e) => handleChange(e, "description")}></textarea>
            </div>
            <div>
                <input type="text" placeholder="Жанр" value={data.genre} onChange={(e) => handleChange(e, "genre")}/>
            </div>
            <div>
                <input type="text" placeholder="Мова" value={data.language} onChange={(e) => handleChange(e, "language")}/>
            </div>
            <div>
                <input type="text" placeholder="Ім'я автора" value={data.authorName} onChange={(e) => handleChange(e, "authorName")}/>
            </div>
            <div>
                <input type="text" placeholder="Назва видавництва" value={data.publishingName} onChange={(e) => handleChange(e, "publishingName")}/>
            </div>
            <div>
                <input type="number" placeholder="Кількість сторінок" value={data.volume} onChange={(e) => handleChange(e, "volume")}/>
            </div>
            <div>
                <input type="number" placeholder="Ціна" value={data.price} onChange={(e) => handleChange(e, "price")}/>
            </div>
            <button onClick={AddHandler}>Додати</button>
        </div>
    )
}

export default AddBook;