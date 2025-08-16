import React, {FC, useEffect, useRef} from "react";
import {useQueryGetAllAuctionChat} from "@/features/auction/lib"
import AuctionChatItem from "@widgets/auction/AuctionChatItem.tsx";
import {useAuthUser} from "@shared/hooks/useAuthUser.tsx";

type Props = {
    auctionId: number
}
const AuctionChatBody: FC<Props> = ({auctionId}) => {
    const {isLoading, data, isError, error} = useQueryGetAllAuctionChat(auctionId);
    const scrollRef = useRef(null);

    const [nickname, id] = useAuthUser()
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }

    }, [data])
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>error</>
    }
    if (!data || !data.data) {
        return <>nodata</>
    }
    return (
        <div className={"px-8  pb-4 rounded-xl shadow-sm border-1"}>

            <div ref={scrollRef}
                 className={"flex h-[48vh]  flex-col overflow-y-scroll  scrollbar-thin  "}>
                {data.data.map((v, index) => {
                    // 내가 쓴 챗일때
                    if (v.user.id === id) {
                        return (
                            <div className={'my-1 flex flex-end justify-end'} key={index}>
                                <AuctionChatItem  data={v} isMe={true}/>
                            </div>
                        );
                    } else {
                        return (
                            <div className={'my-1 flex'} key={index}>
                                <AuctionChatItem  data={v} isMe={false}/>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
};

export default AuctionChatBody;
