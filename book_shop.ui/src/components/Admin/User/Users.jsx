import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import config from "../../../../config.json"
import Book from "../../Books/Book";
import User from "./User";

const Users = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [users, setUsers] = useState([]);

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
                    pageSize: 10,
                },
                withCredentials: true
            });
        setUsers(prev => [...prev, ...response.data])
        setPageNum(prev => prev + 1)
    }

    return (
        <>
            <div>
                <input type="text" placeholder="Нік" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="users">
                {users.map(u => {
                    return <User key={u.id} {...u}/>
                })}
            </div>
            <button onClick={() => DownloadUsers(pageNum)}>
                Показати ще
            </button>
        </>
    )
}

export default Users;