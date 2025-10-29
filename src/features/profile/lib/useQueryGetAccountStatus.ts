import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { ApiError, ApiResult } from '@entities/common';
import { UserStats } from '@entities/user/model';

export const useQueryGetAccountStatus = (id: number) => {
    return useQuery<ApiResult<UserStats>, ApiError>({
        queryKey: ['api', 'v1', 'profile', 'status', Number(id)],
        queryFn: httpFetcher,
    });
};
