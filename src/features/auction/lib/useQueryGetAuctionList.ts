import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@shared/lib";
import {ApiResult} from "@entities/common";
import {AuctionData} from "@entities/auction/model";

export const useQueryGetAuctionList = () => {
    return useQuery({
        queryKey:["api","v1","auction","test","all"],
        queryFn:httpFetcher<ApiResult<AuctionData[]>>
    })
}