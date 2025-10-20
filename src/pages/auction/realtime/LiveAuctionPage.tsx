import React from 'react';
import { BaseLayout, MainLayout } from '@shared/layout';
import CategoryLists from '@/features/auction/ui/CategoryLists.tsx';
import { AuctionList } from '@/features/auction/ui';

const LiveAuctionPage = () => {
    return (
        <div>
            <MainLayout className={'h-0'}>{}</MainLayout>
            <CategoryLists type={'live'} />
            <BaseLayout className={'bg-[#f0f1f5]'}>
                <AuctionList type={'live'} />
            </BaseLayout>
        </div>
    );
};
export default LiveAuctionPage;
