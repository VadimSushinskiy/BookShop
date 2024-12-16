import {Link} from "react-router-dom";
import config from "../../../config.json"

const Book = ({id, name, price, authorName, mainImageSrc}) => {
    return (
        <div>
            <Link to={id.toString()}>
                <img src={`${config.IMAGE_SERVICE_URL}/${mainImageSrc}`} width="200px" alt="book"/>
                <div>{name} by {authorName} for {price}</div>
            </Link>
        </div>
    )
}

export default Book;