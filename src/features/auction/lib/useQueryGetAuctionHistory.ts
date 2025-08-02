import {useQuery} from '@tanstack/react-query';
import {httpFetcher} from "@shared/lib";
import {BidLog} from "@entities/auction/model";
import {ApiResult} from "@entities/common";

export const useQueryGetAuctionHistory = (auctionId: number,page:number=0) => {
    return useQuery({
        queryKey: ['api', 'v1', 'auction', 'bid-history', auctionId+"?size=8&page="+page],
        queryFn: httpFetcher<ApiResult<BidLog[]>>,
    });
};
