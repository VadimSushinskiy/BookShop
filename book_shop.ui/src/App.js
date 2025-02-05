import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState} from "react";
import {ToastContainer} from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import GetUser from "./tools/GetUser";
import UserContext from "./context/UserContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Main/Home";
import SingleBook from "./components/Books/SingleBook/SingleBook"
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
import UsersStatistics from "./components/Admin/Statistics/Users/UsersStatistics";
import DeleteAuthor from "./components/Admin/Author/DeleteAuthor";
import DeletePublishing from "./components/Admin/Publishing/DeletePublishing";
import AddCountBook from "./components/Admin/Book/AddCountBook";
import BooksStatistics from "./components/Admin/Statistics/Books/BooksStatistics";
import AuthorsStatistics from "./components/Admin/Statistics/Authors/AuthorsStatistics";
import PublishingsStatistics from "./components/Admin/Statistics/Publishing/PublishingsStatistics";
import AdminLayout from "./layouts/AdminLayout";


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
                  <title>КнигаUA</title>
                  <Routes>
                      <Route path="/" element={<MainLayout/>}>
                          <Route index element={<Home/>}/>
                          <Route path=":id" element={<SingleBook/>}/>
                          <Route path="login" element={<Login/>}/>
                          <Route path="register" element={<Register/>}/>
                          <Route path="cart" element={<Cart/>}/>
                          <Route path="statuses" element={<OrderStatuses/>}/>
                          <Route path="admin" element={<AdminLayout roleList={["Admin", "Owner"]}/>}>
                              <Route index element={<AdminPanel/>}/>
                              <Route path="book/add" element={<AddBook/>}/>
                              <Route path="book/add-count" element={<AddCountBook/>}/>
                              <Route path="book/change" element={<ChangeBook/>}/>
                              <Route path="book/delete" element={<DeleteBook/>}/>
                              <Route path="author/add" element={<AddAuthor/>}/>
                              <Route path="author/change" element={<ChangeAuthor/>}/>
                              <Route path="author/delete" element={<DeleteAuthor/>}/>
                              <Route path="publishing/add" element={<AddPublishing/>}/>
                              <Route path="publishing/change" element={<ChangePublishing/>}/>
                              <Route path="publishing/delete" element={<DeletePublishing/>}/>
                          </Route>
                          <Route path="admin" element={<AdminLayout roleList={["Owner"]}/>}>
                              <Route path="stat/users" element={<UsersStatistics/>}/>
                              <Route path="stat/books" element={<BooksStatistics/>}/>
                              <Route path="stat/authors" element={<AuthorsStatistics/>}/>
                              <Route path="stat/publishings" element={<PublishingsStatistics/>}/>
                          </Route>
                      </Route>
                  </Routes>
                  <ToastContainer position="top-right" autoClose="1000" closeOnClick="true"/>
              </div>
          </BrowserRouter>

      </UserContext.Provider>
    )
}

export default App;
