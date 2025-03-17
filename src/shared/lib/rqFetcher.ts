import {QueryFunctionContext} from "@tanstack/react-query";
import {axiosClient} from "@shared/lib/axiosClient.ts";

export const httpFetcher = async <T>(queryContext: QueryFunctionContext): Promise<T> => {
    try{
        const keys = queryContext.queryKey.join("/")
        const result = await axiosClient.get<T>(`${keys}`)
        return result.data as T;
    }catch(err){
        console.log(err)
    }
}