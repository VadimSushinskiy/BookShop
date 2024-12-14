import {useContext, useEffect, useState} from "react";
import UserContext from "../../../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const DeleteBook = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [id, setId] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user?.role !== "Admin") {
            navigator("..", {relative: "path"});
        }
    }, []);

    const handleDelete = async () => {
        if (id === undefined || id <= 0) {
            setError("Введіть коректне значення id")
        }
        else {
            const response = await axios.delete(`https://localhost:7259/api/book/${id}`, {
                withCredentials: true
            });

            if (response.status === 204) {
                navigator("/admin");
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