import React, {FC, useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import Stomp, {Client} from 'stompjs';
import * as  StompJs from "@stomp/stompjs";
import {IFrame} from "@stomp/stompjs";
import {useQueryClient} from "@tanstack/react-query";

type Props = {
    children: (client: Client, auctionId: number) => React.ReactNode,
    auctionId: number
}
const StompClient: FC<Props> = ({auctionId, children}) => {
    const queryClient = useQueryClient();
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const stompClient = useRef(null);
    const clientRef = useRef<any>(null);
    const [client, setClient] = useState<any>(null)
    console.log("au" + auctionId)

    useEffect(() => {
        console.log("u")
        const clientdata = new StompJs.Client({
            webSocketFactory: () => new WebSocket("ws://172.27.226.250:8080/ws"),
            onStompError: (i) => {
                console.log(i)
            },
            onWebSocketError: (e) => {
                console.log(e)
            },
            connectHeaders: {
                // Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0OTQ4MTM5OSwiZXhwIjoxNzgxMDE3Mzk5LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoic2V1bmdobzAyMDUxMEBnbWFpbC5jb20iLCJyb2xlIjoidG9wIGdhcCJ9.hQVu0R5rxhOiJYHsdLqvkZ5bQMvOZifwKruQkvNa08Y"
                Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTcyNzExMTkxODA1MjE1NzExNDgiLCJpYXQiOjE3NDk0ODE1MzAsImV4cCI6MTc4MTAxNzUzMCwiaWQiOiIxIiwidWlkIjoiMTE3MjcxMTE5MTgwNTIxNTcxMTQ4IiwiZW1haWwiOiJzZXVuZ2hvMDIwNTEwQGdtYWlsLmNvbSIsInJvbGUiOiJ0b3AgZ2FwIn0.hQoRfttnHV7oGOiLgbr90VQskLhywE4wd4_gfEOVGHY"
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: function (frame: IFrame) {
                console.log(frame)
                clientdata.subscribe("/topic/public/" + auctionId, (data) => {
                    queryClient.setQueryData(["api", "v1", "auction", "chat", auctionId], (prev) => {
                        console.log(JSON.parse(data.body))
                        return {
                            ...prev,
                            data: [...prev.data, JSON.parse(data.body)]
                        }

                    })
                    console.log(data.body)
                });
                setClient(1)

                clientRef.current = clientdata;
            }
        });
        clientdata.activate()
        console.log(client)
        clientRef.current = clientdata;
        console.log(clientRef.current)
        return () => {
            clientdata.deactivate().then(r => {
                console.log("소켓 연결 해제")
                console.log(r)
            });

        }
    }, [auctionId]);

    console.log("client app rerender" + clientRef.current)
    return (
        <>

            {children(clientRef.current, auctionId)}
        </>
    );
};

export default StompClient;
