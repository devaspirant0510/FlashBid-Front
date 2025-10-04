import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { FeedWrapper } from '@pages/feed/component/FeedList.tsx';
import { ApiResult } from '@entities/common';

export const useQueryHotFeed = () => {
    return useQuery({
        queryKey: ['api', 'v1', 'feed', 'hot'],
        queryFn: httpFetcher<ApiResult<FeedWrapper[]>>,
    });
};
