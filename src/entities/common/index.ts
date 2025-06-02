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

export function ApiResultBuilder<T>(data:T):ApiResult<T>{
    return {
        apiHeader: {
            code: 200,
            status:"OK"
        },
        data:data,
        error:null,
        message:"ok",
        method:"GET",
        path:"/",
        timestamp: Date.now().toString(),

    }


}