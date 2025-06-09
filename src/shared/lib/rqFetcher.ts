import {QueryFunctionContext} from "@tanstack/react-query";
import {axiosClient} from "@shared/lib/axiosClient.ts";

export const httpFetcher = async <T>(queryContext: QueryFunctionContext): Promise<T> => {
    try{
        const keys = queryContext.queryKey.join("/")
        const result = await axiosClient.get<T>(`${keys}`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0ODkyNjg2NSwiZXhwIjoxNzQ5NDQ1MjY1LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoiMTIzNCIsInJvbGUiOiIxMjM0In0.-4ByinfExuPsxIXWMCsTRD698HGoQkjvK_U5FuTHfOg`,
            },
        })
        return result.data as T;
    }catch(err){
        console.log(err)
    }
}