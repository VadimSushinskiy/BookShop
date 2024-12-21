import axios from "axios";
import config from "../../../../../config.json"

const UserStatistics = ({id, name, email, role, total, orderCount}) => {

    const ChangeRoleHandler = async (e) => {
        const response = axios.put(`${config.SERVER_URL}/user/${id}`, {}, {
            params: {
                role: e.target.value
            },
            withCredentials: true
        })
    }

    return <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role !== "Owner" &&
                <div className="select-container select-user">
                    <select className="select-beautiful" defaultValue={role} onChange={(e) => ChangeRoleHandler(e)}>
                        <option>User</option>
                        <option>Admin</option>
                    </select>
                </div>}
            {role === "Owner" && " Owner"}</td>
        <td>{orderCount}</td>
        <td>{total} грн</td>
    </tr>
}

export default UserStatistics;