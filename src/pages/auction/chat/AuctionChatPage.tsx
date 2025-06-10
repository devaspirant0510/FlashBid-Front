import React from "react";
import {MainLayout} from "@shared/layout";
import AuctionChatHeader from "@/features/auction/ui/AuctionChatHeader.tsx";
import {useParams} from "react-router";
import AuctionChatMenu from "@/features/auction/ui/AuctionChatMenu.tsx";
import AuctionChatBody from "@/features/auction/ui/AuctionChatBody.tsx";
import AuctionChatInput from "@/features/auction/ui/AuctionChatInput.tsx";
import StompClient from "@/features/auction/ui/StompClient.tsx";
import UserProfile from "@/features/user/ui/UserProfile.tsx";

type Params = {
    id:number
}
const AuctionChatPage = () => {
    const {id} = useParams<Params>();
    console.log(id)
    if (!id) {
        return <>404 잘못된 접근입니다.</>
    }
    return (
        <MainLayout>
            <div>
                <AuctionChatHeader auctionId={id}/>
                <div className={"flex"}>
                    <AuctionChatMenu/>
                    <div className={"flex-1"}>
                        <StompClient auctionId={id}>
                            {(client,auctionId) => {
                                const userid = [1,2,3,5][Math.ceil(Math.random()*3)]
                                console.log("userid" +userid)
                                return (
                                    <div className={"flex flex-col"}>
                                        <AuctionChatBody auctionId={auctionId}/>
                                        <UserProfile userId={userid}>
                                            {
                                                (user )=>{
                                                   return  (
                                                    <AuctionChatInput client={client} auctionId={auctionId} account={user.user}/>
                                                )}
                                            }

                                        </UserProfile>
                                    </div>
                                )

                            }}
                        </StompClient>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AuctionChatPage;
