import React, { FC } from 'react';
import { useParams } from 'react-router';
import { AuctionInfo, RecommendsGoods } from '@/features/auction/ui';
import { MainLayout } from '@shared/layout';

type Params = {
    id: number;
};
const BlindAuctionInfoPage = () => {
    const { id } = useParams<Params>();
    if (!id) {
        return <>error</>;
    }
    return (
        <MainLayout>
            <AuctionInfo id={id} type={'blind'} />
            <RecommendsGoods id={id} />
        </MainLayout>
    );
};

export default BlindAuctionInfoPage;
