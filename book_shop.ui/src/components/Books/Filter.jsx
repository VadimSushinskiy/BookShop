import {useState} from "react";
import "./Filter.css"

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
        <div className="filter">
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                onSubmit(data);
            }}>
                <div className="form-container">
                    <div>Назва:</div>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => handleChange(e, "name")}/>
                    <div>Автор:</div>
                    <input type="text"
                           value={data.authorName}
                           onChange={(e) => handleChange(e, "authorName")}/>
                    <div>Жанр:</div>
                    <input type="text"
                           value={data.genre}
                           onChange={(e) => handleChange(e, "genre")}/>
                    <div>Ціна</div>
                    <div>
                        <input type="number"
                               className="input-price"
                               value={data.minPrice}
                               onChange={(e) => handleChange(e, "minPrice")}/>
                        <span> - </span>
                        <input type="number"
                               className="input-price"
                               value={data.maxPrice}
                               onChange={(e) => handleChange(e, "maxPrice")}/>
                    </div>
                    <div>Мінімальний рейтинг:</div>
                    <input type="number"
                           value={data.rating}
                           onChange={(e) => handleChange(e, "rating")}/>
                    <div>Мова:</div>
                    <input type="text"
                           value={data.language}
                           onChange={(e) => handleChange(e, "language")}/>
                    <button className="button search" type="Submit">Пошук</button>
                    <button className="button reset" type="Submit" onClick={handleReset}>Скинути</button>

                </div>

            </form>
        </div>
    )
}

export default Filter;