import React, {FC} from "react";
import {ChatEntity} from "@entities/auction/model";
import {ProfileImage} from "@shared/ui";
import {useAuthUser} from "@shared/hooks/useAuthUser.tsx";

type Props = {
    key:number
    data:ChatEntity,
    isMe:boolean
}
const AuctionChatItem:FC<Props> = ({data,key,isMe}) => {
    if(isMe) {
        return <div key={key} className={"flex items-end gap-2"}>
            <div>
                <div className={'text-sm text-end mr-3 mb-1'}>나</div>
                <div className={'bg-[#FFE2D6] p-4 text-sm rounded-xl'}>
                    <div className="mb-1">
                        {data.contents}
                    </div>
                    <div className={"text-[#FA9870] text-[8px] text-end"}>
                        {new Date(data.createdAt).toUTCString()}
                    </div>

                </div>

            </div>
            <ProfileImage src={data.user.profileUrl} size={40}/>
        </div>
    }
    return (

        <div key={key} className={"flex items-end gap-2"}>
            <ProfileImage src={data.user.profileUrl} size={40}/>
            <div>
                <div className={'text-sm'}>{data.user.nickname}</div>
                <div className={'bg-[#F1F1F1] p-4 text-sm rounded-xl'}>
                    <div className="mb-1">
                        {data.contents}
                    </div>
                    <div className={"text-[#b2b2b2] text-[8px]"}>
                        {new Date(data.createdAt).toUTCString()}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AuctionChatItem;
