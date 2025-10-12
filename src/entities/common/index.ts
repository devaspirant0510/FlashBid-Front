export type ApiHeader = {
    code: number;
    status: string;
};

export type ApiError = {
    errorCode: string;
    errorMessage: string;
};

export type ApiResult<T> = {
    apiHeader: ApiHeader;
    path: string;
    method: string;
    timestamp: string;
    data: T | null;
    error: ApiError | null;
    message: string;
};

export type Sort = {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
};

export type Pageable = {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: Sort;
};

export type Page<T> = {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    number: number; // 현재 페이지 (0부터 시작)
    size: number; // 페이지 크기
    numberOfElements: number; // 현재 페이지에 포함된 요소 수
    sort: Sort;
    empty: boolean;
};
export function ApiResultBuilder<T>(data: T): ApiResult<T> {
    return {
        apiHeader: {
            code: 200,
            status: 'OK',
        },
        data: data,
        error: null,
        message: 'ok',
        method: 'GET',
        path: '/',
        timestamp: Date.now().toString(),
    };
}
