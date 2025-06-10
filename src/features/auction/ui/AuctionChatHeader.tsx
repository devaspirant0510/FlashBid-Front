import React, {FC} from "react";
import {Auction} from "@entities/auction/model";
import BackButton from "@shared/ui/BackButton.tsx";
import {useQueryGetAuctionById} from "@/features/auction/lib";


type Props = {
    auctionId: number
}
const AuctionChatHeader: FC<Props> = ({auctionId}) => {
    const {isLoading,data,isError,error} = useQueryGetAuctionById(auctionId);
    if(isLoading){
        return <>loading</>
    }
    if(isError){
        return <>{error}</>
    }
    if(!data || !data.data){
        return <>no data</>
    }
    return (
        <div className={"flex"}>
            <BackButton/>
            <div>
                <div>{"[피규어]"}</div>
                <div>{data.data.auction.goods.title}</div>
            </div>
            <div className={"flex"}>
                <div>
                    <span>현재가</span>
                    {data.data.auction.startPrice}
                </div>
                <div>최근 입찰 10분전</div>
            </div>

        </div>
    );
};

export default AuctionChatHeader;
