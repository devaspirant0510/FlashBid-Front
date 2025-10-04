import React, { FC } from 'react';
import { Page } from '@entities/common';
import { AuctionParticipateUser } from '@entities/auction/model';
import { useQueryGetAllParticipants } from '@/features/auction/lib';

type Props = {
    children: (user: Page<AuctionParticipateUser>) => React.ReactNode;
    auctionId: number;
    page: number;
};
const FetchAuctionParticipants: FC<Props> = ({ children, auctionId, page }) => {
    const { isLoading, data, error, isError } = useQueryGetAllParticipants(auctionId, page);
    if (isLoading) {
        return <>loading</>;
    }
    if (!data || !data.data) {
        return <>nodata</>;
    }
    if (isError) {
        return <>{error}</>;
    }
    return <>{children(data?.data!)}</>;
};

export default FetchAuctionParticipants;
