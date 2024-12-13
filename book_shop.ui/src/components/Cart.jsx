import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";
import Order from "./Order";

const Cart = () => {
    const [orders, setOrders] = useState([]);
    const [price, setPrice] = useState(0);
    const [hidden, setHidden] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const {user} = useContext(UserContext);
    let url;

    const navigator = useNavigate();

    if (user !== null) {
        const cartId = user.cartId;
        url = `https://localhost:7259/api/cart/${cartId}`;
    }
    else {
        const cartId = Cookies.get("anonCartId");
        url = `https://localhost:7259/api/cart/anon/${cartId}`;
    }

    useEffect(() => {
        (async function () {
            const response = await axios.get(url, {
                withCredentials: true
            });
            setPrice(response.data.totalPrice);
            setOrders(response.data.orders);
        })();
    }, []);

    const changeCount = async (change, id, count, orderPrice) => {
        const response = await axios.put(`https://localhost:7259/api/order/${id}`, {}, {
            params: {
                change
            }
        });

        if (response.status === 204) {
            if (count > 1 || change > 0) {
                setOrders(orders.map(order => {
                    if (order.id !== id) {
                        return order;
                    }
                    else {
                        return {...order, count: order.count + change}
                    }
                }))
            }
            else {
                setOrders(orders.filter(order => order.id !== id));
            }
            setPrice(price + orderPrice * change);
        }
    }

    const deleteOrder = async (id, count, orderPrice) => {
        const response = await axios.delete(`https://localhost:7259/api/order/${id}`);

        if (response.status === 204) {
            setOrders(orders.filter(order => order.id !== id));
            setPrice(price - count * orderPrice);
        }
    }

    const changeHidden = () => {
        setHidden(true);
    }
    if (orders.length === 0) {
        return <div>Кошик порожній!</div>
    }

    const PlaceOrder = async () => {
        if (name === "") {
            setError("Введіть ім'я отримувача!");
        }
        else if (address === "") {
            setError("Введіть адресу доставки!");
        }
        else {
            const cartId = user !== null ? user.cartId : Cookies.get("anonCartId");
            const response = await axios.post(`https://localhost:7259/api/orderstatus/${cartId}`, {
                    totalPrice: price,
                    status: "прийнятно",
                    createdDate: new Date(),
                    name,
                    address
                }, {
                withCredentials: true
            });
            if (response.status === 201) {
                if (user !== null) {
                    navigator("../statuses", {relative: "path"});
                }
                else {
                    navigator("..", {relative: "path"});
                }
            }
        }
    }

    return (
        <>
            {hidden && <div>
                <h2>Оформити замовлення</h2>
                {error !== "" && <div>{error}</div>}
                <div>
                    <input type="text"
                           placeholder="Ім'я отримувача"
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <input type="text"
                           placeholder="Адреса отримувача"
                           value={address}
                           onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <button onClick={PlaceOrder}>Оформити</button>
            </div>}
            {orders.map(order => {
                return <Order key={order.id} {...order} changeHandler={changeCount} deleteHandler={deleteOrder}/>
            })}
            <div>Total price: {price}</div>
            {price > 0 && <button hidden={hidden} onClick={changeHidden}>Оформити замовлення</button>}
        </>

    );

}

export default Cart;