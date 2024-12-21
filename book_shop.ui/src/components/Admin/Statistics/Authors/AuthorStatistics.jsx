const AuthorStatistics = ({id, fullname, totalBooks, totalCountSold, totalSold}) => {

    return <tr>
        <td>{id}</td>
        <td>{fullname}</td>
        <td>{totalBooks}</td>
        <td>{totalCountSold}</td>
        <td>{totalSold} грн</td>
    </tr>
}

export default AuthorStatistics;