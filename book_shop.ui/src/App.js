import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import GetUser from "./tools/GetUser";
import UserContext from "./context/UserContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import SingleBook from "./components/Books/SingleBook"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register";
import Cart from "./components/Cart/Cart";
import OrderStatuses from "./components/OrderStatus/OrderStatuses";
import AdminPanel from "./components/Admin/AdminPanel";
import AddBook from "./components/Admin/Book/AddBook";
import ChangeBook from "./components/Admin/Book/ChangeBook";
import DeleteBook from "./components/Admin/Book/DeleteBook";
import './App.css';
import AddAuthor from "./components/Admin/Author/AddAuthor";
import AddPublishing from "./components/Admin/Publishing/AddPublishing";
import ChangeAuthor from "./components/Admin/Author/ChangeAuthor";
import ChangePublishing from "./components/Admin/Publishing/ChangePublishing";
import Users from "./components/Admin/User/Users";


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
                          <Route path="admin" element={<AdminPanel/>}/>
                          <Route path="admin/book/add" element={<AddBook/>}/>
                          <Route path="admin/book/change" element={<ChangeBook/>}/>
                          <Route path="admin/book/delete" element={<DeleteBook/>}/>
                          <Route path="admin/author/add" element={<AddAuthor/>}/>
                          <Route path="admin/author/change" element={<ChangeAuthor/>}/>
                          <Route path="admin/publishing/add" element={<AddPublishing/>}/>
                          <Route path="admin/publishing/change" element={<ChangePublishing/>}/>
                          <Route path="admin/users" element={<Users/>}/>
                      </Route>
                  </Routes>
              </div>
          </BrowserRouter>
      </UserContext.Provider>
    )
}

export default App;
