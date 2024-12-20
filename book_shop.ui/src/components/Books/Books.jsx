import {useEffect, useState} from "react";
import axios from "axios";
import Book from "./Book";
import config from "../../../config.json"
import "./Books.css"

const Books = (prop) => {
    const {name, minPrice, maxPrice, genre, language, authorName, rating} = prop;
    const [books, setBooks] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [sort, setSort] = useState("");
    const [hideButton, setHideButton] = useState(false);

    const PAGE_SIZE = 21;

    const DownloadBooks = async (page) => {
        const response = await axios.get(`${config.SERVER_URL}/book`,
            {
                params: {
                    pageNumber: page,
                    pageSize: PAGE_SIZE,
                    Name: name,
                    minPrice,
                    maxPrice,
                    Genre: genre,
                    Language: language,
                    AuthorName: authorName,
                    Rating: rating !== "" ? +rating : 0,
                    sort
                }
            });
        setBooks(prev => [...prev, ...response.data.slice(0, PAGE_SIZE)])
        setPageNum(prev => prev + 1)
        setHideButton(response.data.length <= PAGE_SIZE);
    }

    const ChangeSortHandler = (e) => {
        setSort(e.target.value);
    }

    useEffect(() => {
        setBooks([]);
        setPageNum(1)
        DownloadBooks(1);
    }, [prop, sort]);

    return (
        <div className="books-container">
            <div className="select-container select-book">
                <select className="select-beautiful" defaultValue="" onChange={(e) => ChangeSortHandler(e)}>
                    <option value="">-</option>
                    <option value="rating">За рейтингом</option>
                    <option value="cheap">Від дешевших до дорожчих</option>
                    <option value="expensive">Від дорожчих до дешевших</option>
                </select>
            </div>
            <div className="books">
                {books.map(book => {
                    return <Book key={book.id} {...book}/>
                })}
            </div>
            <button className="button load-book-button" hidden={hideButton} onClick={() => DownloadBooks(pageNum)}>Показати ще</button>
        </div>
    )
}

export default Books;