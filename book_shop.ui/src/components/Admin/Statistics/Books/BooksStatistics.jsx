import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../../../config.json"
import "../Statistics.css"
import BookStatistics from "./BookStatistics";

const BooksStatistics = () => {

    const [name, setName] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [books, setBooks] = useState([]);
    const [hideButton, setHideButton] = useState(false);

    const PAGE_SIZE = 10;

    useEffect(() => {
        setBooks([]);
        setPageNum(1)
        DownloadBooks(1);
    }, [name]);

    const DownloadBooks = async (page) => {
        const response = await axios.get(`${config.SERVER_URL}/book/statistics`,
            {
                params: {
                    Name: name,
                    pageNumber: page,
                    pageSize: PAGE_SIZE,
                },
                withCredentials: true
            });
        setBooks(prev => [...prev, ...response.data.slice(0, PAGE_SIZE)]);
        setPageNum(prev => prev + 1);
        setHideButton(response.data.length <= PAGE_SIZE);
    }

    return (
        <div className="box-container statistics-container">
            <title>КнигаUA | Адміністрування</title>
            <div className="admin-input-row">
                <div className="admin-input admin-single">
                    <div className="login-input-label">Назва книги</div>
                    <input type="text" placeholder="Назва книги" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <table className="statistics-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Назва</th>
                    <th>Ім'я автора</th>
                    <th>Назва видавництва</th>
                    <th>Залишок на складі</th>
                    <th>Ціна</th>
                    <th>Продано</th>
                    <th>Зароблено</th>
                </tr>
                </thead>
                <tbody>
                {books.map(u => {
                    return <BookStatistics key={u.id} {...u}/>
                })}
                </tbody>
            </table>
            <button onClick={() => DownloadBooks(pageNum)} hidden={hideButton} className="button admin-button">Показати
                ще
            </button>
        </div>
    )
}

export default BooksStatistics;