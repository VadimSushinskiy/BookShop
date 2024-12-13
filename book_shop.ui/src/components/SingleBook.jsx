import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const SingleBook = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(undefined);
    const [review, setReview] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [text, setText] = useState("")
    const [rating, setRating] = useState("")

    const LoadReview = async () => {
        const response = await axios.get(`https://localhost:7259/api/review/${params.id}`, {
            params: {
                pageNumber: pageNum,
                pageSize: 1
            }
        });
        if (response.status === 200) {
            setReview([...review, ...response.data]);
            setPageNum(pageNum + 1);
        }
    }

    const SubmitHandler = async () => {
        const response = await axios.post(`https://localhost:7259/api/review/${params.id}`, {
            text: text,
            rating: Number(rating)
        });
        if (response.status === 200) {
            setReview([response.data, ...review])
        }
    }

    useEffect(() => {
        (async () => {
            const response = await axios.get(`https://localhost:7259/api/book/${params.id}`);
            if (response.status === 200) {
                setBook(response.data);
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
                    <input type="number" required min="1" max="5" value={rating} onChange={(e) => {
                        const val = e.target.value;
                        if (val.length < 2 && "12345".includes(val)) {
                            setRating(val);
                        }
                    }}/>
                    <p>Ваш відгук: </p>
                    <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
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