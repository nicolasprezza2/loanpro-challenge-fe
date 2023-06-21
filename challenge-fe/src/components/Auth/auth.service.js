import axios from "axios"
import { BACKEND_URL } from "../../Constants"

export const login = (username, password, onSuccess, onError) => {

    return axios.post(BACKEND_URL + "/login", {
        username, 
        password
    })
    .then(  response => {
        console.log({response})
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        onSuccess();
    })
    .catch(error => {
        onError(error);
        console.log("Error doing login:", error);
    })
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.clear();
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export const isLogged = () => {
    const user = getCurrentUser();
    console.log("is logged: ", (user && user.accessToken))
    return (user && user.accessToken);
}
