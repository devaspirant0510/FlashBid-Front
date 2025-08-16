import React, {FC} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@shared/components/ui/dialog.tsx";
import FetchAuctionParticipants from "@/features/auction/ui/FetchAuctionParticipants.tsx";
import ParticipantsUserItem from "@widgets/auction/ParticipantsUserItem.tsx";

type  Props = {
    children: React.ReactNode,
    auctionId: number
}
const AuctionParticipantsDialog: FC<Props> = ({children, auctionId}) => {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    참가자 목록
                </DialogHeader>
                <FetchAuctionParticipants auctionId={auctionId} page={0}>
                    {
                        (data) => (

                            <div>
                                {data.content.length === 0 ?
                                    <div className={'text-uprimary text-2xl font-bold '}>
                                        참가자가 아직 없어요 ㅠㅠ
                                    </div> :
                                    <>
                                        {data.content.map(v => {
                                            return <ParticipantsUserItem data={v}/>
                                        })}
                                    </>

                                }

                            </div>
                        )
                    }
                </FetchAuctionParticipants>
            </DialogContent>
        </Dialog>
    );
};

export default AuctionParticipantsDialog;
