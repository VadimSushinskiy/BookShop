import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import GetUser from "../../tools/GetUser";
import config from "../../../config.json";
import "./Login.css"
import {toast} from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    const {setUser} = useContext(UserContext);

    const navigator = useNavigate();

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setDisabled(true);

        if (email === "" || password === "") {
            toast.error("Введіть усі дані", {autoClose: 2000});
        }
        else if (!email.match(/.+@.+\.+/)) {
            toast.error("Введіть пошту у правильному форматі", {autoClose: 2000});
        }
        else {
            try {
                const res = await axios.post(`${config.SERVER_URL}/user/login`, {
                    email,
                    password
                }, {withCredentials: true});

                if (res.status === 200) {
                    setUser(GetUser());
                    navigator("..", {relative: "path"});
                }
            }
            catch {
                toast.error("Неправильна пошта або пароль", {autoClose: 2000});
            }
        }
        setDisabled(false);
    }

    return (
        <div>

            <form action="" onSubmit={(e) => SubmitHandler(e)}>
                <div className="center-box">
                    <div className="box-container login-container">
                        <div className="input-row">
                            <div className="login-input-label">Email</div>
                            <input type="text"
                                   placeholder="Email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-row">
                            <div className="login-input-label">Пароль</div>
                            <input type="password"
                                   placeholder="Пароль"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="Submit" disabled={disabled} className="button login-button">Увійти</button>
                        <div>Немає акаунту? <Link to="../register" className="register-link">Зареєструватися</Link></div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;