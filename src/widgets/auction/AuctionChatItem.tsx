import React, { FC } from 'react';
import { ChatEntity } from '@entities/auction/model';
import { ProfileImage } from '@shared/ui';

type Props = {
    data: ChatEntity;
    isMe: boolean;
    type: 'live' | 'blind';
};

const AuctionChatItem: FC<Props> = ({ data, isMe, type }) => {
    const isMessage = data.chatType === 'MESSAGE';

    // 1. (수정) 채팅 버블용 시간 (시:분)
    const chatTimestamp = new Date(data.createdAt).toLocaleString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    // ============================
    // 💬 내 메시지
    // ============================
    if (isMe) {
        if (isMessage) {
            // [기존 동일] 일반 메시지
            return (
                <div className='flex items-end gap-2'>
                    <div>
                        <div className='text-xs text-end mr-2 mb-1 text-gray-500'>나</div>
                        <div className='bg-[#FFE2D6] p-3 text-sm rounded-xl shadow-sm max-w-[260px]'>
                            <div className='leading-relaxed break-words'>{data.contents}</div>
                            <div className='text-[#FA9870] text-[10px] text-end mt-1'>
                                {chatTimestamp}
                            </div>
                        </div>
                    </div>
                    <ProfileImage src={data.user.profileUrl} size={38} />
                </div>
            );
        } else {
            // [UX/UI 개선] 내 경매 메시지
            // 2. (추가) 입찰 기록용 시간 (Full)
            const fullBiddingTime = new Date(data.createdAt).toLocaleString('ko-KR');

            return (
                <div className='flex items-end gap-2'>
                    <div>
                        <div className='text-xs text-end mr-2 mb-1 text-gray-500'>나</div>
                        {/* === UX/UI 개선된 카드 === */}
                        <div className='bg-[#FFE2D6] p-4 text-sm rounded-xl shadow-sm w-[280px]'>
                            {/* 1. 헤더 (상품명 + 입찰완료) */}
                            <div className='font-semibold text-[#ED6C37] mb-2 truncate'>
                                {data.auction.goods.title}{' '}
                                <span className='font-bold'>입찰 완료!</span>
                            </div>

                            {/* 2. 입찰가 (핵심 정보) */}
                            <div className='text-center my-3'>
                                {type === 'live' && (
                                    <div className='text-xs text-gray-500 line-through mb-1'>
                                        {data.biddingLog.prevPrice.toLocaleString()}p
                                    </div>
                                )}
                                <div className='text-xl font-bold text-[#D95B29]'>
                                    {data.biddingLog.price.toLocaleString()}p
                                </div>
                            </div>

                            {/* 3. 구분선 */}
                            <hr className='border-t border-[#FCD2BF] my-2' />

                            {/* 4. 메타 정보 (flex-between으로 가독성 UP) */}
                            <div className='flex flex-col gap-1 text-xs text-gray-600'>
                                <div className='flex justify-between'>
                                    <span>입찰번호</span>
                                    <span className='font-medium'>{data.id}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>입찰자</span>
                                    <span className='font-medium'>{data.user.nickname}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>입찰시간</span>
                                    {/* 🚨 (수정) 풀타임 적용! */}
                                    <span className='font-medium'>{fullBiddingTime}</span>
                                </div>
                            </div>

                            {/* 5. 채팅용 타임스탬프 (시:분) */}
                            <div className='text-[#FA9870] text-[10px] text-end mt-2'>
                                {chatTimestamp}
                            </div>
                        </div>
                    </div>
                    <ProfileImage src={data.user.profileUrl} size={38} />
                </div>
            );
        }
    }

    // ============================
    // 💬 상대 메시지
    // ============================
    if (isMessage) {
        // [기존 동일] 일반 메시지
        return (
            <div className='flex items-end gap-2'>
                <ProfileImage src={data.user.profileUrl} size={38} />
                <div>
                    <div className='text-xs text-gray-500 mb-1'>{data.user.nickname}</div>
                    <div className='bg-[#F5F5F5] p-3 text-sm rounded-xl shadow-sm max-w-[260px]'>
                        <div className='leading-relaxed break-words'>{data.contents}</div>
                        <div className='text-[#a0a0a0] text-[10px] text-end mt-1'>
                            {chatTimestamp}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        // [UX/UI 개선] 상대 경매 메시지
        // 2. (추가) 입찰 기록용 시간 (Full)
        const fullBiddingTime = new Date(data.createdAt).toLocaleString('ko-KR');

        return (
            <div className='flex items-end gap-2'>
                <ProfileImage src={data.user.profileUrl} size={38} />
                <div>
                    <div className='text-xs text-gray-500 mb-1'>{data.user.nickname}</div>
                    {/* === UX/UI 개선된 카드 === */}
                    <div className='bg-[#F5F5F5] p-4 text-sm rounded-xl shadow-sm w-[280px]'>
                        {/* 1. 헤더 (상품명 + 입찰완료) */}
                        <div className='font-semibold text-gray-700 mb-2 truncate'>
                            {data.auction.goods.title}{' '}
                            <span className='text-[#6B6B6B] font-bold'>입찰 완료</span>
                        </div>

                        {/* 2. 입찰가 (핵심 정보) */}
                        <div className='text-center my-3'>
                            {type === 'live' ? (
                                <>
                                    <div className='text-xs text-gray-500 line-through mb-1'>
                                        {data.biddingLog.prevPrice.toLocaleString()}p
                                    </div>
                                    <div className='text-xl font-bold text-gray-800'>
                                        {data.biddingLog.price.toLocaleString()}p
                                    </div>
                                </>
                            ) : (
                                <div className='text-xl font-bold text-gray-800'>Unknown</div>
                            )}
                        </div>

                        {/* 3. 구분선 */}
                        <hr className='border-t border-gray-300 my-2' />

                        {/* 4. 메타 정보 (flex-between으로 가독성 UP) */}
                        <div className='flex flex-col gap-1 text-xs text-gray-600'>
                            <div className='flex justify-between'>
                                <span>입찰번호</span>
                                <span className='font-medium'>{data.id}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>입찰자</span>
                                <span className='font-medium'>{data.user.nickname}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>입찰시간</span>
                                {/* 🚨 (수정) 풀타임 적용! */}
                                <span className='font-medium'>{fullBiddingTime}</span>
                            </div>
                        </div>

                        {/* 5. 채팅용 타임스탬프 (시:분) */}
                        <div className='text-[#a0a0a0] text-[10px] text-end mt-2'>
                            {chatTimestamp}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AuctionChatItem;
