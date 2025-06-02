import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@shared/lib";
import {AuctionData} from "@entities/auction/model";
import {ApiResult} from "@entities/common";

export const useQueryGetAuctionById = (id:number)=>{
    return useQuery({
        queryKey:['api','auction','live',id],
        queryFn:httpFetcher<ApiResult<AuctionData>>
    })
}