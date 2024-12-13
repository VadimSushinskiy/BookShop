import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import Cookies from "js-cookie";

const SingleBook = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(undefined);
    const [review, setReview] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [text, setText] = useState("")
    const [rating, setRating] = useState("")
    const [disabled, setDisabled] = useState(false);
    const [disabledBuy, setDisabledBuy] = useState(false);
    const [error, setError] = useState("");

    const {user} = useContext(UserContext);

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

    const BuyBook = async () => {
        setDisabledBuy(true);
        const cartId = user !== null ? user.cartId : Cookies.get("anonCartId");
        const response = await axios.post(`https://localhost:7259/api/order/${cartId}`, {
            count: 1,
            book
        });

        if (response.status === 200) {
            setDisabledBuy(false);
        }
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setDisabled(true);

        try {
            if (rating.length !== 1) {
                setError("Оберіть оцінку!")
            }
            else {
                const response = await axios.post(`https://localhost:7259/api/review/${params.id}`, {
                    text: text,
                    rating: Number(rating)
                }, {
                    withCredentials: true
                });

                if (response.status === 200) {
                    setText("");
                    setRating("");
                    setReview([response.data, ...review]);
                }
            }
        }
        catch {
            setError("Сталась невідома помилка!")
        }

        setDisabled(false);
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
                <button onClick={BuyBook} disabled={disabledBuy}>Купити</button>
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
                {user && <div>
                    <h4>Додати відгук:</h4>
                    {error !== "" && <div>{error}</div>}
                    <form action="" onSubmit={(e) => SubmitHandler(e)}>
                        <span>Оцінка: </span>
                        <input type="number" min="1" max="5" value={rating} onChange={(e) => {
                            const val = e.target.value;
                            if (val.length < 2 && "12345".includes(val)) {
                                setRating(val);
                            }
                        }}/>
                        <p>Ваш відгук: </p>
                        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
                        <div>
                            <button type="Submit" disabled={disabled}>Додати</button>
                        </div>
                    </form>
                </div>}

            </>
        )
    }

    return <div>Завантаження...</div>
}

export default SingleBook;