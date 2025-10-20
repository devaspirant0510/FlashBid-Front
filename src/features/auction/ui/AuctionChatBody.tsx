import React, { FC, useLayoutEffect, useRef } from 'react';
import { useQueryGetAllAuctionChat } from '@/features/auction/lib';
import AuctionChatItem from '@widgets/auction/AuctionChatItem.tsx';
import { useAuthUser } from '@shared/hooks/useAuthUser.tsx';
import { queryClient } from '@shared/lib';
import ConfirmBidCard from '@widgets/auction/ConfirmBidCard.tsx';
import FetchConfirmBid from '@/features/auction/ui/FetchConfirmBid.tsx';

type Props = {
    auctionId: number;
    type: 'live' | 'blind';
};
const AuctionChatBody: FC<Props> = ({ auctionId, type }) => {
    const { isLoading, data, isError } = useQueryGetAllAuctionChat(auctionId);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const confirmBidRef = useRef<HTMLDivElement | null>(null);
    const queries = queryClient.getQueriesData({
        queryKey: ['api', 'v1', 'auction', Number(auctionId)],
    });
    const [firstQuery] = queries;
    const [, auction] = firstQuery ?? [];
    const [, id] = useAuthUser();

    // messages 안전 처리
    const messages = data?.data ?? [];

    useLayoutEffect(() => {
        const scrollToEl = (el: HTMLElement | null) => {
            if (!el) return;
            // No animation: jump to element
            el.scrollIntoView({ block: 'end', inline: 'nearest' });
            const container = scrollRef.current;
            if (container) {
                // Immediately jump to bottom of the scroll container
                container.scrollTop = container.scrollHeight;
            }
        };
        requestAnimationFrame(() => {
            if (confirmBidRef.current) {
                scrollToEl(confirmBidRef.current);
            } else if (lastMessageRef.current) {
                scrollToEl(lastMessageRef.current);
            }
        });
    }, [messages.length, auction]);

    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>error</>;
    }

    const isEnded = Boolean(
        auction?.data?.auction?.endTime && new Date() >= new Date(auction.data.auction.endTime),
    );

    return (
        <div className={'px-8  pb-4 rounded-xl shadow-sm border-1'}>
            <div ref={scrollRef} className={'flex h-[48vh]  flex-col overflow-y-scroll '}>
                {messages.map((v, index) => {
                    const isLast = index === messages.length - 1;
                    if (v.user.id === id) {
                        return (
                            <div
                                className={'my-1 flex flex-end justify-end'}
                                key={index}
                                ref={isLast ? lastMessageRef : null}
                            >
                                <AuctionChatItem data={v} isMe={true} type={type} />
                            </div>
                        );
                    } else {
                        return (
                            <div
                                className={'my-1 flex'}
                                key={index}
                                ref={isLast ? lastMessageRef : null}
                            >
                                <AuctionChatItem data={v} isMe={false} type={type} />
                            </div>
                        );
                    }
                })}
                {isEnded && (
                    <FetchConfirmBid auctionId={auctionId} ref={confirmBidRef}>
                        {(bidData) => {
                            if (!bidData) {
                                return <>정산중...</>;
                            }
                            return (
                                <ConfirmBidCard
                                    data={bidData}
                                    thumbnail={auction.data.images[0].url}
                                />
                            );
                        }}
                    </FetchConfirmBid>
                )}
            </div>
        </div>
    );
};

export default AuctionChatBody;
