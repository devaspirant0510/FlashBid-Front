import axios from "axios";
import {useAuthStore} from "@shared/store/AuthStore.ts";

export const axiosClient = axios.create({
    baseURL: "http://172.27.226.250:8080/",

    withCredentials: true, // 리프레시 토큰은 쿠키로 전송
});

// axiosClient.interceptors.request.use(
//     (config) => {
//         let token = useAuthStore.getState().getAccessToken();
//         // todo : 임시용 토큰 세팅
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }else{
//             // token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0OTQ4MTM5OSwiZXhwIjoxNzgxMDE3Mzk5LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoic2V1bmdobzAyMDUxMEBnbWFpbC5jb20iLCJyb2xlIjoidG9wIGdhcCJ9.hQVu0R5rxhOiJYHsdLqvkZ5bQMvOZifwKruQkvNa08Y";
//             token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTcyNzExMTkxODA1MjE1NzExNDgiLCJpYXQiOjE3NDk0ODE1MzAsImV4cCI6MTc4MTAxNzUzMCwiaWQiOiIxIiwidWlkIjoiMTE3MjcxMTE5MTgwNTIxNTcxMTQ4IiwiZW1haWwiOiJzZXVuZ2hvMDIwNTEwQGdtYWlsLmNvbSIsInJvbGUiOiJ0b3AgZ2FwIn0.hQoRfttnHV7oGOiLgbr90VQskLhywE4wd4_gfEOVGHY";
//             config.headers.Authorization = "Bearer "+token;
//             useAuthStore.getState().setAccessToken(token);
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );