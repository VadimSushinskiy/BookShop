import {useEffect, useState} from "react";
import axios from "axios";
import OrderStatus from "./OrderStatus";
import config from "../../../config.json";
import "./OrderStatuses.css";

const OrderStatuses = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async function () {
            const response = await axios.get(`${config.SERVER_URL}/orderstatus`, {
                withCredentials: true
            });

            if (response.status === 200) {
                setOrders(response.data)
            }
        })();
    }, []);

    return (
        <>
            <h4>Ваші замовлення:</h4>
            {orders.length === 0 && <h4 className="nothing-message">Замовлень поки немає</h4>}
            <div className="order-status-container">
                {orders.map(order => {
                    return <OrderStatus key={order.id} {...order}/>
                })}
            </div>

        </>
    )
}

export default OrderStatuses;