import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';

export const useQueryConfirmedBid = (auctionId: number) => {
    return useQuery({
        queryKey: ['api', 'v1', 'auction', 'confirmed', auctionId],
        queryFn: httpFetcher,
    });
};
