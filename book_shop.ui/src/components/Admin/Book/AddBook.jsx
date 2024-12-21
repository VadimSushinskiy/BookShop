import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"
import "../Admin.css"
import {toast} from "react-toastify";

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
        coverType: "",
        publicationYear: 0,
        count: 0,
        mainImage: null,
        imgFiles: null
    });

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
                toast.error("Заповніть всі поля корректними значеннями!", {autoClose: 2000})
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
                toast.success("Книгу успішно додано!");
                navigator("/admin");
            }
        }
        catch {
            toast.error("Такого автора або видавництва не існує", {autoClose: 2000});
        }
    }

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    return (
        <div className="box-container admin-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input">
                    <div className="admin-label">Назва</div>
                    <input type="text" placeholder="Назва" value={data.name}
                           onChange={(e) => handleChange(e, "name")}/>
                </div>
                <div className="admin-input">
                    <div className="admin-label">Жанр</div>
                    <input type="text" placeholder="Жанр" value={data.genre}
                           onChange={(e) => handleChange(e, "genre")}/>
                </div>
            </div>
            <div>
                <div className="admin-label">Опис</div>
                <textarea className="admin-textarea" placeholder="Опис" value={data.description}
                          onChange={(e) => handleChange(e, "description")}></textarea>
            </div>
            <div className="admin-input-row">
                <div className="admin-input">
                    <div className="login-input-label">Мова</div>
                    <input type="text" placeholder="Мова" value={data.language}
                           onChange={(e) => handleChange(e, "language")}/>
                </div>
                <div className="admin-input">
                    <div className="login-input-label">Тип обкладинки</div>
                    <input type="text" placeholder="Тип обкладинки" value={data.coverType}
                           onChange={(e) => handleChange(e, "coverType")}/>
                </div>
            </div>
            <div className="admin-input-row">
                <div className="admin-input">
                    <div className="login-input-label">Ім'я автора</div>
                    <input type="text" placeholder="Ім'я автора" value={data.authorName}
                           onChange={(e) => handleChange(e, "authorName")}/>
                </div>
                <div className="admin-input">
                    <div className="login-input-label">Назва видавництва</div>
                    <input type="text" placeholder="Назва видавництва" value={data.publishingName}
                           onChange={(e) => handleChange(e, "publishingName")}/>
                </div>
            </div>
            <div className="admin-input-row">
                <div className="admin-input">
                    <div className="login-input-label">Рік видання</div>
                    <input type="number" placeholder="Рік видання"
                           value={data.publicationYear !== 0 ? data.publicationYear : ""}
                           onChange={(e) => handleChange(e, "publicationYear")}/>
                </div>
                <div className="admin-input">
                    <div className="login-input-label">Кількість сторінок</div>
                    <input type="number" placeholder="Кількість сторінок" value={data.volume !== 0 ? data.volume : ""}
                           onChange={(e) => handleChange(e, "volume")}/>
                </div>
            </div>
            <div className="admin-input-row">
                <div className="admin-input">
                    <div className="login-input-label">Ціна</div>
                    <input type="number" placeholder="Ціна" value={data.price !== 0 ? data.price : ""}
                           onChange={(e) => handleChange(e, "price")}/>
                </div>
                <div className="admin-input">
                    <div className="login-input-label">Кількість на складі</div>
                    <input type="number" placeholder="Кількість на складі" value={data.count !== 0 ? data.count : ""}
                           onChange={(e) => handleChange(e, "count")}/>
                </div>
            </div>
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Головне зображення</div>
                    <input type="file" accept="image/*" onChange={(e) => handleChange(e, "mainImage")}/>
                </div>
            </div>
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Зображення</div>
                    <input type="file" accept="image/*" multiple onChange={(e) => handleChange(e, "imgFiles")}/>
                </div>
            </div>
            <button onClick={AddHandler} className="button admin-button">Додати</button>
        </div>

    )
}

export default AddBook;