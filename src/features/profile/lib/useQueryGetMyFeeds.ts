import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { ApiResult } from '@entities/common';
import { FeedWrapper } from '@pages/feed/component/FeedList.tsx'; // Re-using this type as it seems to match FeedDto

export const useQueryGetMyFeeds = () => {
    return useQuery({
        queryKey: ['api', 'v1', 'profile', 'my', 'feed'],
        queryFn: httpFetcher<ApiResult<FeedWrapper[]>>,
    });
};
