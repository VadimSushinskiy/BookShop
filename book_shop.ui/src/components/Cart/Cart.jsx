import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import UserContext from "../../context/UserContext";
import Order from "./Order";
import config from "../../../config.json"
import "./Cart.css"
import {toast} from "react-toastify";

const Cart = () => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();
    let url;
    const delivery = {
        NovaPostaCourier: 120,
        NovaPosta: 60,
        UkrPostaCourier: 80,
        UkrPosta: 40
    }

    const [orders, setOrders] = useState([]);
    const [price, setPrice] = useState(0);
    const [data, setData] = useState({
        name: user?.name ?? "",
        address:"",
        phoneNumber: "",
        email: "",
        deliveryType: ""
    });



    if (user !== null) {
        const cartId = user.cartId;
        url = `${config.SERVER_URL}/cart/${cartId}`;
    }
    else {
        const cartId = Cookies.get("anonCartId");
        url = `${config.SERVER_URL}/cart/anon/${cartId}`;
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
        const response = await axios.put(`${config.SERVER_URL}/order/${id}`, {}, {
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
                }));
            }
            else {
                setOrders(orders.filter(order => order.id !== id));
                toast.success("Книгу видалено з кошика");
            }
            setPrice(price + orderPrice * change);
        }
    }

    const deleteOrder = async (id, count, orderPrice) => {
        const response = await axios.delete(`https://localhost:7259/api/order/${id}`);

        if (response.status === 204) {
            setOrders(orders.filter(order => order.id !== id));
            setPrice(price - count * orderPrice);
            toast.success("Книгу видалено з кошика");
        }
    }

    const PlaceOrder = async () => {
        if (data.name === "") {
            toast.error("Введіть ім'я отримувача", {autoClose: 2000});
        }
        else if (data.address === "") {
            toast.error("Введіть адресу доставки", {autoClose: 2000});
        }
        else if (!data.phoneNumber.match(/^((\+?38)[\- ]?)?(\(?\d{3}\)?[\- ]?)[\d\- ]{7,10}$/)) {
            toast.error("Введіть коректний номер телефону", {autoClose: 2000});
        }
        else if (!data.email.match(/.+@.+\.+/)) {
            toast.error("Введіть коректну пошту", {autoClose: 2000});
        }
        else if (data.deliveryType === "") {
            toast.error("Оберіть тип доставки", {autoClose: 2000});
        }
        else {
            const cartId = user !== null ? user.cartId : Cookies.get("anonCartId");
            const response = await axios.post(`https://localhost:7259/api/orderstatus/${cartId}`, {
                    status: "прийнятно",
                    createdDate: new Date(),
                    name: data.name,
                    address: data.address,
                    phone: data.phoneNumber,
                    email: data.email,
                    deliveryType: data.deliveryType
                }, {
                withCredentials: true
            });
            if (response.status === 201) {
                toast.success("Замовлення оформлено!")
                if (user !== null) {
                    navigator("../statuses", {relative: "path"});
                }
                else {
                    navigator("..", {relative: "path"});
                }
            }
        }
    }

    const changeRadio = (e) => {
        const radio = e.currentTarget.children[0];
        radio.checked = true;
        setData({...data, deliveryType: radio.value})
    }

    const changeData = (e, name) => {
        setData({...data, [name]: e.target.value});
    }


    if (orders.length === 0) {
        return <div className="nothing-message">Кошик порожній!</div>
    }

    return (
        <>
            <h4>Оформити замовлення</h4>
            <div className="cart-container">
                <div className="cart-form box-container">
                    <div className="form-title">Інформація про користувача</div>
                    <div className="form-row">
                        <div>
                            <div className="input-label">ПІБ отримувача</div>
                            <div>
                                <input type="text"
                                       placeholder="ПІБ отримувача"
                                       value={data.name}
                                       onChange={(e) => changeData(e, "name")}/>
                            </div>
                        </div>
                        <div>
                            <div className="input-label">Адреса отримувача</div>
                            <div>
                                <input type="text"
                                       placeholder="Адреса отримувача"
                                       value={data.address}
                                       onChange={(e) => changeData(e, "address")}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <div className="input-label">Номер телефону</div>
                            <div>
                                <input type="text"
                                       placeholder="Номер телефону"
                                       value={data.phoneNumber}
                                       onChange={(e) => changeData(e, "phoneNumber")}/>
                            </div>
                        </div>
                        <div>
                            <div className="input-label">Електрона пошта</div>
                            <div>
                                <input type="text"
                                       placeholder="Пошта"
                                       value={data.email}
                                       onChange={(e) => changeData(e, "email")}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-title">Доставка</div>
                    <div>
                        <div className="radio-row" onClick={(e) => changeRadio(e)}>
                            <input type="radio" name="delivery" value="NovaPosta"/>
                            <div className="delivery-body">
                                <div className="delivery-row">
                                    <div>Відділення Нова Пошта</div>
                                    <div className="delivery-price">60 грн</div>
                                </div>
                                <div>1-3 дні</div>
                            </div>
                        </div>
                        <div className="radio-row" onClick={(e) => changeRadio(e)}>
                            <input type="radio" name="delivery" value="UkrPosta"/>
                            <div className="delivery-body">
                                <div className="delivery-row">
                                    <div>Відділення Укрпошта</div>
                                    <div className="delivery-price">40 грн</div>
                                </div>
                                <div>2-5 дні</div>
                            </div>
                        </div>
                        <div className="radio-row" onClick={(e) => changeRadio(e)}>
                            <input type="radio" name="delivery" value="NovaPostaCourier"/>
                            <div className="delivery-body">
                                <div className="delivery-row">
                                    <div>Кур'єр Нова Пошта</div>
                                    <div className="delivery-price">120 грн</div>
                                </div>
                                <div>1-3 дні</div>
                            </div>
                        </div>
                        <div className="radio-row" onClick={(e) => changeRadio(e)}>
                            <input type="radio" name="delivery" value="UkrPostaCourier"/>
                            <div className="delivery-body">
                                <div className="delivery-row">
                                    <div>Кур'єр Укрпошта</div>
                                    <div className="delivery-price">80 грн</div>
                                </div>
                                <div>2-5 дні</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-cart">
                    <div className="cart-info box-container">
                        <div className="cart-count">{orders.reduce((acc, item) => acc += item.count, 0)} товари у кошику</div>
                        {orders.map(order => {
                            return <Order key={order.id} {...order} changeHandler={changeCount}
                                          deleteHandler={deleteOrder}/>
                        })}
                        <div className="cart-price">Разом: {price} грн</div>
                    </div>
                    <div className="cart-summary box-container">
                        <div className="summary-row summary-ordinary">
                            <div>До сплати</div>
                            <div>{price + (data.deliveryType !== "" ? delivery[data.deliveryType] : 0)} грн</div>
                        </div>
                        <div className="summary-row summary-secondary">
                            <div>{orders.reduce((acc, item) => acc += item.count, 0)} товарів</div>
                            <div>{price} грн</div>
                        </div>
                        <div className="summary-row summary-secondary">
                            <div>Доставка</div>
                            <div>{data.deliveryType !== "" ? delivery[data.deliveryType] : 0} грн</div>
                        </div>
                        <button onClick={PlaceOrder} className="button order-button">Оформити замовлення</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;