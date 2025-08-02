import {useQuery} from '@tanstack/react-query';
import {httpFetcher} from "@shared/lib";
import {BidLog} from "@entities/auction/model";
import {ApiResult} from "@entities/common";

export const useQueryGetAuctionHistoryChart = (auctionId: number) => {
    return useQuery({
        queryKey: ['api', 'v1', 'auction', 'bid-history', 'chart', auctionId],
        queryFn: httpFetcher<ApiResult<BidLog[]>>,
    });
};
