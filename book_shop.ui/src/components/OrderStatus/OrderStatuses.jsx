import {useEffect, useState} from "react";
import axios from "axios";
import OrderStatus from "./OrderStatus";

const OrderStatuses = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async function () {
            const response = await axios.get(`https://localhost:7259/api/orderstatus`, {
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