import React, { FC } from 'react';
import { useQueryMyPoint } from '@/features/profile/lib/useQueryMyPoint.ts';
import { PointHistory } from '@entities/payment/model';

type Props = {
    children: (data: PointHistory[]) => React.ReactNode;
};
const FetchMyPointHistory: FC<Props> = ({ children }) => {
    const { isLoading, isError, error, data } = useQueryMyPoint();
    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>{error}</>;
    }
    return <>{children(data?.data?.content || [])}</>;
};

export default FetchMyPointHistory;
