import React, {FC} from "react";
import {Auction} from "@entities/auction/model";
import BackButton from "@shared/ui/BackButton.tsx";
import {useQueryGetAuctionById} from "@/features/auction/lib";


type Props = {
    auctionId: number
}
const AuctionChatHeader: FC<Props> = ({auctionId}) => {
    const {isLoading, data, isError, error} = useQueryGetAuctionById(auctionId);
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>{error}</>
    }
    if (!data || !data.data) {
        return <>no data</>
    }
    return (
        <div className={"flex gap-3 mb-6"}>
            <BackButton/>

            <div className={"flex flex-col w-full  "}>
                <div>
                    <div className={'text-[#5A5A5A] text-sm'}>{"[피규어]"}</div>
                    <div className={'text-xl'}>{data.data.auction.goods.title}</div>
                </div>
                <div className={"flex justify-between "}>
                    <div className={'flex items-end'}>
                        <span className={'text-[#E9AB91] mr-2'}>현재가</span>
                        <span
                            className={'text-[#E47547] text-2xl font-bold'}>{data.data.currentPrice ? data.data.currentPrice.toLocaleString() : data.data.auction.startPrice}p</span>
                    </div>
                    <div className={'text-[#C9A9A9] text-sm'}>최근 입찰 10분전</div>
                </div>
            </div>

        </div>
    );
};

export default AuctionChatHeader;
