import {useEffect, useState} from "react";
import Book from "./Book";
import axios from "axios";

const Books = (prop) => {
    const {name, minPrice, maxPrice, genre, language, authorName} = prop;
    const [books, setBooks] = useState([]);
    const [pageNum, setPageNum] = useState(1)

    const DownloadBooks = async (page) => {
        const response = await axios.get(`https://localhost:7259/api/book`,
            {
                params: {
                    pageNumber: page,
                    pageSize: 1,
                    Name: name,
                    minPrice,
                    maxPrice,
                    Genre: genre,
                    Language: language,
                    AuthorName: authorName
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
        <>
            <div className="books">
                {books.map(book => {
                    return <Book key={book.id} {...book}/>
                })}
            </div>
            <button onClick={() => DownloadBooks(pageNum)}>
                Показати ще
            </button>
        </>
    )
}

export default Books;