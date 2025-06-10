import React, {FC} from "react";
import {ChatEntity} from "@entities/auction/model";
import {ProfileImage} from "@shared/ui";

type Props = {
    key:number
    data:ChatEntity
}
const AuctionChatItem:FC<Props> = ({data,key}) => {
    return (
        <div key={key} className={"flex"}>
            <ProfileImage src={data.user.profileUrl} size={48}/>
            <div>{data.contents}</div>
        </div>
    );
};

export default AuctionChatItem;
