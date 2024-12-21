import {useContext} from "react";
import "./Review.css"
import UserContext from "../../../../context/UserContext";

const Review = ({id, text, userName, rating, writingDate, deleteHandler, editHandler, userId}) => {
    const {user} = useContext(UserContext);

    return <div className="review-container">
        <div className="review-header">
            <div>
                <div>{userName}</div>
                <div>{writingDate}</div>
            </div>
            <div className="review-actions">

                <div className="stars-rating">
                    <div className="stars stars-single-book">
                        <span></span>
                        <div className="inner" style={{width: `${+rating / 5 * 100}%`}}></div>
                    </div>
                    {(user?.role === "Admin" || user?.role === "Owner" || user?.id === userId) &&
                        <div className="cross" onClick={() => deleteHandler(id, rating)}>×</div>}
                </div>
                {user?.id === userId && <a className="update-review" href="#add-review"
                                           onClick={() => editHandler(id, text, rating)}>Редагувати</a>}
            </div>
        </div>
        <div>{text}</div>
    </div>
}

export default Review;