import { MainLayout } from '@shared/layout';
import { AuctionInfo, RecommendsGoods } from '@/features/auction/ui';
import React from 'react';
import { useParams } from 'react-router';
import { useIncreaseAuctionView } from '@/features/auction/hooks';

type Params = {
    id: number;
};
const LiveAuctionInfoPage = () => {
    const { id } = useParams<Params>();
    if (!id) {
        return <>존재하지 않는 페이지입니다.</>;
    }
    useIncreaseAuctionView(id);
    return (
        <MainLayout>
            <AuctionInfo id={id} type={'live'} />
            <RecommendsGoods id={id} />
        </MainLayout>
    );
};
export default LiveAuctionInfoPage;
