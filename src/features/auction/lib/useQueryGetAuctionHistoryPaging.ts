import {useQuery} from '@tanstack/react-query';
import {httpFetcher, pageSegmentBuilder} from "@shared/lib";
import {BidLog} from "@entities/auction/model";
import {ApiResult, Page} from "@entities/common";

export const useQueryGetAuctionHistoryPage = (auctionId: number, page: number = 0) => {
    return useQuery({
        queryKey: ['api', 'v1', 'auction', 'bid-history', auctionId,pageSegmentBuilder('page', page,5)],
        queryFn: httpFetcher<ApiResult<Page<BidLog>>>,
    });
};
