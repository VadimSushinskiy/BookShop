import {useState} from "react";

const Filter = ({onSubmit}) => {
    const defaultData = {name: "", minPrice: 0, maxPrice: 10000, genre: "", language: "", authorName: "", rating: ""};
    const [data, setData] = useState(defaultData);

    const handleChange = (event, name) => {
        if (name !== "rating") {
            setData({...data, [name]: event.target.value});
        }
        else {
            const val = event.target.value;
            if ("12345".includes(val) && val.length < 2) {
                setData({...data, [name]: event.target.value});
            }
        }
    }

    const handleReset = () => {
        setData(defaultData);
    }

    return (
        <div>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                onSubmit(data);
            }}>
                <p>Назва:</p>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => handleChange(e, "name")}/>
                <p>Автор:</p>
                <input type="text"
                       value={data.authorName}
                       onChange={(e) => handleChange(e, "authorName")}/>
                <p>Жанр:</p>
                <input type="text"
                       value={data.genre}
                       onChange={(e) => handleChange(e, "genre")}/>
                <p>Ціна</p>
                <input type="number"
                       value={data.minPrice}
                       onChange={(e) => handleChange(e, "minPrice")}/>
                <span> - </span>
                <input type="number"
                       value={data.maxPrice}
                       onChange={(e) => handleChange(e, "maxPrice")}/>
                <p>Мінімальний рейтинг:</p>
                <input type="number"
                       value={data.rating}
                       onChange={(e) => handleChange(e, "rating")}/>
                <p>Мова:</p>
                <input type="text"
                       value={data.language}
                       onChange={(e) => handleChange(e, "language")}/>
                <div>
                    <button type="Submit" onClick={handleReset}>Скинути</button>
                    <button type="Submit">Пошук</button>
                </div>
            </form>
        </div>
    )
}

export default Filter;