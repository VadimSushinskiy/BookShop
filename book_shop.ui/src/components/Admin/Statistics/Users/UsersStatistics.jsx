import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../../../config.json"
import UserStatistics from "./UserStatistics";
import "../Statistics.css"

const UsersStatistics = () => {
    const [name, setName] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [users, setUsers] = useState([]);
    const [hideButton, setHideButton] = useState(false);

    const PAGE_SIZE = 10;

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
        <div className="box-container statistics-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Ім'я користувача</div>
                    <input type="text" placeholder="Нік" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <table className="statistics-table">
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
                    return <UserStatistics key={u.id} {...u}/>
                })}
                </tbody>
            </table>
            <button onClick={() => DownloadUsers(pageNum)} hidden={hideButton} className="button admin-button">
                Показати ще
            </button>
        </div>
    )
}

export default UsersStatistics;