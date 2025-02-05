import {Outlet, useNavigate} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../context/UserContext";

const AdminLayout = ({roleList}) => {
    const {user} = useContext(UserContext);
    const navigator = useNavigate();

    if (!roleList.includes(user?.role)) {
        navigator("/");
    }

    return <Outlet/>
}

export default AdminLayout;