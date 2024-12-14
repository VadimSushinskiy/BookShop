const OrderStatus = ({id, totalPrice, status, name, address}) => {
    return <div>Замовлення №{id}. Ціна: {totalPrice}, статус: {status}, ім'я отримувача: {name}, адреса доставки: {address}</div>
}

export default OrderStatus;