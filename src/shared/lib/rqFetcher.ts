import {QueryFunctionContext} from "@tanstack/react-query";
import {axiosClient} from "@shared/lib/axiosClient.ts";
import {AxiosError} from "axios";

export const httpFetcher = async <T>(queryContext: QueryFunctionContext): Promise<T> => {
    try{
        const keys = queryContext.queryKey.join("/")
        const result = await axiosClient.get<T>(`${keys}`)
        console.log(keys)
        console.log("http fetcher"+result)
        return result.data as T;
    }catch (err:AxiosError){
        throw new Error(err.response.data.message)
    }

}