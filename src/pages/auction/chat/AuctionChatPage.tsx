import React from "react";
import {MainLayout} from "@shared/layout";
import AuctionChatHeader from "@/features/auction/ui/AuctionChatHeader.tsx";
import {useParams} from "react-router";
import AuctionChatMenu from "@/features/auction/ui/AuctionChatMenu.tsx";
import AuctionChatBody from "@/features/auction/ui/AuctionChatBody.tsx";
import AuctionChatInput from "@/features/auction/ui/AuctionChatInput.tsx";
import StompClient from "@/features/auction/ui/StompClient.tsx";
import UserProfile from "@/features/user/ui/UserProfile.tsx";
import {useAuthUser} from "@shared/hooks/useAuthUser.tsx";
import AuctionStatus from "@/features/auction/ui/AuctionStatus.tsx";

type Params = {
    id:number
}
const AuctionChatPage = () => {
    const {id} = useParams<Params>();
    const [nickname,userId] = useAuthUser();
    if (!id) {
        return <>404 잘못된 접근입니다.</>
    }
    return (
        <MainLayout>
            <div>
                <AuctionChatHeader auctionId={id}/>
                <div className={"flex gap-4"}>
                    <AuctionChatMenu/>
                    <div className={"flex-1"}>
                        <StompClient auctionId={id}>
                            {(client,auctionId) => {
                                return (
                                    <div className={"flex flex-col "}>
                                        <AuctionStatus auctionId={auctionId}/>
                                        <AuctionChatBody auctionId={auctionId}/>
                                        <UserProfile userId={userId as number}>
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
