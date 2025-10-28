import React, { FC } from 'react';
import { UserStats } from '@entities/user/model';
import { useQueryGetAccountStatus } from '@/features/profile/lib/useQueryGetAccountStatus.ts';
import { DefaultLoading, ErrorBox } from '@shared/ui';

type Props = {
    accountId: number;
    children: (data: UserStats) => React.ReactNode;
};
const FetchAccountStatus: FC<Props> = ({ accountId, children }) => {
    const { isLoading, data, isError, error } = useQueryGetAccountStatus(accountId);
    if (isLoading) {
        return <DefaultLoading />;
    }
    if (isError) {
        return <ErrorBox error={error} />;
    }
    if (!data || !data?.data) {
        return <>no data</>;
    }
    return <>{children(data?.data!)}</>;
};

export default FetchAccountStatus;
