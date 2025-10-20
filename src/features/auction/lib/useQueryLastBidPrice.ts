import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { ApiResult } from '@entities/common';
import { AccountDto } from '@entities/user/model';

export const useQueryLastBidPrice = (id: number) => {
    return useQuery({
        queryKey: ['api', 'v1', 'payment', 'last-bid', id],
        queryFn: httpFetcher<ApiResult<number>>,
    });
};
