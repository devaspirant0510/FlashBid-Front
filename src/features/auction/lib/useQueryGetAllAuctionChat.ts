import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@shared/lib";
import {ApiResult} from "@entities/common";
import {ChatEntity} from "@entities/auction/model";

export const useQueryGetAllAuctionChat = (id:number) => {
    return useQuery({
        queryKey:["api","v1","auction","chat",Number(id)],
        queryFn:httpFetcher<ApiResult<ChatEntity[]>>
    })
}