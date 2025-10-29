import React, { FC } from 'react';
import { ApiError } from '@entities/common';
import { Alert, AlertTitle, AlertDescription } from '@shared/components/ui/alert.tsx';
import { TriangleAlert } from 'lucide-react';

type Props = {
    error?: ApiError | null;
    className?: string;
};

const ErrorBox: FC<Props> = ({ error, className = '' }) => {
    return (
        <Alert
            variant='destructive'
            role='alert'
            className={`m-1 w-full max-w-xl mx-auto bg-red-100 text-red-800 opacity-70 ${className}`}
        >
            <TriangleAlert className='h-5 w-5 text-red-600' />
            <AlertTitle>{error?.title ?? '오류 발생'}</AlertTitle>
            <AlertDescription>
                {error?.detail ?? '예기치 못한 오류가 발생했습니다.'}
            </AlertDescription>
        </Alert>
    );
};

export default ErrorBox;
