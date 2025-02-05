const HandleChangeInAdmin = (event, name, data, setData) => {
    if (name === "imgFiles") {
        setData({...data, [name]: event.target.files});
    }
    else if (name === "mainImage") {
        setData({...data, [name]: event.target.files[0]});
    }
    else {
        setData({...data, [name]: event.target.value});
    }
}

export default HandleChangeInAdmin;