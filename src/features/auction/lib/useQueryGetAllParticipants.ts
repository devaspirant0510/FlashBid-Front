import { useQuery } from '@tanstack/react-query';
import { httpFetcher, pageSegmentBuilder } from '@shared/lib';
import { ApiResult, Page } from '@entities/common';
import { AuctionParticipateUser } from '@entities/auction/model';

export const useQueryGetAllParticipants = (auctionId: number, page: number) => {
    return useQuery({
        queryKey: [
            'api',
            'v1',
            'auction',
            'auction',
            auctionId,
            pageSegmentBuilder('participant-user', page),
        ],
        queryFn: httpFetcher<ApiResult<Page<AuctionParticipateUser>>>,
    });
};
