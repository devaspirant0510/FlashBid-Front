import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@shared/lib";
import {ApiResult} from "@entities/common";

export const useQueryGetCategories = () => {
    return useQuery({
        queryKey:["api","category"],
        queryFn:httpFetcher<ApiResult<string[]>>
    })
}