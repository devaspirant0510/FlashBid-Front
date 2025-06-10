import React from "react";
import {MainLayout} from "@shared/layout";
import AuctionChatHeader from "@/features/auction/ui/AuctionChatHeader.tsx";
import {useParams} from "react-router";
import AuctionChatMenu from "@/features/auction/ui/AuctionChatMenu.tsx";
import AuctionChatBody from "@/features/auction/ui/AuctionChatBody.tsx";
import AuctionChatInput from "@/features/auction/ui/AuctionChatInput.tsx";
import StompClient from "@/features/auction/ui/StompClient.tsx";

type Params = {
    id: number
}
const AuctionChatPage = () => {
    const {id} = useParams<Params>();
    if (!id) {
        return <>404 잘못된 접근입니다.</>
    }
    return (
        <MainLayout>
            <div>
                <AuctionChatHeader auctionId={id}/>
                <StompClient/>
                <div className={"flex"}>
                    <AuctionChatMenu/>
                    <div className={"flex-1"}>
                        <AuctionChatBody auctionId={id}/>
                        <AuctionChatInput/>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AuctionChatPage;
