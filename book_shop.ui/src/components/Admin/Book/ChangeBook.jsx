import {useState} from "react";
import axios from "axios";
import config from "../../../../config.json"
import "../Admin.css"
import {toast} from "react-toastify";
import GetJsxInputRow from "../../../tools/GetJsxInputRow";
import handleChangeInAdminBook from "../../../tools/HandleChangeInAdmin";

const ChangeBook = () => {
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
    const [hidden, setHidden] = useState(true);

    const inputData = [
        [{label: "Назва", value: "name", isArea: false}, {label: "Жанр", value: "genre", isArea: false}],
        [{label: "Опис", value: "description", isArea: true}],
        [{label: "Мова", value: "language", isArea: false}, {label: "Тип обкладинки", value: "coverType", isArea: false}],
        [{label: "Ім'я автора", value: "authorName", isArea: false}, {label: "Назва видавництва", value: "publishingName", isArea: false}],
        [{label: "Рік видання", value: "publicationYear", isArea: false}, {label: "Кількість сторінок", value: "volume", isArea: false}],
        [{label: "Ціна", value: "price", isArea: false}, {label: "Кількість на складі", value: "count", isArea: false}],
    ];

    const FindBook = async () => {
        setHidden(true);

        if (id <= 0) {
            toast.error("Введіть коректне значення id", {autoClose: 2000})
        }
        else {
            try {
                const response = await axios.get(`${config.SERVER_URL}/book/${id}`);
                if (response.status === 200) {
                    setData({...response.data, mainImage: null, imgFiles: null});
                    setHidden(false);
                }
            }
            catch {
                toast.error("Книги з таким id не знайдено", {autoClose: 2000})
                setData(defaultData);
            }
        }
    }

    const ChangeBook = async () => {
        for (let key in data) {
            if (defaultData.hasOwnProperty(key) && !["mainImage", "imgFiles"].includes(key) && (data[key] === "" || +data[key] <= 0)) {
                toast.error("Заповніть всі поля корректними значеннями", {autoClose: 2000})
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
                toast.success("Книгу успішно змінено!");
                setHidden(true);
                setId(0);
            }
        }
        catch {
            toast.error("Такого автора або видавництва не існує", {autoClose: 2000})
        }
    }

    return (
        <div className="box-container admin-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single admin-find">
                    <div className="login-input-label">Id</div>
                    <input type="number" placeholder="Id" value={id}
                           onChange={(e) => setId(+e.target.value)}/>
                </div>
            </div>
            <button onClick={FindBook} className="button admin-button">Знайти</button>
            {!hidden && <>
                {inputData.map((input) => GetJsxInputRow(input, handleChangeInAdminBook, data, setData))}
                <div className="admin-input-row">
                    <div className="admin-input admin-single">
                        <div className="login-input-label">Головне зображення</div>
                        <input type="file" accept="image/*" onChange={(e) => handleChangeInAdminBook(e, "mainImage")}/>
                    </div>
                </div>
                <div className="admin-input-row">
                    <div className="admin-input admin-single">
                        <div className="login-input-label">Зображення</div>
                        <input type="file" accept="image/*" multiple onChange={(e) => handleChangeInAdminBook(e, "imgFiles")}/>
                    </div>
                </div>
                <button onClick={ChangeBook} className="button admin-button">Редагувати</button>
            </>}
        </div>
    )
}

export default ChangeBook;