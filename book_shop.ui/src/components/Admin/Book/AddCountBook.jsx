import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"
import {toast} from "react-toastify";

const AddCountBook = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [id, setId] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    const UpdateHandler = async () => {
        if (id <= 0 || count <= 0) {
            toast.error("Введіть коректні дані", {autoClose: 2000})
        }
        else {
            try {
                const response = await axios.put(`${config.SERVER_URL}/book/${id}`, {},{
                    withCredentials: true,
                    params: {
                        count
                    }
                });

                if (response.status === 204) {
                    toast.success("Кількість книг успішно оновлено!");
                    setId(0);
                    setCount(0);
                }
            }
            catch {
                toast.error("Книги з таким id не існує", {autoClose: 2000});
            }
        }
    }

    return (
        <div className="box-container admin-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input">
                    <div className="admin-label">Id</div>
                    <input type="text" placeholder="Id" value={id !== 0 ? id : ""} onChange={(e) => setId(+e.target.value)}/>
                </div>
                <div className="admin-input">
                    <div className="admin-label">Кількість доданих книг</div>
                    <input type="text" placeholder="Кількість доданих книг" value={count !== 0 ? count : ""}
                           onChange={(e) => setCount(+e.target.value)}/>
                </div>
            </div>
            <button onClick={UpdateHandler} className="button admin-button">Додати</button>
        </div>
    )
}

export default AddCountBook;