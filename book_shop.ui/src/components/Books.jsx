import {useEffect, useState} from "react";
import Book from "./Book";

const Books = (prop) => {
    const {name, minPrice, maxPrice, genre, language, authorName} = prop;
    const [books, setBooks] = useState([]);
    const [pageNum, setPageNum] = useState(1)

    const DownloadBooks = async (page) => {
        const res = await fetch(`https://localhost:7259/api/book?pageNumber=${page}&pageSize=1
        &Name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&Genre=${genre}&Language=${language}&AuthorName=${authorName}`);
        const json = await res.json();
        setBooks(prev => [...prev, ...json])
        setPageNum(prev => prev + 1)
        console.log(1)
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
                Click me!
            </button>
        </>
    )
}

export default Books;