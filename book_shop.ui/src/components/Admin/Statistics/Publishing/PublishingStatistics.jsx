const PublishingStatistics = ({id, name, totalBooks, totalCountSold, totalSold}) => {

    return <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{totalBooks}</td>
        <td>{totalCountSold}</td>
        <td>{totalSold} грн</td>
    </tr>
}

export default PublishingStatistics;