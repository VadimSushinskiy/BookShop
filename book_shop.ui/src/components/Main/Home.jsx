import {useState} from "react";
import Books from "../Books/MainPageBooks/Books";
import Filter from "../Books/MainPageBooks/Filter";
import "./Home.css"

const Home = () => {
    const [filter, setFilter] = useState({name: "", minPrice: 0, maxPrice: 10000, genre: "", language: "", authorName: "", rating: ""});

    const onSubmitHandler = (prop) => {
        setFilter({...prop});
    }

    return (
        <div className="book-filter-container">
            <Filter onSubmit={onSubmitHandler}/>
            <Books {...filter}/>
        </div>
    )
}

export default Home;