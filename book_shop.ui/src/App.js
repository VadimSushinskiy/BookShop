import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import SingleBook from "./components/SingleBook"
import Login from "./components/Login"
import Register from "./components/Register";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path=":id" element={<SingleBook/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App;
