import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"

const DeleteBook = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [id, setId] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    const handleDelete = async () => {
        if (id === undefined || id <= 0) {
            setError("Введіть коректне значення id")
        }
        else {
            try {
                const response = await axios.delete(`${config.SERVER_URL}/book/${id}`, {
                    withCredentials: true
                });

                if (response.status === 204) {
                    setError("");
                }
            }
            catch {
                setError("Книги з таким id не існує!");
            }
        }
    }

    return (
        <div>
            {error !== "" && error}
            <div>
                <input type="number" placeholder="Id" value={id} onChange={(e) => setId(+e.target.value)}/>
            </div>
            <div>
                <button onClick={handleDelete}>Видалити</button>
            </div>
        </div>
    )
}

export default DeleteBook;