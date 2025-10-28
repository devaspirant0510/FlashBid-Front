import React, { FC } from 'react';
import { ChatEntity } from '@entities/auction/model';
import { ProfileImage } from '@shared/ui';
import { useAuthUser } from '@shared/hooks/useAuthUser.tsx';

type Props = {
    data: ChatEntity;
    isMe: boolean;
    type: 'live' | 'blind';
};

const AuctionChatItem: FC<Props> = ({ data, isMe, type }) => {
    const isMessage = data.chatType === 'MESSAGE';

    // 내 메시지
    if (isMe) {
        if (isMessage) {
            return (
                <div className='flex justify-end'>
                    <div className='flex items-end gap-2 max-w-[80%]'>
                        <div className='flex flex-col items-end'>
                            <div className='text-sm text-end mr-3 mb-1'>나</div>
                            <div className='bg-[#FFE2D6] p-4 text-sm rounded-xl'>
                                <div className='mb-1'>{data.contents}</div>
                                <div className='text-[#FA9870] text-[8px] text-end'>
                                    {new Date(data.createdAt).toUTCString()}
                                </div>
                            </div>
                        </div>
                        <ProfileImage src={data.user.profileUrl} size={40} />
                    </div>
                </div>
            );
        } else {
            // [개선] 내 경매 메시지
            return (
                <div className='flex justify-end'>
                    <div className='flex items-end gap-2 max-w-[80%]'>
                        <div className='flex flex-col items-end'>
                            <div className='text-sm text-end mr-3 mb-1'>나</div>
                            <div className='bg-[#FFE2D6] p-4 text-sm rounded-xl min-w-[250px]'>
                                {/* 1. 헤더: 상품 제목 */}
                                <div className='font-bold mb-2'>
                                    {data.auction.goods.title}{' '}
                                    <span className='text-[#ED6C37]'>입찰</span> 되었습니다.
                                </div>

                                {/* 2. 본문: 입찰가 (강조) */}
                                <div className='text-lg font-bold text-center my-3 text-[#ED6C37]'>
                                    {type === 'live' ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <span className='text-xs line-through text-gray-500'>
                                                {data.biddingLog.prevPrice.toLocaleString()}p
                                            </span>
                                            <span className='text-lg'>→</span>
                                            <span>{data.biddingLog.price.toLocaleString()}p</span>
                                        </span>
                                    ) : (
                                        <span>{data.biddingLog.price.toLocaleString()}p</span>
                                    )}
                                </div>

                                {/* 3. 메타정보: 그리드로 정렬 */}
                                <div className='grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-xs'>
                                    <span className='text-gray-600'>입찰번호</span>
                                    <span>{data.id}</span>

                                    <span className='text-gray-600'>입찰자</span>
                                    <span>{data.user.nickname}</span>

                                    <span className='text-gray-600'>입찰시간</span>
                                    <span>{data.createdAt}</span>
                                </div>

                                {/* 4. 타임스탬프 */}
                                <div className='text-[#FA9870] text-[8px] text-end mt-2'>
                                    {new Date(data.createdAt).toUTCString()}
                                </div>
                            </div>
                        </div>
                        <ProfileImage src={data.user.profileUrl} size={40} />
                    </div>
                </div>
            );
        }
    }

    // 상대 메시지
    if (isMessage) {
        return (
            <div className='flex justify-start'>
                <div className='flex items-end gap-2 max-w-[80%]'>
                    <ProfileImage src={data.user.profileUrl} size={40} />
                    <div>
                        <div className='text-sm mb-1 ml-3'>{data.user.nickname}</div>
                        <div className='bg-[#F1F1F1] p-4 text-sm rounded-xl'>
                            <div className='mb-1'>{data.contents}</div>
                            <div className='text-[#b2b2b2] text-[8px]'>
                                {new Date(data.createdAt).toUTCString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        // [개선] 상대 경매 메시지
        return (
            <div className='flex justify-start'>
                <div className='flex items-end gap-2 max-w-[80%]'>
                    <ProfileImage src={data.user.profileUrl} size={40} />
                    <div>
                        <div className='text-sm mb-1 ml-3'>{data.user.nickname}</div>
                        <div className='flex flex-col bg-[#F1F1F1] p-4 text-sm rounded-xl min-w-[250px]'>
                            {/* 1. 헤더: 상품 제목 */}
                            <div className='font-bold mb-2'>
                                {data.auction.goods.title}{' '}
                                <span className='text-[#8b8b8b]'>입찰</span> 되었습니다.
                            </div>

                            {/* 2. 본문: 입찰가 (강조) */}
                            <div className='text-lg font-bold text-center my-3 text-gray-700'>
                                {type === 'live' ? (
                                    <span className='flex items-center justify-center gap-2'>
                                        <span className='text-xs line-through text-gray-500'>
                                            {data.biddingLog.prevPrice.toLocaleString()}p
                                        </span>
                                        <span className='text-lg'>→</span>
                                        <span>{data.biddingLog.price.toLocaleString()}p</span>
                                    </span>
                                ) : (
                                    <span>***,***p</span> // 블라인드 경매: 타인 가격 숨김
                                )}
                            </div>

                            {/* 3. 메타정보: 그리드로 정렬 */}
                            <div className='grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-xs'>
                                <span className='text-gray-600'>입찰번호</span>
                                <span>{data.id}</span>

                                <span className='text-gray-600'>입찰자</span>
                                <span>{data.user.nickname}</span>

                                <span className='text-gray-600'>입찰시간</span>
                                <span>{data.createdAt}</span>
                            </div>

                            {/* 4. 타임스탬프 */}
                            <div className='text-[#b2b2b2] text-[8px] text-end mt-2'>
                                {new Date(data.createdAt).toUTCString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AuctionChatItem;
