import React, {FC} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@shared/components/ui/dialog.tsx";
import FetchAuctionParticipants from "@/features/auction/ui/FetchAuctionParticipants.tsx";
type  Props = {
    children: React.ReactNode,
    auctionId:number
}
const AuctionParticipantsDialog:FC<Props> = ({children,auctionId}) => {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>

                </DialogHeader>
                <FetchAuctionParticipants auctionId={auctionId} page={0}>
                    {
                        (data)=>(
                            <div>
                                {data.content.map(v=>{
                                    return <div>{v.nickname}</div>
                                })}

                            </div>
                        )
                    }
                </FetchAuctionParticipants>
            </DialogContent>
        </Dialog>
    );
};

export default AuctionParticipantsDialog;
