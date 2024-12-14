import {useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

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
            const response = await axios.post("https://localhost:7259/api/user/register", {
                name,
                email,
                password
            });
            if (response.status === 201) {
                navigator("../login", {relative: "path"})
            }
            else {
                setError("Помилка! Користувач з такою поштою вже існує")
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
                           placeholder="Name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
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
                    <input type="password"
                           placeholder="Repeat your password"
                           value={secondPassword}
                           onChange={(e) => setSecondPassword(e.target.value)}/>
                </div>
                <div>
                    <button type="Submit" disabled={disabled}>Зареєструватись!</button>
                </div>
            </form>
        </div>
    )
}

export default Register;