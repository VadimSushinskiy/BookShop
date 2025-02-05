import {useState} from "react";
import axios from "axios";
import config from "../../../../config.json"
import {toast} from "react-toastify";
import GetJsxInputRow from "../../../tools/GetJsxInputRow";
import handleChangeInAdmin from "../../../tools/HandleChangeInAdmin";

const ChangeAuthor = () => {
    const defaultData = {name: "", country: ""};

    const [name, setName] = useState("");
    const [data, setData] = useState(defaultData);
    const [hidden, setHidden] = useState(true);

    const FindAuthor = async () => {
        setHidden(true);

        if (name === "") {
            toast.error("Введіть коректне ім'я автора", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.get(`${config.SERVER_URL}/author/${name}`);
                if (response.status === 200) {
                    setData({name: response.data.fullname, country: response.data.country});
                    setHidden(false);
                }
            }
            catch {
                toast.error("Автора з таким ім'ям не знайдено", {autoClose: 2000});
                setData(defaultData)
            }
        }
    }

    const ChangeAuthor = async () => {
        if (data.name === "" || data.country === "") {
            toast.error("Введіть дані в усі поля", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.put(`${config.SERVER_URL}/author/${name}`, {
                    fullname: data.name,
                    country: data.country
                }, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    toast.success("Автора успішно змінено!");
                    setHidden(true);
                    setName("");
                }
            }
            catch {
                toast.error("Автора з таким ім'ям не знайдено", {autoClose: 2000});
            }
        }
    }

    const inputData = [
        [{label: "Повне ім'я", value: "name", isArea: false}, {label: "Країна автора", value: "country", isArea: false}]
    ];

    return (
        <div className="box-container admin-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single admin-find">
                    <div className="login-input-label">Повне ім'я</div>
                    <input type="text" placeholder="Повне ім'я" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <button onClick={FindAuthor} className="button admin-button">Знайти</button>
            {!hidden && <>
                {inputData.map((input) => GetJsxInputRow(input, handleChangeInAdmin, data, setData))}
                <div>
                    <button onClick={ChangeAuthor} className="button admin-button">Редагувати</button>
                </div>
            </>}
        </div>
    )
}

export default ChangeAuthor;