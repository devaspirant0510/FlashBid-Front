import React, { FC, useCallback, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@shared/components/ui/dialog.tsx';
import { GavelIcon } from 'lucide-react';
import { useLocation, useParams } from 'react-router';
import { useAuthUser } from '@shared/hooks/useAuthUser.tsx';
import { Client } from 'stompjs';
import { useQueryGetAuctionById } from '@/features/auction/lib';
import { Input } from '@shared/components/ui/input.tsx';
import { Button } from '@shared/components/ui/button.tsx';
import useInput from '@shared/hooks/useInput.ts';
import { FetchMyProfile } from '@/features/user/ui';
import FetchLastBidPrice from '@/features/auction/ui/FetchLastBidPrice';
import { axiosClient } from '@shared/lib';
import { useQueryClient } from '@tanstack/react-query';

type Params = {
    id: number;
};
type Props = {
    client: Client;
};

const BiddingDialog: FC<Props> = ({ client }) => {
    const location = useLocation();
    const isBlind = location.pathname.includes('blind');
    const { id: auctionId } = useParams<Params>();
    const [userNickname, userId] = useAuthUser();
    const [open, setOpen] = useState(false);
    const { isLoading, isError, data } = useQueryGetAuctionById(auctionId!);
    const [value, onChange, setValue] = useInput({ initialValue: '' });
    const queryClient = useQueryClient();

    const onClickBid = useCallback(
        async (lastPriceArg?: number) => {
            try {
                const inputValue = value ? Number(value) : 0; // 입력값 = 최종 입찰가
                const lastPriceFromData =
                    data?.data?.lastBiddingLog?.price ?? data?.data?.auction?.startPrice ?? 0;
                const lastPrice =
                    typeof lastPriceArg === 'number' ? lastPriceArg : lastPriceFromData;

                // 실제 결제할 금액 = 입찰가 - 이미 낸 금액
                const paymentAmount = lastPrice > 0 ? inputValue - lastPrice : inputValue;

                // send numeric amount to payment API (차액만 보냄)
                const paymentResult = await axiosClient.post('/api/v1/auction/payment', {
                    auctionId: auctionId,
                    amount: paymentAmount,
                });
                console.log(paymentResult);

                const jsondata = {
                    contents: String(inputValue), // 최종 입찰가를 채팅에 표시
                    nickname: userNickname,
                    userId: userId,
                    bid: {
                        price: inputValue, // 최종 입찰가
                        prevPrice: lastPrice === 0 ? data?.data?.auction.startPrice : lastPrice,
                    },
                };
                (client as any).publish({
                    destination: '/app/chat/send/' + auctionId,
                    body: JSON.stringify(jsondata),
                });
                await queryClient.resetQueries({ queryKey: ['api', 'v1', 'profile', 'my'] } as any);
            } catch (e) {
                console.error(e);
            }
            setOpen(false);
            setValue('');
        },
        [value, data, userNickname, userId, auctionId, client, queryClient, setValue],
    );
    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-40'>
                <span className='text-gray-400'>로딩 중...</span>
            </div>
        );
    }
    if (isError) {
        return (
            <div className='flex items-center justify-center h-40'>
                <span className='text-red-500'>에러 발생</span>
            </div>
        );
    }
    if (!data || !data.data) {
        return (
            <div className='flex items-center justify-center h-40'>
                <span className='text-gray-400'>데이터 없음</span>
            </div>
        );
    }
    const auctionCurrentPrice =
        data?.data?.lastBiddingLog?.price ?? data?.data?.auction?.startPrice!;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className='bg-white border-[#FFD1BE] border flex flex-col items-center py-3 px-2 rounded-b-2xl shadow hover:shadow-lg transition-shadow cursor-pointer'>
                    <div className='w-10 h-10 bg-[#FFD1BE] rounded-full flex justify-center items-center shadow-md'>
                        <GavelIcon className='text-[#FEFDFD] border-0.5 border-[#DADADA]' />
                    </div>
                    <span className='text-xs mt-1 font-semibold text-[#FF7A00]'>입찰하기</span>
                </div>
            </DialogTrigger>
            <DialogContent className='max-w-md w-full rounded-2xl p-0 overflow-hidden'>
                <DialogHeader className='bg-[#FFF6F2] px-6 pt-6 pb-2 border-b'>
                    <DialogTitle>
                        <div className='flex gap-4 items-center'>
                            <img
                                className='object-cover w-24 h-24 rounded-lg shadow border'
                                width={96}
                                height={96}
                                src={import.meta.env.VITE_SERVER_URL + data.data.images[0].url}
                                alt='상품 이미지'
                            />
                            <div className='flex flex-col gap-1'>
                                <div className='text-lg font-bold text-gray-800 truncate max-w-[160px]'>
                                    {data.data.auction.goods.title}
                                </div>
                                <div className='text-sm text-gray-500 truncate max-w-[160px]'>
                                    {data.data.auction.goods.description}
                                </div>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className='px-6 py-6 bg-white flex flex-col gap-4'>
                    <div>
                        <FetchLastBidPrice id={data.data.auction.id}>
                            {(lastPriceFromApi) => (
                                <FetchMyProfile>
                                    {(user) => {
                                        const point = user.point ?? 0;
                                        const inputValue = value ? Number(value) : 0; // 입력값 = 최종 입찰가
                                        const lastPrice = lastPriceFromApi ?? 0;

                                        // 실제 결제할 금액 = 입찰가 - 이미 낸 금액
                                        const paymentAmount =
                                            lastPrice > 0
                                                ? Math.max(0, inputValue - lastPrice)
                                                : inputValue;

                                        // 블라인드 경매가 아닐 때만 가격 검증
                                        const minBidPrice = isBlind
                                            ? 0
                                            : Math.max(auctionCurrentPrice, lastPrice);

                                        const isOver = paymentAmount > point;
                                        const isTooLow = isBlind
                                            ? false
                                            : inputValue <= minBidPrice;
                                        const isInvalid =
                                            !value || inputValue < 1 || isOver || isTooLow;
                                        const willRemain = point - paymentAmount;
                                        return (
                                            <>
                                                {/* 현재 경매 가격 - 블라인드 경매에서는 숨김 */}
                                                {!isBlind && (
                                                    <div className='bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 mb-4 border border-orange-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <span className='text-sm font-medium text-gray-700'>
                                                                현재 경매가
                                                            </span>
                                                            <div className='text-2xl font-bold text-[#FF7A00]'>
                                                                {auctionCurrentPrice.toLocaleString()}
                                                                <span className='text-base font-normal text-gray-500 ml-1'>
                                                                    P
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 블라인드 경매 안내 메시지 */}
                                                {isBlind && (
                                                    <div className='bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 mb-4 border border-purple-200'>
                                                        <div className='flex items-start gap-2'>
                                                            <span className='text-purple-600 text-lg'>
                                                                🔒
                                                            </span>
                                                            <div>
                                                                <div className='text-sm font-semibold text-purple-800 mb-1'>
                                                                    블라인드 경매
                                                                </div>
                                                                <div className='text-xs text-purple-700'>
                                                                    현재 가격이 공개되지 않습니다.
                                                                    원하는 금액을 입찰해주세요.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 내 마지막 입찰 정보 */}
                                                {lastPrice > 0 && (
                                                    <div className='bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200'>
                                                        <div className='flex justify-between items-center'>
                                                            <span className='text-sm font-medium text-gray-700'>
                                                                내 현재 입찰가
                                                            </span>
                                                            <div className='text-xl font-bold text-blue-600'>
                                                                {lastPrice.toLocaleString()}
                                                                <span className='text-base font-normal text-gray-500 ml-1'>
                                                                    P
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='mt-2 text-xs text-gray-600 bg-white/60 rounded-lg px-3 py-2'>
                                                            💡 이미 {lastPrice.toLocaleString()}P를
                                                            입찰하셨습니다. 더 높은 금액으로
                                                            입찰하시면{' '}
                                                            <span className='font-semibold text-blue-600'>
                                                                차액만 결제
                                                            </span>
                                                            됩니다.
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 보유 포인트 */}
                                                <div className='flex items-center justify-between mb-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200'>
                                                    <span className='text-sm font-medium text-gray-700'>
                                                        보유 포인트
                                                    </span>
                                                    <span className='font-bold text-[#FF7A00] text-lg'>
                                                        {point.toLocaleString()}P
                                                    </span>
                                                </div>

                                                {/* 입찰 금액 입력 */}
                                                <div className='mb-2'>
                                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                        입찰 금액
                                                    </label>
                                                    <Input
                                                        type='number'
                                                        min={1}
                                                        max={Math.max(1, point + lastPrice)}
                                                        value={value}
                                                        onChange={onChange}
                                                        placeholder={
                                                            isBlind
                                                                ? '입찰할 금액을 입력하세요'
                                                                : `${minBidPrice + 1} 이상 입력`
                                                        }
                                                        className='w-full text-lg px-4 py-3 border-2 border-[#FFD1BE] focus:border-[#FF7A00] rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A00]/20'
                                                    />
                                                </div>

                                                {/* 결제 정보 표시 */}
                                                {value &&
                                                    !isOver &&
                                                    (!isTooLow || isBlind) &&
                                                    inputValue > 0 && (
                                                        <div className='bg-green-50 border border-green-200 rounded-xl p-4 mb-3'>
                                                            <div className='space-y-2'>
                                                                {lastPrice > 0 && (
                                                                    <>
                                                                        <div className='flex justify-between text-sm'>
                                                                            <span className='text-gray-600'>
                                                                                입찰 금액
                                                                            </span>
                                                                            <span className='font-semibold text-gray-800'>
                                                                                {inputValue.toLocaleString()}
                                                                                P
                                                                            </span>
                                                                        </div>
                                                                        <div className='flex justify-between text-sm'>
                                                                            <span className='text-gray-600'>
                                                                                이미 결제한 금액
                                                                            </span>
                                                                            <span className='font-semibold text-blue-600'>
                                                                                -{' '}
                                                                                {lastPrice.toLocaleString()}
                                                                                P
                                                                            </span>
                                                                        </div>
                                                                        <div className='h-px bg-gray-300 my-2'></div>
                                                                    </>
                                                                )}
                                                                <div className='flex justify-between items-center'>
                                                                    <span className='font-semibold text-gray-700'>
                                                                        {lastPrice > 0
                                                                            ? '추가 결제 금액'
                                                                            : '결제 금액'}
                                                                    </span>
                                                                    <span className='text-xl font-bold text-[#FF7A00]'>
                                                                        {paymentAmount.toLocaleString()}
                                                                        P
                                                                    </span>
                                                                </div>
                                                                <div className='flex justify-between text-sm pt-2 border-t border-green-300'>
                                                                    <span className='text-gray-600'>
                                                                        남은 포인트
                                                                    </span>
                                                                    <span className='font-semibold text-green-700'>
                                                                        {willRemain.toLocaleString()}
                                                                        P
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                {/* 에러 메시지 - 블라인드 경매에서는 가격 관련 에러 숨김 */}
                                                {!isBlind && isTooLow && value && (
                                                    <div className='text-red-500 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2'>
                                                        ⚠️ {minBidPrice.toLocaleString()}P보다 높은
                                                        금액을 입력해주세요.
                                                    </div>
                                                )}
                                                {point < 1 && (
                                                    <div className='text-red-500 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2'>
                                                        ⚠️ 포인트가 부족하여 입찰할 수 없습니다.
                                                    </div>
                                                )}
                                                {isOver && (
                                                    <div className='text-red-500 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2'>
                                                        ⚠️ 보유 포인트를 초과할 수 없습니다. (사용
                                                        가능: {point.toLocaleString()}P)
                                                    </div>
                                                )}

                                                {/* 입찰 버튼 */}
                                                <Button
                                                    onClick={() => onClickBid(lastPrice)}
                                                    className='w-full bg-gradient-to-r from-[#FF7A00] to-[#FF9F4D] hover:from-[#FF8C1A] hover:to-[#FFB366] text-white font-bold py-3 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                                                    disabled={isInvalid || point < 1}
                                                >
                                                    {value && !isInvalid
                                                        ? `${paymentAmount.toLocaleString()}P로 입찰하기`
                                                        : '입찰하기'}
                                                </Button>
                                            </>
                                        );
                                    }}
                                </FetchMyProfile>
                            )}
                        </FetchLastBidPrice>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BiddingDialog;
