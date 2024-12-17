import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserContext from "../../context/UserContext";
import config from "../../../config.json"
import "../../App.css"
import Gallery from "./Gallery";
import "./SingleBook.css"

const SingleBook = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(undefined);
    const [review, setReview] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [additional, setAdditional] = useState(0);
    const [text, setText] = useState("")
    const [rating, setRating] = useState("")
    const [disabled, setDisabled] = useState(false);
    const [disabledBuy, setDisabledBuy] = useState(false);
    const [error, setError] = useState("");

    const {user} = useContext(UserContext);

    const LoadReview = async () => {
        const response = await axios.get(`${config.SERVER_URL}/review/${params.id}`, {
            params: {
                pageNumber: pageNum,
                pageSize: 1,
                additionalSkip: additional
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
        const response = await axios.post(`${config.SERVER_URL}/order/${cartId}`, {
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
                setError("Оберіть оцінку!");
            }
            else if (text === "") {
                setError("Введіть відгук!");
            }
            else {
                const response = await axios.post(`${config.SERVER_URL}/review/${params.id}`, {
                    text: text,
                    rating: Number(rating)
                }, {
                    withCredentials: true
                });

                if (response.status === 200) {
                    setBook({...book, rating: (book.rating * book.ratingNumber + +rating) / (book.ratingNumber + 1), ratingNumber: book.ratingNumber + 1});
                    setText("");
                    setRating("");
                    setAdditional(additional + 1);
                    setReview([response.data, ...review]);
                }
            }
        }
        catch {
            setError("Сталась невідома помилка!");
        }

        setDisabled(false);
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${config.SERVER_URL}/book/${params.id}`);
                if (response.status === 200) {
                    setBook(response.data);
                    await LoadReview();
                }
            }
            catch {
                navigate("..", {relative: "path"});
            }
        })();
    }, []);

    if (book) {
        return (
            <div className="container">
                <div className="book-container">
                    <div className="book-images">
                        <Gallery images={book.imgFilesSrc}/>
                    </div>
                    <div className="book-info">
                        <div className="title">Книга «{book.name}»</div>
                        <div className="author">{book.authorName}</div>
                        <div className="stars-rating">
                            <div className="stars">
                                <span></span>
                                <div className="inner" style={{width: `${+book.rating / 5 * 100}%`}}></div>
                            </div>
                            <div className="rating">{book.ratingNumber} відгуків</div>
                        </div>
                        <div className="description">{book.description}</div>
                        <div className="char">
                            <h4>Характеристики</h4>
                            <div>
                                <div>Назва</div>
                                <div>{book.name}</div>
                            </div>
                            <div>
                                <div>Автор</div>
                                <div>{book.authorName}</div>
                            </div>
                            <div>
                                <div>Жанр</div>
                                <div>{book.genre}</div>
                            </div>
                            <div>
                                <div>Мова</div>
                                <div>{book.language}</div>
                            </div>
                            <div>
                                <div>Видавництво</div>
                                <div>{book.publishingName}</div>
                            </div>
                            <div>
                                <div>Рік видання</div>
                                <div>{book.publicationYear}</div>
                            </div>
                            <div>
                                <div>Кількість сторінок</div>
                                <div>{book.volume}</div>
                            </div>
                            <div>
                                <div>Тип обкладинки</div>
                                <div>{book.coverType}</div>
                            </div>
                        </div>

                        {review.length > 0 && (
                            <>
                                <h3>Відгуки:</h3>
                                {review.map(review => {
                                    return <div key={review.id}>{review.writingDate} {review.text} by {review.userName}.
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
                    </div>
                    <div className="book-buy">
                        <div>Price: {book.price}</div>
                        <button onClick={BuyBook} disabled={disabledBuy}>Купити</button>
                    </div>
                </div>


            </div>
        )
    }

    return <div>Завантаження...</div>
}

export default SingleBook;