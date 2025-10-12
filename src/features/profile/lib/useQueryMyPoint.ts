import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { ApiResult, Page } from '@entities/common';
import { ChatEntity } from '@entities/auction/model';
import { PointHistory } from '@entities/payment/model';

export const useQueryMyPoint = () => {
    return useQuery({
        queryKey: ['api', 'v1', 'profile', 'my', 'point-history'],
        queryFn: httpFetcher<ApiResult<Page<PointHistory>>>,
    });
};
