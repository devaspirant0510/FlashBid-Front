import React from 'react';
import { useQueryGetMyProfile } from '@/features/user/lib';
import { MyInfo } from '@entities/user/model';

const FetchMyProfile: React.FC<{ children: (user: MyInfo) => React.ReactNode }> = ({
    children,
}) => {
    const { isLoading, isError, data, error } = useQueryGetMyProfile();
    if (isLoading) return <>loading</>;
    if (isError) return <>{error as string}</>;
    if (!data || !data.data) return <>no data</>;
    return <>{children(data.data)}</>;
};

export default FetchMyProfile;
