import "./Review.css"

const Review = ({text, userName, rating, writingDate}) => {
    return <div className="review-container">
        <div className="review-header">
            <div>
                <div>{userName}</div>
                <div>{writingDate}</div>
            </div>
            <div className="stars-rating">
                <div className="stars stars-single-book">
                    <span></span>
                    <div className="inner" style={{width: `${+rating / 5 * 100}%`}}></div>
                </div>
            </div>
        </div>
        <div>{text}</div>
    </div>
}

export default Review;