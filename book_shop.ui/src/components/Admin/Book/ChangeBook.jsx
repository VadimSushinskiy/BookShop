import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"

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
        price: 0,
        coverType: "",
        publicationYear: 0,
        mainImage: null,
        imgFiles: null
    };

    const [data, setData] = useState(defaultData);
    const [id, setId] = useState(0);
    const [error, setError] = useState("");
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

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

    const FindBook = async () => {
        setHidden(true);

        if (id <= 0) {
            setError("Введіть коректне значення id");
        }
        else {
            try {
                const response = await axios.get(`${config.SERVER_URL}/book/${id}`);
                if (response.status === 200) {
                    setData({...response.data, mainImage: null, imgFiles: null});
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
            if (!["mainImage", "imgFiles", "mainImageSrc", "imgFilesSrc"].includes(key) && (data[key] === "" || +data[key] <= 0)) {
                setError("Заповніть всі поля корректними значеннями!");
                return;
            }
        }

        const formData = new FormData();

        for (let prop in data) {
            if (prop === "imgFiles" && data[prop]) {
                for (const file of data[prop]) {
                    formData.append(prop, file);
                }
            }
            else {
                formData.append(prop, data[prop]);
            }
        }

        try {
            const response = await axios.put(`${config.SERVER_URL}/book`, formData, {
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
                    <input type="text" placeholder="Тип обкладинки" value={data.coverType}
                           onChange={(e) => handleChange(e, "coverType")}/>
                </div>
                <div>
                    <input type="number" placeholder="Рік видання" value={data.publicationYear}
                           onChange={(e) => handleChange(e, "publicationYear")}/>
                </div>
                <div>
                    <input type="number" placeholder="Кількість сторінок" value={data.volume}
                           onChange={(e) => handleChange(e, "volume")}/>
                </div>
                <div>
                    <input type="number" placeholder="Ціна" value={data.price}
                           onChange={(e) => handleChange(e, "price")}/>
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={(e) => handleChange(e, "mainImage")}/>
                </div>
                <div>
                    <input type="file" accept="image/*" multiple onChange={(e) => handleChange(e, "imgFiles")}/>
                </div>
                <button onClick={ChangeBook}>Редагувати</button>
            </div>}
        </div>
    )
}

export default ChangeBook;