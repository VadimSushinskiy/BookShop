import {Link} from "react-router-dom";
import config from "../../../config.json"

const Book = ({id, name, price, authorName, mainImageSrc, rating}) => {
    return (
        <div>
            <Link to={id.toString()}>
                <img src={`${config.IMAGE_SERVICE_URL}/${mainImageSrc}`} width="200px" alt="book"/>
                <div>{name} by {authorName} for {price}. Rating: {+rating.toFixed(1)}</div>
            </Link>
        </div>
    )
}

export default Book;