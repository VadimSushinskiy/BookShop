import {Link} from "react-router-dom";

const Book = ({id, name, price, authorName}) => {
    return (
        <div>
            <Link to={id.toString()}>{name} by {authorName} for {price}</Link>
        </div>
    )
}

export default Book;