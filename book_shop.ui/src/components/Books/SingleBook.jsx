import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserContext from "../../context/UserContext";
import config from "../../../config.json"
import "../../App.css"
import Gallery from "./Gallery";
import "./SingleBook.css"
import Review from "./Review";
import {toast} from "react-toastify";

const SingleBook = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(undefined);
    const [review, setReview] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [additional, setAdditional] = useState(0);
    const [text, setText] = useState("")
    const [id, setId] = useState(0);
    const [rating, setRating] = useState(0);
    const [oldRating, setOldRating] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [disabledBuy, setDisabledBuy] = useState(false);
    const [hideButton, setHideButton] = useState(false);
    const [editButton, setEditButton] = useState(false);
    const {user} = useContext(UserContext);

    const PAGE_SIZE = 3;

    const LoadReview = async () => {
        const response = await axios.get(`${config.SERVER_URL}/review/${params.id}`, {
            params: {
                pageNumber: pageNum,
                pageSize: PAGE_SIZE,
                additionalSkip: additional
            }
        });
        if (response.status === 200) {
            setReview([...review, ...response.data.slice(0, PAGE_SIZE)]);
            setPageNum(pageNum + 1);
            setHideButton(response.data.length <= PAGE_SIZE)
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
            toast.success("Ви додали книгу до кошика!")
            return true
        }
    }

    const BuyBookCart = async () => {
        if (await BuyBook()) {
            navigate("../cart", {relative: "path"})
        }
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setDisabled(true);

        try {
            if (rating < 1 || rating > 5) {
                toast.error("Оберіть оцінку", {autoClose: 2000});
            }
            else if (text === "") {
                toast.error("Введіть відгук", {autoClose: 2000});
            }
            else {
                const response = await axios.post(`${config.SERVER_URL}/review/${params.id}`, {
                    text,
                    rating
                }, {
                    withCredentials: true
                });

                if (response.status === 200) {
                    setBook({...book, rating: (book.rating * book.ratingNumber + rating) / (book.ratingNumber + 1), ratingNumber: book.ratingNumber + 1});
                    setText("");
                    setRating(0);
                    setAdditional(additional + 1);
                    setReview([response.data, ...review]);
                    toast.success("Відгук додано!")
                }
            }
        }
        catch {
            toast.error("Сталась невідома помилка", {autoClose: 2000});
        }

        setDisabled(false);
    }

    const getIndex = (e) => {
        if (e.target.tagName === "SPAN") {
            const stars = e.target.parentElement.children;
            const idx = [...stars].indexOf(e.target);

            setRating(idx + 1);
        }
    }

    const DeleteHandler = async (id, rating) => {
        try {
            const response = await axios.delete(`${config.SERVER_URL}/review/${id}`, {
                withCredentials: true
            });

            if (response.status === 200) {
                setReview(review.filter(review => review.id !== id));
                setBook({...book, rating: (book.rating * book.ratingNumber - rating) / (book.ratingNumber - 1), ratingNumber: book.ratingNumber - 1});
                toast.success("Відгук видалено");
            }
        }
        catch {
            toast.error("Ви не можете видалите цей відгук")
        }
    }

    const StartEditing = (id, text, rating) => {
        setText(text);
        setRating(rating);
        setOldRating(rating);
        setId(id);
        setEditButton(true);
    }

    const EndEditing = async () => {
        try {
            const response = await axios.put(`${config.SERVER_URL}/review`, {
                id,
                text,
                rating
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setReview(review.map(review => {
                    if (review.id === id) {
                        review.text = text;
                        review.rating = rating;
                    }
                    return review;
                }));
                setBook({...book, rating: (book.rating * book.ratingNumber - oldRating + rating) / book.ratingNumber});
                setRating(0);
                setText("");
                setOldRating(0);
                setId(0);
                setEditButton(false);
                toast.success("Відгук змінено!");
            }
        }
        catch {
            toast.error("Ви не можете редагувати цей відгук")
        }
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
                        <div className="author" title={book.authorCountry}>{book.authorName}</div>
                        <a href="#review" className="stars-rating">
                            <div className="stars stars-single-book">
                                <span></span>
                                <div className="inner" style={{width: `${+book.rating / 5 * 100}%`}}></div>
                            </div>
                            <div className="rating">{book.ratingNumber} відгуків</div>
                        </a>
                        <div className="additional-inf">
                            <div>
                                <div>Мова книги</div>
                                <div>{book.language}</div>
                            </div>
                            <div>
                                <div>Видавництво</div>
                                <div title={book.publishingCountry}>{book.publishingName}</div>
                            </div>
                            <div>
                                <div>Рік видання</div>
                                <div>{book.publicationYear} рік</div>
                            </div>
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
                                <h4 id="review">Відгуки</h4>
                                <div className="reviews">
                                    {review.map(review => <Review key={review.id} {...review} deleteHandler={DeleteHandler} editHandler={StartEditing}/>)}
                                </div>

                                <button onClick={LoadReview} hidden={hideButton} className="button review-button">Загрузити ще</button>
                            </>
                        )}
                        {user && <div className="add-review">
                            <h4>Додати відгук</h4>
                            <div className="review-container">
                                <form id="add-review" action="" onSubmit={(e) => SubmitHandler(e)}>
                                    <div className="review-container-flex">
                                        <div className="add-rating">
                                            <div>Оцінка:</div>
                                            <div className="add-stars" onClick={(e) => getIndex(e)}>
                                                {["☆", "☆", "☆", "☆", "☆"].map((star, idx) => {
                                                    if (rating <= idx) {
                                                        return <span key={idx}>☆</span>
                                                    }
                                                    else {
                                                        return <span key={idx}>★</span>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <div className="add-review-text-hint">Ваш відгук:</div>
                                        <div className="add-text">
                                        <textarea value={text}
                                                  spellCheck="false"
                                                  onChange={(e) => setText(e.target.value)}>
                                        </textarea>
                                        </div>
                                        <button type="Submit" disabled={disabled} hidden={editButton} className="button review-button">Додати</button>
                                        <button type="button" onClick={EndEditing} disabled={disabled} hidden={!editButton} className="button review-button">Редагувати</button>
                                    </div>
                                </form>
                            </div>
                        </div>}
                    </div>
                    <div className="book-buy">
                        <div className="price">{book.price} грн</div>
                        <button onClick={BuyBook} disabled={disabledBuy} className="button-buy buy-button">До кошику
                        </button>
                        <button onClick={BuyBookCart} disabled={disabledBuy} className="button-buy cart-button">Купити
                            негайно
                        </button>
                        <div className="article">
                            <div>Артикул</div>
                            <div>{book.id.toString().padStart(6, "0")}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <div>Завантаження...</div>
}

export default SingleBook;