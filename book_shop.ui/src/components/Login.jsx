import {useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const navigator = useNavigate();

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setDisabled(true);

        if (email === "" || password === "") {
            setError("Помилка! Введіть усі дані!");
        }
        else if (!email.match(/.+@.+\.+/)) {
            setError("Помилка! Введіть пошту у правильному форматі!")
        }
        else {
            const res = await axios.post("https://localhost:7259/api/user/login", {
                email,
                password
            }, {withCredentials: true});

            if (res.status === 200) {
                navigator("..", {relative: "path"});
            }
            else {
                setError("Помилка! Неправильна пошта або пароль!");
            }
        }
        setDisabled(false);
    }

    return (
        <div>
            {error.length > 0 && <div className="error">{error}</div>}
            <form action="" onSubmit={(e) => SubmitHandler(e)}>
                <div>
                    <input type="text"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button type="Submit" disabled={disabled}>Увійти</button>
                </div>
            </form>
        </div>
    )
}

export default Login;