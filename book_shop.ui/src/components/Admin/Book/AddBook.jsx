import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"

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
        price: 0,
        mainImage: null,
        imgFiles: null
    });
    const [error, setError] = useState("");

    const handleChange = (event, name) => {
        if (name === "imgFiles") {
            setData({...data, [name]: event.target.files});
        }
        else if (name === "mainImage") {
            setData({...data, [name]: event.target.files[0]});
        }
        else {
            setData({...data, [name]: event.target.value});
        }
    }

    const AddHandler = async () => {
        for (let key in data) {
            if (data[key] === "" || +data[key] <= 0) {
                setError("Заповніть всі поля корректними значеннями!");
                return;
            }
        }

        const formData = new FormData();

        for (let prop in data) {
            if (prop === "imgFiles") {
                for (const file of data[prop]) {
                    formData.append(prop, file);
                }
            }
            else {
                formData.append(prop, data[prop]);
            }
        }

        try {
            const response = await axios.post(`${config.SERVER_URL}/book`, formData, {
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
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    return (
        <div>
            {error !== "" && error}
            <div>
                <input type="text" placeholder="Назва" value={data.name} onChange={(e) => handleChange(e, "name")}/>
            </div>
            <div>
                <textarea placeholder="Опис" value={data.description}
                          onChange={(e) => handleChange(e, "description")}></textarea>
            </div>
            <div>
                <input type="text" placeholder="Жанр" value={data.genre} onChange={(e) => handleChange(e, "genre")}/>
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
                <input type="number" placeholder="Ціна" value={data.price} onChange={(e) => handleChange(e, "price")}/>
            </div>
            <div>
                <input type="file" accept="image/*" onChange={(e) => handleChange(e, "mainImage")}/>
            </div>
            <div>
                <input type="file" accept="image/*" multiple onChange={(e) => handleChange(e, "imgFiles")}/>
            </div>
            <button onClick={AddHandler}>Додати</button>
        </div>
    )
}

export default AddBook;