const BookStatistics = ({id, name, authorName, publishingName, count, price, soldNum, totalSold}) => {

    return <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{authorName}</td>
        <td>{publishingName}</td>
        <td>{count}</td>
        <td>{price} грн</td>
        <td>{soldNum}</td>
        <td>{totalSold} грн</td>
    </tr>
}

export default BookStatistics;