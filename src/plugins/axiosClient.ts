import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true
});

// apiClient.interceptors.request.use(config => {
//     const cookies = Cookies.get()
//     for (let c in cookies) {
//         config.headers.set('Cookie', `${c}=${cookies[c]}`)
//     }
//     return config;
// })

export default apiClient;