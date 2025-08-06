import React, {FC} from "react";
import {useQueryGetAuctionHistoryChart} from "@/features/auction/lib/useQueryGetAuctionHistoryChart.ts";
import {BidLog} from "@entities/auction/model";

type Props = {
    auctionId: number,
    children: (data: BidLog[]) => React.ReactNode,
}
const FetchAuctionBidHistoryChart: FC<Props> = ({auctionId, children}) => {
    const {isLoading, isError, error, data} = useQueryGetAuctionHistoryChart(auctionId!)
    if(isLoading){
        return <>loading</>
    }
    if(isError){
        return <>{error}</>
    }
    if(!data || !data?.data){
        return <>nodata</>
    }
    return (
        <>
            {children(data?.data!)}
        </>
    );
};

export default FetchAuctionBidHistoryChart;
