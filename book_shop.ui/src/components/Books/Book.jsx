import {Link} from "react-router-dom";
import config from "../../../config.json"
import "./Book.css"

const Book = ({id, name, price, authorName, mainImageSrc, rating, ratingNumber}) => {
    return (
        <div className="book">
            <Link to={id.toString()} className="link">
                <img src={`${config.IMAGE_SERVICE_URL}/${mainImageSrc}`} width="168px" alt="book"/>
                <div className="book-name">{name}</div>
                <div className="book-author">{authorName}</div>
                <div className="stars-rating">
                    <div className="stars start-book">
                        <span></span>
                        <div className="inner" style={{width: `${+rating / 5 * 100}%`}}></div>
                    </div>
                    <div className="rating">{ratingNumber} відгуків</div>
                </div>
                <div className="book-price">{price} грн</div>
            </Link>
        </div>
    )
}

export default Book;