import {useEffect, useState} from "react";
import axios from "axios";
import OrderStatus from "./OrderStatus";
import config from "../../../config.json"

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
            <h2>Ваші замовлення:</h2>
            {orders.map(order => {
                return <OrderStatus key={order.id} {...order}/>
            })}
        </>
    )
}

export default OrderStatuses;