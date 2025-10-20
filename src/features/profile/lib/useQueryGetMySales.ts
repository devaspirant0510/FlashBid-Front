import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { ApiResult } from '@entities/common';
import { ConfirmedBidsEntity } from '@entities/auction/model';

export const useQueryGetMySales = () => {
    return useQuery({
        queryKey: ['api', 'v1', 'profile', 'sales'],
        queryFn: httpFetcher<ApiResult<ConfirmedBidsEntity[]>>,
    });
};
