import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../../../context/UserContext";
import config from "../../../../../config.json"
import "../Statistics.css"
import PublishingStatistics from "./PublishingStatistics";

const PublishingsStatistics = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [publishing, setPublishing] = useState([]);
    const [hideButton, setHideButton] = useState(false);

    const PAGE_SIZE = 10;

    useEffect(() => {
        if (user?.role !== "Owner") {
            navigator("/admin");
        }
    }, []);

    useEffect(() => {
        setPublishing([]);
        setPageNum(1)
        DownloadPublishings(1);
    }, [name]);

    const DownloadPublishings = async (page) => {
        const response = await axios.get(`${config.SERVER_URL}/publishing/statistics`,
            {
                params: {
                    Name: name,
                    pageNumber: page,
                    pageSize: PAGE_SIZE,
                },
                withCredentials: true
            });
        setPublishing(prev => [...prev, ...response.data.slice(0, PAGE_SIZE)]);
        setPageNum(prev => prev + 1);
        setHideButton(response.data.length <= PAGE_SIZE);
    }

    return (
        <div className="box-container statistics-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Назва видавництва</div>
                    <input type="text" placeholder="Назва видавництва" value={name} onChange={(e) => setName(e.target.value)}/>
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
                {publishing.map(u => {
                    return <PublishingStatistics key={u.id} {...u}/>
                })}
                </tbody>
            </table>
            <button onClick={() => DownloadPublishings(pageNum)} hidden={hideButton} className="button admin-button">Показати
                ще
            </button>
        </div>
    )
}

export default PublishingsStatistics;