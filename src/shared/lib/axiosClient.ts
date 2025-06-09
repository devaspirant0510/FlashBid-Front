import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "http://172.27.226.250:8080",
    withCredentials: true, // 리프레시 토큰은 쿠키로 전송
});

