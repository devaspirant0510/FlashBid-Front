import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "/",
    withCredentials: true, // 리프레시 토큰은 쿠키로 전송
});

