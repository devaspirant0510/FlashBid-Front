import { QueryFunctionContext } from '@tanstack/react-query';
import { axiosClient } from '@shared/lib/axiosClient.ts';
import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const httpFetcher = async <T>(queryContext: QueryFunctionContext): Promise<T> => {
    try {
        const keys = queryContext.queryKey.join('/');
        const result = await axiosClient.get<T>(`${keys}`);
        return result.data as T;
    } catch (err: AxiosError) {
        console.log('http fetcher error');
        console.log(err);
        throw new Error('errir');
    }
};

export function pageSegmentBuilder(segment: string, page: number, size: number = 10) {
    return `${segment}?size=${size}&page=${page}`;
}
