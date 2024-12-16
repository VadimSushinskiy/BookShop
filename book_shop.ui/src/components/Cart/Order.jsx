import config from "../../../config.json"

const Order = ({id, count, book, imgSrc, changeHandler, deleteHandler}) => {
    return (
        <div>
            <img src={`${config.IMAGE_SERVICE_URL}/${imgSrc}`} width="200px" alt=""/>
            <span>{book.name} - </span>
            <button onClick={() => changeHandler(-1, id, count, book.price)}>-</button>
            <span>{count}</span>
            <button onClick={() => changeHandler(1, id, count, book.price)}>+</button>
            <button onClick={() => deleteHandler(id, count, book.price)}>Видалити</button>
        </div>
    );
}

export default Order;