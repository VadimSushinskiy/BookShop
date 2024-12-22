import "./OrderStatus.css";

const OrderStatus = ({id, totalPrice, status, name, address, phone, email, deliveryType, createdDate}) => {
    return <div className="box-container order-container">
        <div className="order-status-row">
            <div className="status-id">Замовлення №{id}</div>
            <div className="status-status">{status.charAt(0).toUpperCase() + status.slice(1)}</div>
        </div>

        <div className="order-status-row">
            <div>
                <div className="status-title">Отримувач замовлення</div>
                <div><span>Ім'я:</span> {name}</div>
                <div><span>Номер телефона:</span> {phone}</div>
                <div><span>Пошта:</span> {email}</div>
                <div><span>Адреса:</span> {address}</div>
            </div>
            <div>
                <div className="status-title">Деталі замовлення</div>
                <div>
                    <span>Створено:</span> {`${createdDate.slice(8, 10)}.${createdDate.slice(5, 7)}.${createdDate.slice(0, 4)}`}
                </div>
                <div><span>Тип доставки:</span> {deliveryType}</div>
                <div><span>Ціна:</span> {totalPrice} грн</div>
            </div>
        </div>


    </div>
}

export default OrderStatus;