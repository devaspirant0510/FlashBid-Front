import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import * as  StompJs from "@stomp/stompjs";
import {IFrame} from "@stomp/stompjs";
const StompClient = () => {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const stompClient = useRef(null);
    const auctionId = 1;

    useEffect(() => {
        console.log("u")
        const clientdata = new StompJs.Client({
            webSocketFactory:()=>new WebSocket("ws://localhost:8080/ws"),
            onStompError:(i)=>{
                console.log(i)
            },
            onWebSocketError:(e)=>{
                console.log(e)

            },
            connectHeaders:{
                Authorization :"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0OTQ4MTM5OSwiZXhwIjoxNzgxMDE3Mzk5LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoic2V1bmdobzAyMDUxMEBnbWFpbC5jb20iLCJyb2xlIjoidG9wIGdhcCJ9.hQVu0R5rxhOiJYHsdLqvkZ5bQMvOZifwKruQkvNa08Y"
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        console.log(clientdata)
        clientdata.onConnect = function (frame:IFrame) {
            console.log(frame)
            clientdata.subscribe("/topic/public/1", (data)=>{
                console.log(data.body)
                setMessages((prev)=>[...prev,data.body])

            });
        };
        clientdata.activate()
    }, []);

    const sendMessage = () => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.send(`/app/chat/send/${auctionId}`, {}, msg);
            setMsg('');
        }
    };

    return (
        <div>
            <h2>채팅방 💌</h2>
            <div id="chat">
                {messages.map((m, idx) => (
                    <p key={idx}>
                        <strong>{m}</strong>: {m}
                    </p>
                ))}
            </div>

            <input
                type="text"
                value={msg}
                placeholder="메시지를 입력하세요"
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') sendMessage();
                }}
            />
            <button onClick={sendMessage}>보내기</button>
        </div>
    );
};

export default StompClient;
