import {useContext, useEffect, useState} from "react";
import UserContext from "../../../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ChangeBook = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const defaultData = {
        name: "",
        description: "",
        genre: "",
        language: "",
        authorName: "",
        publishingName: "",
        volume: 0,
        price: 0
    };

    const [data, setData] = useState(defaultData);
    const [id, setId] = useState(0);
    const [error, setError] = useState("");
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (user?.role !== "Admin") {
            navigator("/admin");
        }
    }, []);

    const FindBook = async () => {
        setHidden(true);

        if (id <= 0) {
            setError("Введіть коректне значення id");
        }
        else {
            try {
                const response = await axios.get(`https://localhost:7259/api/book/${id}`);
                if (response.status === 200) {
                    setData(response.data);
                    setError("");
                    setHidden(false);
                }
            }
            catch {
                setError("Книги з таким id не знайдено");
                setData(defaultData);
            }
        }
    }

    const ChangeBook = async () => {
        for (let key in data) {
            if (data[key] === "" || +data[key] <= 0) {
                setError("Заповніть всі поля корректними значеннями!");
                return;
            }
        }

        try {
            const response = await axios.put("https://localhost:7259/api/book", data, {
                withCredentials: true
            });

            if (response.status === 204) {
                navigator("/admin");
            }
        }
        catch {
            setError("Такого автора або видавництва не існує!");
        }
    }

    const handleChange = (event, name) => {
        setData({...data, [name]: event.target.value});
    }

    return (
        <div>
            {error !== "" && error}
            <div>
                <input type="number" placeholder="Id" value={id} onChange={(e) => setId(+e.target.value)}/>
            </div>
            <div>
                <button onClick={FindBook}>Знайти</button>
            </div>
            {!hidden && <div>
                <div>
                    <input type="text" placeholder="Назва" value={data.name}
                           onChange={(e) => handleChange(e, "name")}/>
                </div>
                <div>
                    <textarea placeholder="Опис" value={data.description}
                              onChange={(e) => handleChange(e, "description")}></textarea>
                </div>
                <div>
                    <input type="text" placeholder="Жанр" value={data.genre}
                           onChange={(e) => handleChange(e, "genre")}/>
                </div>
                <div>
                    <input type="text" placeholder="Мова" value={data.language}
                           onChange={(e) => handleChange(e, "language")}/>
                </div>
                <div>
                    <input type="text" placeholder="Ім'я автора" value={data.authorName}
                           onChange={(e) => handleChange(e, "authorName")}/>
                </div>
                <div>
                    <input type="text" placeholder="Назва видавництва" value={data.publishingName}
                           onChange={(e) => handleChange(e, "publishingName")}/>
                </div>
                <div>
                    <input type="number" placeholder="Кількість сторінок" value={data.volume}
                           onChange={(e) => handleChange(e, "volume")}/>
                </div>
                <div>
                    <input type="number" placeholder="Ціна" value={data.price}
                           onChange={(e) => handleChange(e, "price")}/>
                </div>
                <button onClick={ChangeBook}>Редагувати</button>
            </div>}
        </div>
    )
}

export default ChangeBook;