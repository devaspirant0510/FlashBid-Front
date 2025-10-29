import { ApiError } from '@entities/common';

export class ApiException extends Error {
    type: string | null;
    title: string;
    status: number;
    detail: string;
    instance: string;
    errorCode: string;

    constructor(errorData: ApiError) {
        super(errorData.title + ': ' + errorData.detail);
        this.type = errorData.type;
        this.title = errorData.title;
        this.status = errorData.status;
        this.detail = errorData.detail;
        this.instance = errorData.instance;
        this.errorCode = errorData.errorCode;
    }
}
