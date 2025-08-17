import {MainLayout} from "@shared/layout";
import {AuctionList, CategoryList} from "@/features/auction/ui";

const BlindAuctionPage = ()=>{
    return (
        <MainLayout>
            <CategoryList type={'blind'}/>
            <AuctionList type={'blind'}/>
        </MainLayout>

    )
}
export default BlindAuctionPage