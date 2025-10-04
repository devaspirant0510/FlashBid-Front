import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { ApiResult } from '@entities/common';
import { Category } from '@entities/auction/model';

export const useQueryGetCategories = () => {
    return useQuery({
        queryKey: ['api', 'v1', 'category'],
        queryFn: httpFetcher<ApiResult<Category[]>>,
    });
};
