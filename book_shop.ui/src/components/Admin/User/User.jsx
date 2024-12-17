import axios from "axios";
import config from "../../../../config.json"

const User = ({id, name, email, role, total, orderCount}) => {

    const ChangeRoleHandler = async (e) => {
        console.log(e.target.value)
        const response = axios.put(`${config.SERVER_URL}/user/${id}`, {}, {
            params: {
                role: e.target.value
            },
            withCredentials: true
        })
    }

    return <div>{id}: {name} - {email} -
        {role !== "Owner" &&
            <select defaultValue={role} onChange={(e) => ChangeRoleHandler(e)}>
                <option>User</option>
                <option>Admin</option>
            </select>}
        {role === "Owner" && " Owner"}
        . Всього замовлень: {orderCount}, витрачено грошей: {total}</div>
}

export default User;