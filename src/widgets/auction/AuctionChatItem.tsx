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
    const timeString = new Date(data.createdAt).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const ChatTime = ({ color = '#b2b2b2' }: { color?: string }) => (
        <div className={`text-[8px] text-end`} style={{ color }}>
            {timeString}
        </div>
    );

    /** 내 일반 메시지 */
    if (isMe && isMessage) {
        return (
            <div className='flex items-end gap-2 justify-end'>
                <div className='max-w-[70%]'>
                    <div className='text-sm text-end mr-2 mb-1 font-semibold text-[#ED6C37]'>
                        나
                    </div>
                    <div className='bg-[#FFE2D6] p-3 rounded-2xl shadow-md'>
                        <div className='text-sm leading-relaxed'>{data.contents}</div>
                        <ChatTime color='#FA9870' />
                    </div>
                </div>
                <ProfileImage src={data.user.profileUrl} size={40} />
            </div>
        );
    }

    /** 내 경매 메시지 */
    if (isMe && !isMessage) {
        return (
            <div className='flex items-end gap-2 justify-end'>
                <div className='max-w-[70%]'>
                    <div className='text-sm text-end mr-2 mb-1 font-semibold text-[#ED6C37]'>
                        나
                    </div>
                    <div className='bg-[#FFE2D6] p-4 rounded-2xl shadow-md space-y-2 text-sm'>
                        <div className='font-bold text-[#ED6C37] border-b border-[#fcd5c0] pb-1'>
                            🧡 {data.auction.goods.title} 입찰 완료!
                        </div>
                        <div className='grid grid-cols-2 gap-x-2 text-xs text-[#5b5b5b]'>
                            <div>입찰번호 :</div>
                            <div>{data.id}</div>
                            <div>입찰자 :</div>
                            <div>{data.user.nickname}</div>
                            <div>입찰시간 :</div>
                            <div>{data.createdAt}</div>
                            <div>입찰가 :</div>
                            <div>
                                {type === 'live' ? (
                                    <span className='font-semibold text-[#ED6C37]'>
                                        {data.biddingLog.prevPrice.toLocaleString()} →{' '}
                                        {data.biddingLog.price.toLocaleString()}p
                                    </span>
                                ) : (
                                    <span className='font-semibold text-[#ED6C37]'>
                                        {data.biddingLog.price.toLocaleString()}p
                                    </span>
                                )}
                            </div>
                        </div>
                        <ChatTime color='#FA9870' />
                    </div>
                </div>
                <ProfileImage src={data.user.profileUrl} size={40} />
            </div>
        );
    }

    /** 상대 일반 메시지 */
    if (isMessage) {
        return (
            <div className='flex items-end gap-2'>
                <ProfileImage src={data.user.profileUrl} size={40} />
                <div className='max-w-[70%]'>
                    <div className='text-sm font-semibold mb-1'>{data.user.nickname}</div>
                    <div className='bg-[#F1F1F1] p-3 rounded-2xl shadow-sm'>
                        <div className='text-sm leading-relaxed'>{data.contents}</div>
                        <ChatTime />
                    </div>
                </div>
            </div>
        );
    }

    /** 상대 경매 메시지 */
    return (
        <div className='flex items-end gap-2'>
            <ProfileImage src={data.user.profileUrl} size={40} />
            <div className='max-w-[70%]'>
                <div className='text-sm font-semibold mb-1'>{data.user.nickname}</div>
                <div className='bg-[#F1F1F1] p-4 rounded-2xl shadow-sm space-y-2 text-sm'>
                    <div className='font-bold border-b border-[#e0e0e0] pb-1'>
                        💬 {data.auction.goods.title} <span className='text-[#8b8b8b]'>입찰</span>{' '}
                        되었습니다.
                    </div>
                    <div className='grid grid-cols-2 gap-x-2 text-xs text-[#4f4f4f]'>
                        <div>입찰번호 :</div>
                        <div>{data.id}</div>
                        <div>입찰자 :</div>
                        <div>{data.user.nickname}</div>
                        <div>입찰시간 :</div>
                        <div>{data.createdAt}</div>
                        <div>입찰가 :</div>
                        <div>
                            {type === 'live' ? (
                                <span className='font-semibold text-[#8b8b8b]'>
                                    {data.biddingLog.prevPrice.toLocaleString()} →{' '}
                                    {data.biddingLog.price.toLocaleString()}p
                                </span>
                            ) : (
                                <span className='tracking-wider'>***,***p</span>
                            )}
                        </div>
                    </div>
                    <ChatTime />
                </div>
            </div>
        </div>
    );
};

export default AuctionChatItem;
