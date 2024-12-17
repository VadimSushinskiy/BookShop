import {useState} from "react";
import config from "../../../config.json";
import "./Gallery.css";

const Gallery = ({images}) => {
    const [mainImgSrc, setMainImgSrc] = useState(config.IMAGE_SERVICE_URL + images[0]);

    const clickHandler = (e) => {
        setMainImgSrc(e.target.src);
        console.log(e.target.src)
    }

    return <div className="gallery">
        <div className="gallery-main">
            <img src={mainImgSrc} alt="book" width="300px"/>
        </div>
        <div className="gallery-images">
            {images.map(image => <img key={image} src={config.IMAGE_SERVICE_URL + image} alt="book" onClick={(e) => clickHandler(e)}/>)}
        </div>
    </div>
}

export default Gallery;