import {MainLayout} from "@shared/layout";
import {AuctionInfo, RecommendsGoods} from "@/features/auction/ui";
import {useParams} from "react-router";

type Params ={
    id:number
}
const LiveAuctionInfoPage = ()=>{
    const { id } = useParams<Params>();
    if(!id){
        return  (
            <>
                존재하지 않는 페이지입니다.
            </>
        )
    }

    return (
        <MainLayout>
            <AuctionInfo id={id}/>
            <RecommendsGoods id={id}/>
        </MainLayout>
    )
}
export default LiveAuctionInfoPage;