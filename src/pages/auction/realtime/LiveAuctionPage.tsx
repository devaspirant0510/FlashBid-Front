import React from "react";
import {MainLayout} from "@shared/layout";
import CategoryLists from "@/features/auction/ui/CategoryLists.tsx";
import {AuctionList} from "@/features/auction/ui";

const LiveAuctionPage = () => {
    return (
        <MainLayout>
            <CategoryLists type={'live'}/>
            <AuctionList type={'live'}/>
        </MainLayout>
    )
}
export default LiveAuctionPage;