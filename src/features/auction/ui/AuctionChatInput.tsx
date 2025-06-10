import React, {FC, useCallback} from "react";
import {Input} from "@shared/components/ui/input.tsx";
import StompClient from "@/features/auction/ui/StompClient.tsx";
import {Client} from "stompjs";
import useInput from "@shared/hooks/useInput.ts";
import {Button} from "@shared/components/ui/button.tsx";
import {Account} from "@entities/user/model";

type Props = {
    client: Client,
    auctionId: number,
    account:Account
}
const AuctionChatInput: FC<Props> = ({client, auctionId,account}) => {
    const [message, onChangeMessage] = useInput({initialValue: ""});
    const onClickSubmit = useCallback(() => {
        console.log(data)
        const data = {
            contents: message,
            nickname:account.nickname,
            profileUrl:account.profileUrl,
            userId:account.id
        }
        if(client){
            console.log(client)
            client.publish({destination:"/app/chat/send/" + auctionId, body:JSON.stringify(data)})
        }
    }, [message,client]);
    return (
        <div>
            <div>채팅</div>
            <div className={"flex"}>
                <Input value={message} onChange={onChangeMessage} placeholder={"채팅을 입력해주세요"}/>
                <Button onClick={onClickSubmit}>
                    전송
                </Button>
            </div>
        </div>
    );
};

export default AuctionChatInput;
