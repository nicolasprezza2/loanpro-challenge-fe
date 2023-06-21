import axios from "axios";

export const configAxios = () => {
    axios.interceptors.request.use(function(config) {
        const user =  localStorage.getItem("user");
        const token = user ? JSON.parse(user).accessToken : "";
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        config.headers["Authorization"] = 'Bearer ' + token;
        config.headers["Content-Type"] = 'application/json';
        return config;
    }); 
}
