export type ApiHeader = {
    code: number,
    status: string,
}

export type ApiError = {
    errorCode: string,
    errorMessage: string
}

export type ApiResult<T> = {
    apiHeader: ApiHeader;
    path: string;
    method: string;
    timestamp: string;
    data: T | null;
    error: ApiError | null;
    message: string;
}
