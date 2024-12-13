import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState} from "react";
import GetUser from "./tools/GetUser";
import UserContext from "./context/UserContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import SingleBook from "./components/SingleBook"
import Login from "./components/Login"
import Register from "./components/Register";
import Cart from "./components/Cart";
import './App.css';
import Cookies from "js-cookie";
import axios from "axios";
import OrderStatuses from "./components/OrderStatuses";


function App() {
    const [user, setUser] = useState(GetUser());

    if (Cookies.get("anonCartId") === undefined) {
        axios.post("https://localhost:7259/api/cart/anon")
            .then(response => {
            if (response.status === 200) {
                Cookies.set("anonCartId", response.data.id)
            }
        });
    }

    return (
      <UserContext.Provider value={{user, setUser}}>
          <BrowserRouter>
              <div className="App">
                  <Routes>
                      <Route path="/" element={<MainLayout/>}>
                          <Route index element={<Home/>}/>
                          <Route path=":id" element={<SingleBook/>}/>
                          <Route path="login" element={<Login/>}/>
                          <Route path="register" element={<Register/>}/>
                          <Route path="cart" element={<Cart/>}/>
                          <Route path="statuses" element={<OrderStatuses/>}/>
                      </Route>
                  </Routes>
              </div>
          </BrowserRouter>
      </UserContext.Provider>
    )
}

export default App;
