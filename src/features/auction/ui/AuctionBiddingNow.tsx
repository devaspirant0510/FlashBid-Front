import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { AuctionInfoData } from '@entities/auction/model';
import { Button } from '@shared/components/ui/button.tsx';
import StompClient from '@/features/auction/ui/StompClient.tsx';
import Stomp from 'stompjs';
import { useAuthUser } from '@shared/hooks/useAuthUser.tsx';
import { Input } from '@shared/components/ui/input.tsx';

type Props = {
    data: AuctionInfoData;
};
const AuctionBiddingNow: FC<Props> = ({ data }) => {
    const [userNickname, userId] = useAuthUser();
    const [price, setPrice] = useState<string>('');
    const onChangePrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setPrice(Number(e.target.value.replace(/,/g, '')).toLocaleString());
    }, []);
    const onClickBuyNow = useCallback(
        (data: AuctionInfoData, client: Stomp) => {
            const jsondata = {
                nickname: userNickname,
                userId: userId,
                bid: {
                    price: Number(price.replace(/,/g, '')),
                    prevPrice: data.lastBiddingLog.price,
                },
            };
            client.publish({
                destination: '/app/chat/send/' + data.auction.id,
                body: JSON.stringify(jsondata),
            });
        },
        [price, userNickname, userId],
    );
    return (
        <StompClient auctionId={data.auction.id}>
            {(client) => {
                return (
                    <section className={'flex flex-col bg-ubackground1 p-4'}>
                        <div>바로 입찰하기</div>
                        <div className={'flex justify-between mb-2'}>
                            <div className={'text-usecondary'}>
                                현재가 :
                                {data.lastBiddingLog
                                    ? data.lastBiddingLog.price.toLocaleString()
                                    : data.auction.startPrice.toLocaleString()}
                                p
                            </div>
                            <div className={'text-usecondary'}>입찰단위 : 10,000p</div>
                        </div>
                        <div
                            className={
                                'rounded-full bg-ubackground2 flex justify-between items-center'
                            }
                        >
                            <div
                                className={
                                    'bg-usecondary rounded-full text-white py-2 px-6 font-bold whitespace-nowrap'
                                }
                            >
                                입찰 가격
                            </div>
                            <div className={'flex items-center w-full'}>
                                <Input
                                    type='text'
                                    value={price}
                                    onChange={onChangePrice}
                                    className='w-full bg-transparent text-right text-xl font-bold text-usecondary focus:outline-none pr-2 no-spinner'
                                    placeholder='가격을 입력하세요'
                                />
                                <div className={'text-xl font-bold text-uprimary pr-4'}>p</div>
                            </div>
                        </div>
                        <Button
                            className={'bg-uprimary py-6 text-xl mt-4'}
                            onClick={(e) => onClickBuyNow(data, client)}
                        >
                            입찰하기
                        </Button>
                    </section>
                );
            }}
        </StompClient>
    );
};

export default AuctionBiddingNow;
