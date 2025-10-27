import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosClient, getServerURL } from '@shared/lib';

type Props = {
    roomId: number;
    participantId: number;
};

type ParticipantInfo = {
    id: number;
    nickname: string;
    profileUrl?: string;
};

type AuctionStatus = 'ONGOING' | 'ENDED';
type AuctionType = 'LIVE' | 'BLIND';

const DMChatHeader: React.FC<Props> = ({ roomId, participantId }) => {
    const [participant, setParticipant] = useState<ParticipantInfo | null>(null);
    const [auctionInfo, setAuctionInfo] = useState<any>(null);
    const [auctionType, setAuctionType] = useState<AuctionType>('LIVE');
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [auctionStatus, setAuctionStatus] = useState<AuctionStatus>('ONGOING');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);

                // 1. 사용자 정보 조회
                try {
                    const userResponse = await axiosClient.get(
                        `${getServerURL()}/api/v1/profile/${participantId}`
                    );
                    const userData = userResponse.data?.data?.user || userResponse.data?.user || userResponse.data;

                    setParticipant({
                        id: userData.id,
                        nickname: userData.nickname,
                        profileUrl: userData.profileUrl,
                    });
                } catch (error) {
                    console.error('사용자 정보 로딩 실패:', error);
                }

                // 2. 채팅방과 연결된 경매 정보 조회 (DTO로 반환됨)
                try {
                    const roomResponse = await axiosClient.get(
                        `${getServerURL()}/api/dm/room/${roomId}`
                    );

                    const roomData = roomResponse.data?.data || roomResponse.data;

                    if (roomData?.auction) {
                        setAuctionInfo(roomData.auction);

                        // 경매 타입 설정
                        const type = roomData.auction.auctionType || 'LIVE';
                        setAuctionType(type as AuctionType);

                        // 경매 상태 판단 (종료 시간 기준)
                        const endTime = new Date(roomData.auction.endTime);
                        const now = new Date();
                        setAuctionStatus(endTime < now ? 'ENDED' : 'ONGOING');

                        // 3. 경매 타입에 따라 가격 처리
                        try {
                            const auctionDetailResponse = await axiosClient.get(
                                `${getServerURL()}/api/v1/auction/${roomData.auction.id}`
                            );

                            const auctionDetail = auctionDetailResponse.data?.data || auctionDetailResponse.data;

                            if (type === 'LIVE') {
                                // LIVE: 최고가 표시
                                if (auctionDetail?.lastBiddingLog?.price) {
                                    setCurrentPrice(auctionDetail.lastBiddingLog.price);
                                } else {
                                    setCurrentPrice(roomData.auction.startPrice || 0);
                                }
                            } else if (type === 'BLIND') {
                                // BLIND: 시작가격만 표시 (입찰가는 비공개)
                                setCurrentPrice(roomData.auction.startPrice || 0);
                            }
                        } catch (error) {
                            console.error('경매 상세 정보 로딩 실패:', error);
                            // 경매가격 조회 실패 시 시작가격으로 설정
                            setCurrentPrice(roomData.auction.startPrice || 0);
                        }
                    }
                } catch (error) {
                    console.error('경매 정보 로딩 실패:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [roomId, participantId]);

    const getStatusBadge = () => {
        if (auctionStatus === 'ENDED') {
            return (
                <span className="px-2 py-1 bg-gray-300 text-gray-700 text-xs font-semibold rounded">
                    종료됨
                </span>
            );
        }
        return (
            <span className="px-2 py-1 bg-orange-300 text-orange-700 text-xs font-semibold rounded">
                경매중
            </span>
        );
    };

    const getPriceLabel = () => {
        if (auctionType === 'BLIND') {
            return '시작가';
        }
        return '현재가';
    };

    // 경매 페이지로 이동
    const handleViewAuction = () => {
        if (auctionInfo?.id) {
            navigate(`/auction/live/${auctionInfo.id}`);
        }
    };

    return (
        <div className="border-b border-gray-200 bg-white">
            {/* 상단: 프로필 */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    {isLoading ? (
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {participant?.profileUrl ? (
                                    <img
                                        src={participant.profileUrl}
                                        alt={participant.nickname}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                )}
                            </div>

                            <h2 className="text-lg font-semibold text-gray-800">
                                {participant?.nickname || '사용자'}
                            </h2>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                        </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 하단: 경매 상품 정보 */}
            {auctionInfo && (
                <div className="px-4 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        {/* 상품 이미지 */}
                        {auctionInfo.imageUrl && (
                            <img
                                src={
                                    auctionInfo.imageUrl.startsWith('http')
                                        ? auctionInfo.imageUrl
                                        : `${getServerURL()}${auctionInfo.imageUrl}`
                                }
                                alt={auctionInfo.goodsTitle}
                                className="w-12 h-12 rounded object-cover flex-shrink-0"
                                onError={(e) => {
                                    console.error('이미지 로드 실패:', auctionInfo.imageUrl);
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        )}

                        {/* 상품 정보 */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm line-clamp-1 mb-1">
                                {auctionInfo.goodsTitle}
                            </h3>
                            <p className="text-sm text-orange-500 font-semibold">
                                {getPriceLabel()}: {currentPrice.toLocaleString() || '0'} p
                            </p>
                        </div>

                        {/* 상태 뱃지 + 버튼 */}
                        <div className="flex items-center gap-2 ml-auto">
                            {getStatusBadge()}
                            <button
                                onClick={handleViewAuction}
                                className="px-3 py-2 bg-orange-400 hover:bg-orange-500 text-white text-s font-semibold rounded transition-colors whitespace-nowrap"
                            >
                                참여하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DMChatHeader;