import React from 'react';
import { BaseLayout, MainLayout } from '@shared/layout';
import { AuctionList, CategoryList } from '@/features/auction/ui';

const BlindAuctionPage = () => {
    return (
        <div>
            <MainLayout className={'h-0'} headerClassName={'bg-udark'}>
                {}
            </MainLayout>
            <CategoryList type={'blind'} />
            <BaseLayout className={'bg-[#F0F1F5]'}>
                <AuctionList type={'blind'} />
            </BaseLayout>
        </div>
    );
};
export default BlindAuctionPage;
