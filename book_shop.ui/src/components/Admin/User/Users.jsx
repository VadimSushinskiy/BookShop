import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"
import Book from "../../Books/Book";
import User from "./User";
import "./Users.css"

const Users = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [users, setUsers] = useState([]);
    const [hideButton, setHideButton] = useState(false);

    const PAGE_SIZE = 10;

    useEffect(() => {
        if (user?.role !== "Admin" && user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    useEffect(() => {
        setUsers([]);
        setPageNum(1)
        DownloadUsers(1);
    }, [name]);

    const DownloadUsers = async (page) => {
        const response = await axios.get(`${config.SERVER_URL}/user`,
            {
                params: {
                    Name: name,
                    pageNumber: page,
                    pageSize: PAGE_SIZE,
                },
                withCredentials: true
            });
        setUsers(prev => [...prev, ...response.data.slice(0, PAGE_SIZE)]);
        setPageNum(prev => prev + 1);
        setHideButton(response.data.length <= PAGE_SIZE);
    }

    return (
        <div className="box-container users-container">
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Ім'я користувача</div>
                    <input type="text" placeholder="Нік" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ім'я</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Всього замовлень</th>
                        <th>Витрачено грошей</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return <User key={u.id} {...u}/>
                    })}
                </tbody>
            </table>
            <button onClick={() => DownloadUsers(pageNum)} hidden={hideButton} className="button admin-button">Показати ще</button>
        </div>
    )
}

export default Users;