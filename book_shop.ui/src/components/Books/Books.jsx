import {useEffect, useState} from "react";
import axios from "axios";
import Book from "./Book";
import config from "../../../config.json"
import "./Books.css"

const Books = (prop) => {
    const {name, minPrice, maxPrice, genre, language, authorName, rating} = prop;
    const [books, setBooks] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const DownloadBooks = async (page) => {
        const response = await axios.get(`${config.SERVER_URL}/book`,
            {
                params: {
                    pageNumber: page,
                    pageSize: 10,
                    Name: name,
                    minPrice,
                    maxPrice,
                    Genre: genre,
                    Language: language,
                    AuthorName: authorName,
                    Rating: rating !== "" ? +rating : 0
                }
            });
        setBooks(prev => [...prev, ...response.data])
        setPageNum(prev => prev + 1)
    }

    useEffect(() => {
        setBooks([]);
        setPageNum(1)
        DownloadBooks(1);
    }, [prop]);

    return (
        <div className="books-container">
            <div className="books">
                {books.map(book => {
                    return <Book key={book.id} {...book}/>
                })}
            </div>
            <button className="button load-book-button" onClick={() => DownloadBooks(pageNum)}>Показати ще</button>
        </div>
    )
}

export default Books;