import {QueryFunctionContext} from "@tanstack/react-query";
import {axiosClient} from "@shared/lib/axiosClient.ts";
import {AxiosError} from "axios";

export const httpFetcher = async <T>(queryContext: QueryFunctionContext): Promise<T> => {
    try {
        const keys = queryContext.queryKey.join("/")
        const result = await axiosClient.get<T>(`${keys}`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0OTQ4MTM5OSwiZXhwIjoxNzgxMDE3Mzk5LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoic2V1bmdobzAyMDUxMEBnbWFpbC5jb20iLCJyb2xlIjoidG9wIGdhcCJ9.hQVu0R5rxhOiJYHsdLqvkZ5bQMvOZifwKruQkvNa08Y`,
            },
        })

        console.log(keys)
        console.log("http fetcher" + result)
        return result.data as T;
    } catch (err: AxiosError) {
        throw new Error(err.response.data.message)
    }

}