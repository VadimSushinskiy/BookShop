import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const SingleBook = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(undefined);
    const [review, setReview] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const LoadReview = async () => {
        const res = await fetch(`https://localhost:7259/api/review/${params.id}?pageNumber=${pageNum}&pageSize=1`);
        if (res.ok) {
            const json = await res.json();
            setReview([...review, ...json]);
            setPageNum(pageNum + 1);
        }
    }

    const SubmitHandler = async () => {
        const res = await fetch(`https://localhost:7259/api/review/${params.id}`, {
            method: "POST",
            body: {
                text: "",
                rating: 1
            }
        });
        if (res.ok) {
            const json = await res.json();
            setReview([json, ...review])
        }
    }

    useEffect(() => {
        (async () => {
            const resBook = await fetch(`https://localhost:7259/api/book/${params.id}`);
            if (resBook.ok) {
                const jsonBook = await resBook.json();
                setBook(jsonBook);
                await LoadReview();
            }
            else {
                navigate("..", {relative: "path"});
            }
        })();
    }, []);

    if (book) {
        return (
            <>
                <div>{book.name} by {book.authorName}</div>
                <div>{book.description}</div>
                <div>Genre: {book.genre}</div>
                <div>Price: {book.price}</div>
                <div>Volume: {book.volume}</div>
                <div>Language: {book.language}</div>
                <div>Publishing: {book.publishingName}</div>
                {review.length > 0 && (
                    <>
                        <h3>Відгуки:</h3>
                        {review.map(review => {
                            return <div key={review.id}>{review.text} by {review.userName}.
                                Rating: {review.rating}</div>
                        })}
                        <button onClick={LoadReview}>Загрузити ще</button>
                    </>
                )}
                <h4>Додати відгук:</h4>
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    SubmitHandler();
                }}>
                    <span>Оцінка: </span>
                    <input type="number" min="1" max="5"/>
                    <p>Ваш відгук: </p>
                    <textarea></textarea>
                    <div>
                        <button type="Submit">Додати</button>
                    </div>
                </form>
            </>
        )
    }

    return <div>Завантаження...</div>
}

export default SingleBook;