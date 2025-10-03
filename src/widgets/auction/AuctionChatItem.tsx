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
                <div className='flex items-end gap-2'>
                    <div>
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
            );
        } else {
            // 내 경매 메시지
            return (
                <div className='flex items-end gap-2'>
                    <div>
                        <div className='text-sm text-end mr-3 mb-1'>나</div>
                        <div className='flex flex-col bg-[#FFE2D6] p-4 text-sm rounded-xl gap-1'>
                            <div className='font-bold'>
                                {data.auction.goods.title}{' '}
                                <span className='text-[#ED6C37]'>입찰</span> 되었습니다.
                            </div>
                            <div className='text-xs'>
                                입찰번호 : <span>{data.id}</span>
                            </div>
                            <div className='text-xs'>
                                입찰자 : <span>{data.user.nickname}</span>
                            </div>
                            <div className='text-xs'>
                                입찰시간 : <span>{data.createdAt}</span>
                            </div>
                            <div className='text-xs'>
                                입찰가 :
                                {type === 'live' ? (
                                    <span>
                                        <span>{data.biddingLog.prevPrice.toLocaleString()}</span>→
                                        <span>{data.biddingLog.price.toLocaleString()}</span>
                                    </span>
                                ) : (
                                    <span>
                                        <span>{data.biddingLog.price.toLocaleString()}p</span>
                                    </span>
                                )}
                            </div>
                            <div className='text-[#FA9870] text-[8px] text-end'>
                                {new Date(data.createdAt).toUTCString()}
                            </div>
                        </div>
                    </div>
                    <ProfileImage src={data.user.profileUrl} size={40} />
                </div>
            );
        }
    }

    // 상대 메시지
    if (isMessage) {
        return (
            <div className='flex items-end gap-2'>
                <ProfileImage src={data.user.profileUrl} size={40} />
                <div>
                    <div className='text-sm'>{data.user.nickname}</div>
                    <div className='bg-[#F1F1F1] p-4 text-sm rounded-xl'>
                        <div className='mb-1'>{data.contents}</div>
                        <div className='text-[#b2b2b2] text-[8px]'>
                            {new Date(data.createdAt).toUTCString()}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        // 상대 경매 메시지
        return (
            <div className='flex items-end gap-2'>
                <ProfileImage src={data.user.profileUrl} size={40} />
                <div>
                    <div className='text-sm'>{data.user.nickname}</div>
                    <div className='flex flex-col bg-[#F1F1F1] p-4 text-sm rounded-xl gap-1'>
                        <div className='font-bold'>
                            {data.auction.goods.title} <span className='text-[#8b8b8b]'>입찰</span>{' '}
                            되었습니다.
                        </div>
                        <div className='text-xs'>
                            입찰번호 : <span>{data.id}</span>
                        </div>
                        <div className='text-xs'>
                            입찰자 : <span>{data.user.nickname}</span>
                        </div>
                        <div className='text-xs'>
                            입찰시간 : <span>{data.createdAt}</span>
                        </div>
                        <div className='text-xs'>
                            입찰가 :
                            {type === 'live' ? (
                                <div>
                                    <span>{data.biddingLog.prevPrice.toLocaleString()}</span>→
                                    <span>{data.biddingLog.price.toLocaleString()}</span>
                                </div>
                            ) : (
                                <div>***,***p</div>
                            )}
                        </div>
                        <div className='text-[#b2b2b2] text-[8px]'>
                            {new Date(data.createdAt).toUTCString()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AuctionChatItem;
