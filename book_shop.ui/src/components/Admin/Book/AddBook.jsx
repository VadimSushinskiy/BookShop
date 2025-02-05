import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../../../config.json"
import "../Admin.css"
import {toast} from "react-toastify";
import handleChangeInAdmin from "../../../tools/HandleChangeInAdmin";
import GetJsxInputRow from "../../../tools/GetJsxInputRow";

const AddBook = () => {
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

    const inputData = [
        [{label: "Назва", value: "name", isArea: false}, {label: "Жанр", value: "genre", isArea: false}],
        [{label: "Опис", value: "description", isArea: true}],
        [{label: "Мова", value: "language", isArea: false}, {label: "Тип обкладинки", value: "coverType", isArea: false}],
        [{label: "Ім'я автора", value: "authorName", isArea: false}, {label: "Назва видавництва", value: "publishingName", isArea: false}],
        [{label: "Рік видання", value: "publicationYear", isArea: false}, {label: "Кількість сторінок", value: "volume", isArea: false}],
        [{label: "Ціна", value: "price", isArea: false}, {label: "Кількість на складі", value: "count", isArea: false}],
    ];

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

    return (
        <div className="box-container admin-container">
            <title>КнигаUA | Адміністрування</title>
            {inputData.map((input) => GetJsxInputRow(input, handleChangeInAdmin, data, setData))}
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Головне зображення</div>
                    <input type="file" accept="image/*" onChange={(e) => handleChangeInAdmin(e, "mainImage", data, setData)}/>
                </div>
            </div>
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Зображення</div>
                    <input type="file" accept="image/*" multiple onChange={(e) => handleChangeInAdmin(e, "mainImage", data, setData)}/>
                </div>
            </div>
            <button onClick={AddHandler} className="button admin-button">Додати</button>
        </div>

    )
}

export default AddBook;