import {useState} from "react";
import axios from "axios";
import config from "../../../../config.json"
import {toast} from "react-toastify";
import GetJsxInputRow from "../../../tools/GetJsxInputRow";
import handleChangeInAdmin from "../../../tools/HandleChangeInAdmin";

const ChangePublishing = () => {
    const defaultData = {name: "", country: ""};

    const [name, setName] = useState("");
    const [data, setData] = useState(defaultData);
    const [hidden, setHidden] = useState(true);

    const inputData = [
        [{label: "Назва видавництва", value: "name", isArea: false}, {label: "Країна видавництва", value: "country", isArea: false}]
    ];

    const FindPublishing = async () => {
        setHidden(true);

        if (name === "") {
            toast.error("Введіть коректну назву видавництва", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.get(`${config.SERVER_URL}/publishing/${name}`);
                if (response.status === 200) {
                    setData({name: response.data.name, country: response.data.country});
                    setHidden(false);
                }
            }
            catch {
                toast.error("Видавництва з такою назвою не знайдено", {autoClose: 2000});
                setData(defaultData);
            }
        }
    }

    const ChangePublishing = async () => {
        if (data.name === "" || data.country === "") {
            toast.error("Введіть дані в усі поля", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.put(`${config.SERVER_URL}/publishing/${name}`, {
                    name: data.name,
                    country: data.country
                }, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    toast.success("Видавництво успішно змінено!");
                    setHidden(true);
                    setName("");
                }
            }
            catch {
                toast.error("Видавництва з такою назвою не знайдено", {autoClose: 2000});
            }
        }
    }

    return (
        <div className="box-container admin-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single admin-find">
                    <div className="login-input-label">Назва</div>
                    <input type="text" placeholder="Назва" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <button onClick={FindPublishing} className="button admin-button">Знайти</button>
            {!hidden && <>
                {inputData.map((input) => GetJsxInputRow(input, handleChangeInAdmin, data, setData))}
                <div>
                    <button onClick={ChangePublishing} className="button admin-button">Редагувати</button>
                </div>
            </>}
        </div>
    )
}

export default ChangePublishing;