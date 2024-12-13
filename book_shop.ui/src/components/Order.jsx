const Order = ({id, count, book, changeHandler, deleteHandler}) => {
    return (
        <div>
            <span>{book.name} - </span>
            <button onClick={() => changeHandler(-1, id, count, book.price)}>-</button>
            <span>{count}</span>
            <button onClick={() => changeHandler(1, id, count, book.price)}>+</button>
            <button onClick={() => deleteHandler(id, count, book.price)}>Видалити</button>
        </div>
    );
}

export default Order;