import axios from "axios";
import {useAuthStore} from "@shared/store/AuthStore.ts";

export const axiosClient = axios.create({
    baseURL: "http://172.27.226.250:8080/",
    withCredentials: true, // 리프레시 토큰은 쿠키로 전송
});

axiosClient.interceptors.request.use(
    (config) => {
        let token = useAuthStore.getState().getAccessToken();
        // todo : 임시용 토큰 세팅
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }else{
            token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0ODkyNjg2NSwiZXhwIjoxNzQ5NDQ1MjY1LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoiMTIzNCIsInJvbGUiOiIxMjM0In0.-4ByinfExuPsxIXWMCsTRD698HGoQkjvK_U5FuTHfOg";
            config.headers.Authorization = "Bearer "+token;
            useAuthStore.getState().setAccessToken(token);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);