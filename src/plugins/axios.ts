import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json",
    },
});

apiClient.interceptors.request.use(config => {
    const token = Cookies.get('csrftoken');
    config.headers.set("X-CSRFToken", token)
    return config;
})

export default apiClient;