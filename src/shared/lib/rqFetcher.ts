import {QueryFunctionContext} from "@tanstack/react-query";
import {axiosClient} from "@shared/lib/axiosClient.ts";
import {AxiosError} from "axios";
import Cookies from "js-cookie";

export const httpFetcher = async <T>(queryContext: QueryFunctionContext): Promise<T> => {
    const token = Cookies.get("access_token");

    try {
        const keys = queryContext.queryKey.join("/")
        const result = await axiosClient.get<T>(`${keys}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials:true
        })

        console.log(keys)
        console.log("http fetcher" + result)
        return result.data as T;
    } catch (err: AxiosError) {
        throw new Error(err.response.data.message)
    }

}