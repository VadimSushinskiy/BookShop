import config from "../../../config.json"
import "./Order.css"
import {Link} from "react-router-dom";

const Order = ({id, count, book, imgSrc, changeHandler, deleteHandler}) => {
    return (
        <div className="order-row">
            <Link to={`../${book.id}`} className="order-link">
                <img src={`${config.IMAGE_SERVICE_URL}/${imgSrc}`} alt=""/>
                <div className="order-info">
                    <div className="order-name">{book.name}</div>
                    <div className="order-author">{book.authorName}</div>
                    <div className="order-price">{book.price} грн</div>
                </div>
            </Link>
            <div className="order-count-delete">
                <div className="order-delete" onClick={() => deleteHandler(id, count, book.price)}>Видалити</div>
                <div className="order-count">
                    <span onClick={() => changeHandler(-1, id, count, book.price)}>-</span>
                    <div>{count}</div>
                    <span onClick={() => changeHandler(1, id, count, book.price)}>+</span>
                </div>
            </div>
        </div>
    );
}

export default Order;