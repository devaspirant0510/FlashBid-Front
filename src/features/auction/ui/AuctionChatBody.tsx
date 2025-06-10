import React, {FC, useEffect, useRef} from "react";
import {useQueryGetAllAuctionChat} from "@/features/auction/lib"
import AuctionChatItem from "@widgets/auction/AuctionChatItem.tsx";
type Props = {
    auctionId:number
}
const AuctionChatBody:FC<Props> = ({auctionId}) => {
    const {isLoading,data,isError,error} = useQueryGetAllAuctionChat(auctionId);
    const scrollRef = useRef(null);
    useEffect(()=>{
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }

    },[data])
    if(isLoading){
        return <>loading</>
    }
    if(isError){
        return <>error</>
    }
    if(!data || !data.data){
        return <>nodata</>
    }
    return (
        <div ref={scrollRef} className={"flex rounded-xl flex-col overflow-y-scroll h-128"} >
            {data.data.map((v,index) => {
                return <div><AuctionChatItem key={index} data={v}/></div>
            })}
        </div>
    );
};

export default AuctionChatBody;
