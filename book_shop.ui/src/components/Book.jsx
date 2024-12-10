const Book = ({id, name, price, authorName}) => {
    return (
        <div>{name} by {authorName} for {price}</div>
    )
}

export default Book;