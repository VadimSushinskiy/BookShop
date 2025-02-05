import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from "../../../../config.json";
import {toast} from "react-toastify";
import GetJsxInputRow from "../../../tools/GetJsxInputRow";
import handleChangeInAdmin from "../../../tools/HandleChangeInAdmin";

const AddPublishing = () => {
    const navigator = useNavigate();

    const [data, setData] = useState({
        name: "",
        country: "",
    });

    const inputData = [
        [{label: "Назва видавництва", value: "name", isArea: false}, {label: "Країна видавництва", value: "country", isArea: false}]
    ];

    const AddHandler = async () => {
        if (data.name === "" || data.country === "") {
            toast.error("Введіть дані в усі поля", {autoClose: 2000});
        }
        else {
            try {
                const response = await axios.post(`${config.SERVER_URL}/publishing`, {
                    name: data.name,
                    country: data.country
                }, {
                    withCredentials: true
                });

                if (response.status === 201) {
                    toast.success("Видавництво успішно додано!");
                    navigator("/admin");
                }
            }
            catch {
                toast.error("Видавництво з такою назвою вже існує", {autoClose: 2000});
            }
        }
    }

    return (
        <div className="box-container admin-container">
            <title>КнигаUA | Адміністрування</title>
            {inputData.map((input) => GetJsxInputRow(input, handleChangeInAdmin, data, setData))}
            <button onClick={AddHandler} className="button admin-button">Додати видавництво</button>
        </div>
    )
}

export default AddPublishing;