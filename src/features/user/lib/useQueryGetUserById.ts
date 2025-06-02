import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@shared/lib";
import {Account} from "@entities/user/model";
import {ApiResult} from "@entities/common";

export const useQueryGetUserById = (id:number)=>{
    return useQuery({
        queryKey:['api','user',id],
        queryFn:httpFetcher<ApiResult<Account>>
    });
}