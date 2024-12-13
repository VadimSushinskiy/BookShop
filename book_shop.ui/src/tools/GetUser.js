import Cookies from "js-cookie";

function GetUser() {
    const userInfo = Cookies.get("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
}

export default GetUser;