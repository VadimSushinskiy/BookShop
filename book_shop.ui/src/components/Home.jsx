import {useState} from "react";
import Books from "./Books/Books";
import Filter from "./Books/Filter";

const Home = () => {
    const [filter, setFilter] = useState({name: "", minPrice: 0, maxPrice: 10000, genre: "", language: "", authorName: ""});

    const onSubmitHandler = (prop) => {
        setFilter({...prop});
    }

    return (
        <>
            <Filter onSubmit={onSubmitHandler}/>
            <Books {...filter}/>
        </>
    )
}

export default Home;