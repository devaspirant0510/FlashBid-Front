import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@/shared/lib/rqFetcher.ts';
import { ApiResult } from '@/entities/common';
import { FollowUser } from '@/entities/user/model';

export const useQueryGetFollowings = (userId: number) => {
    return useQuery({
        queryKey: ['api', 'v1', 'profile', userId, 'followings'],
        queryFn: httpFetcher<ApiResult<FollowUser[]>>,
        enabled: !!userId,
    });
};
