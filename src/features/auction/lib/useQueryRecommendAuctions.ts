import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { ApiResult } from '@entities/common';
import { AuctionData } from '@entities/auction/model';

export const useQueryRecommendAuctions = (id: number) => {
    return useQuery({
        queryKey: ['api', 'v1', 'auction', 'recommend', Number(id)],
        queryFn: httpFetcher<ApiResult<AuctionData[]>>,
    });
};
