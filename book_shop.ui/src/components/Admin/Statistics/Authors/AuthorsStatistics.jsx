import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../../../config.json"
import "../Statistics.css"
import AuthorStatistics from "./AuthorStatistics";

const AuthorsStatistics = () => {

    const [name, setName] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [authors, setAuthors] = useState([]);
    const [hideButton, setHideButton] = useState(false);

    const PAGE_SIZE = 10;

    useEffect(() => {
        setAuthors([]);
        setPageNum(1)
        DownloadAuthors(1);
    }, [name]);

    const DownloadAuthors = async (page) => {
        const response = await axios.get(`${config.SERVER_URL}/author/statistics`,
            {
                params: {
                    Name: name,
                    pageNumber: page,
                    pageSize: PAGE_SIZE,
                },
                withCredentials: true
            });
        setAuthors(prev => [...prev, ...response.data.slice(0, PAGE_SIZE)]);
        setPageNum(prev => prev + 1);
        setHideButton(response.data.length <= PAGE_SIZE);
    }

    return (
        <div className="box-container statistics-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Ім'я автора</div>
                    <input type="text" placeholder="Ім'я автора" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <table className="statistics-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Ім'я</th>
                    <th>Всього різних книг</th>
                    <th>Всього продано книг</th>
                    <th>Продано книг на</th>
                </tr>
                </thead>
                <tbody>
                {authors.map(u => {
                    return <AuthorStatistics key={u.id} {...u}/>
                })}
                </tbody>
            </table>
            <button onClick={() => DownloadAuthors(pageNum)} hidden={hideButton} className="button admin-button">Показати
                ще
            </button>
        </div>
    )
}

export default AuthorsStatistics;