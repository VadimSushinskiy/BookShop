import {useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import config from "../../../config.json";
import "./Login.css"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const navigator = useNavigate();

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setDisabled(true);

        if (name === "" || email === "" || password === "" || secondPassword === "") {
            setError("Помилка! Введіть усі дані!");
        }
        else if (!email.match(/.+@.+\.+/)) {
            setError("Помилка! Введіть пошту у правильному форматі!")
        }
        else if (password !== secondPassword) {
            setError("Помилка! Паролі не співпадають!")
        }
        else {

            try {
                const response = await axios.post(`${config.SERVER_URL}/user/register`, {
                    name,
                    email,
                    password
                });
                if (response.status === 201) {
                    navigator("../login", {relative: "path"})
                }
            }
            catch {
                setError("Помилка! Користувач з такою поштою вже існує")
            }
        }
        setDisabled(false);
    }

    return (
        <div>

            <form action="" onSubmit={(e) => SubmitHandler(e)}>
                <div className="center-box">
                    <div className="box-container login-container">
                        {error.length > 0 && <div className="error">{error}</div>}
                        <div className="input-row">
                            <div className="login-input-label">Ім'я</div>
                            <input type="text"
                                   placeholder="Ваше ім'я"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
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
                        <div className="input-row">
                            <div className="login-input-label">Повторіть пароль</div>
                            <input type="password"
                                   placeholder="Повторіть пароль"
                                   value={secondPassword}
                                   onChange={(e) => setSecondPassword(e.target.value)}/>
                        </div>
                        <button type="Submit" disabled={disabled} className="button login-button">Зареєструватись!
                        </button>
                        <div>Вже маєте акаунт? <Link to="../register" className="register-link">Увійдіть у нього!</Link></div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;