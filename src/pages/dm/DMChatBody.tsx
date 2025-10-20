import React, {useEffect, useState, useRef, useCallback} from 'react';
import {axiosClient, getServerURL} from '@shared/lib';
import AuctionInfoCard from '@/pages/dm/AuctionInfoCard';

type Props = {
    client: any;
    roomId: number;
    userId: number; // ✅ 현재 로그인한 유저 ID
    onMessageReceived?: () => void;
    onMessagesRead?: () => void;
};

type Message = {
    id?: number | string;
    roomId: number;
    senderId: number;
    receiverId: number;
    contents: string;
    dmType: string;
    createdAt: string;
    readCount?: number;
};

const DMChatBody: React.FC<Props> = ({
                                         client,
                                         roomId,
                                         userId, // ✅ 비구조화 할당
                                         onMessageReceived,
                                         onMessagesRead,
                                     }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [auctionInfo, setAuctionInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const subscriptionRef = useRef<any>(null);

    const formatTime = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const formatDateSeparator = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
    };

    const isSameDay = (dateA: Date, dateB: Date) => {
        return (
            dateA.getFullYear() === dateB.getFullYear() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getDate() === dateB.getDate()
        );
    };

    const markMessagesAsRead = useCallback(async () => {
        try {
            await axiosClient.post(
                `${getServerURL()}/api/dm/chat/read/${roomId}`
            );
            if (onMessagesRead) {
                onMessagesRead();
            }
        } catch (error) {
            console.error('메시지 읽음 표시 실패:', error);
        }
    }, [roomId, onMessagesRead]);

    // 1. 채팅방 내역 로드
    useEffect(() => {
        const loadChatHistory = async () => {
            try {
                setIsLoading(true);
                setMessages([]);
                setAuctionInfo(null);

                const response = await axiosClient.get(
                    `${getServerURL()}/api/dm/chat/${roomId}`
                );

                if (response.data && response.data.length > 0) {
                    const chats = response.data;

                    if (chats[0].contents && chats[0].contents.startsWith('AUCTION_INFO:')) {
                        const auctionId = chats[0].contents.split(':')[1];
                        try {
                            const auctionResponse = await axiosClient.get(
                                `${getServerURL()}/api/v1/auction/${auctionId}`
                            );
                            setAuctionInfo(auctionResponse.data);
                        } catch (error) {
                            console.error('경매 정보 로딩 실패:', error);
                        }
                        setMessages(chats.slice(1));
                    } else {
                        setMessages(chats);
                    }
                }
            } catch (error) {
                console.error('채팅 내역 로딩 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadChatHistory();
    }, [roomId]);

    // 2. STOMP 구독 (✅ 수정된 부분)
    useEffect(() => {
        if (!client || !client.connected) {
            return;
        }

        subscriptionRef.current = client.subscribe(`/topic/dm/${roomId}`, (msg: any) => {
            try {
                const parsed = JSON.parse(msg.body) as Message; // ✅ 타입 명시

                if (!parsed.contents || !parsed.contents.startsWith('AUCTION_INFO:')) {
                    // 1. 수신한 메시지를 화면에 추가
                    setMessages((prev) => {
                        const updated = [...prev, parsed];
                        return updated;
                    });

                    // ✅ 2. 발신자와 현재 유저 ID 비교
                    if (parsed.senderId === userId) {
                        // "나" (발신자)
                        // 채팅방 목록의 '마지막 메시지'를 갱신하기 위해 호출
                        if (onMessageReceived) {
                            onMessageReceived();
                        }
                    } else {
                        // "상대방" (수신자)
                        // 방금 수신한 메시지를 '읽음' 처리하기 위해 호출
                        // 이 함수는 성공 시 onMessagesRead (refreshRooms)를 호출하여
                        // 뱃지(unreadCount)를 0으로 갱신합니다.
                        markMessagesAsRead();
                    }
                }
            } catch (error) {
                console.error('메시지 파싱 실패:', error, msg.body);
            }
        });

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
        // ✅ 3. 의존성 배열에 markMessagesAsRead와 userId 추가
    }, [client, roomId, onMessageReceived, markMessagesAsRead, userId]);

    // 3. 채팅방 로드 완료 시 '읽음' 처리 (최초 1회)
    useEffect(() => {
        if (!isLoading) {
            markMessagesAsRead();
        }
    }, [isLoading, markMessagesAsRead]);

    // 4. 새 메시지 수신 시 '스크롤' 처리
    useEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => {
                scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
            }, 0);
        }
    }, [messages, auctionInfo]);


    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">메시지를 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {auctionInfo && (
                <AuctionInfoCard
                    auctionData={auctionInfo}
                    serverUrl={getServerURL()}
                />
            )}

            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                    <p className="text-gray-400">메시지가 없습니다. 첫 메시지를 보내보세요!</p>
                </div>
            ) : (
                messages.map((m, index) => {
                    const currentMessage = m;
                    const prevMessage = messages[index - 1];
                    const nextMessage = messages[index + 1];

                    let dateSeparatorElement = null;

                    if (currentMessage.createdAt) {
                        const currentDate = new Date(currentMessage.createdAt);

                        if (index === 0) {
                            dateSeparatorElement = (
                                <div
                                    className="my-4 text-center text-xs text-gray-500 bg-gray-200 rounded-full px-3 py-1 mx-auto w-fit">
                                    {formatDateSeparator(currentMessage.createdAt)}
                                    D/</div>
                            );
                        } else if (prevMessage && prevMessage.createdAt) {
                            const prevDate = new Date(prevMessage.createdAt);
                            if (!isSameDay(currentDate, prevDate)) {
                                dateSeparatorElement = (
                                    <div
                                        className="my-4 text-center text-xs text-gray-500 bg-gray-200 rounded-full px-3 py-1 mx-auto w-fit">
                                        {formatDateSeparator(currentMessage.createdAt)}
                                    </div>
                                );
                            }
                        }
                    }

                    let showTime = true;

                    if (nextMessage && nextMessage.createdAt && currentMessage.createdAt) {
                        const isSameSender = currentMessage.senderId === nextMessage.senderId;
                        const isSameMinute = formatTime(currentMessage.createdAt) === formatTime(nextMessage.createdAt);

                        if (isSameSender && isSameMinute) {
                            showTime = false;
                        }
                    }

                    return (
                        <React.Fragment key={m.id || m.createdAt}>
                            {dateSeparatorElement}
                            <div
                                className={`my-2 flex ${m.senderId === userId ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`flex items-end gap-2 max-w-[80%] ${
                                        m.senderId === userId ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-xl break-words text-sm ${
                                            m.senderId === userId
                                                ? 'bg-orange-400 text-white'
                                                : 'bg-white text-gray-800 border border-gray-200'
                                        }`}
                                    >
                                        {m.contents}
                                    </div>

                                    <div className="flex flex-col items-center gap-1">
                                        {/* ✅ 내 메시지일 때만 읽음 상태 표시 */}
                                        {m.senderId === userId && m.readCount !== undefined && (
                                            <span className="text-xs text-gray-400">
    {m.readCount === 0 ? '1' : ''}
  </span>
                                        )}
                                        {showTime && (
                                            <span className="text-xs text-gray-400 whitespace-nowrap">
                                                {m.createdAt ? formatTime(m.createdAt) : ''}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })
            )}
        </div>
    );
};

export default DMChatBody;