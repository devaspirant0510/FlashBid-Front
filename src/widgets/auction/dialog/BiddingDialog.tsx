import React, { FC, useCallback, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@shared/components/ui/dialog.tsx';
import { GavelIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { useAuthUser } from '@shared/hooks/useAuthUser.tsx';
import { Client } from 'stompjs';
import { useQueryGetAuctionById } from '@/features/auction/lib';
import { Input } from '@shared/components/ui/input.tsx';
import { Button } from '@shared/components/ui/button.tsx';
import useInput from '@shared/hooks/useInput.ts';
import MyProfile from '@/features/profile/ui/MyProfile.tsx';
import { FetchMyProfile } from '@/features/user/ui';

type Params = {
    id: number;
};
type Props = {
    client: Client;
};
const BiddingDialog: FC<Props> = ({ client }) => {
    const { id: auctionId } = useParams<Params>();
    const [userNickname, userId] = useAuthUser();
    const [open, setOpen] = useState(false);
    const { isLoading, isError, error, data } = useQueryGetAuctionById(auctionId!);
    const [value, onChange, setValue] = useInput({ initialValue: '' });
    const onClickBid = useCallback(() => {
        const jsondata = {
            contents: value,
            nickname: userNickname,
            userId: userId,
            bid: {
                price: value,
                prevPrice: data?.data?.currentPrice
                    ? data.data.currentPrice
                    : data?.data?.auction.startPrice,
            },
        };
        client.publish({
            destination: '/app/chat/send/' + auctionId,
            body: JSON.stringify(jsondata),
        });
        setOpen(false);
        setValue('');
    }, [value, data]);
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
                        <div className='flex items-center gap-2 mt-4'>
                            <span className='text-sm text-gray-600'>현재 가격</span>
                            <div className='text-xl font-bold text-[#FF7A00]'>
                                {data.data.currentPrice
                                    ? data.data.currentPrice.toLocaleString()
                                    : data.data.auction.startPrice.toLocaleString()}
                                <span className='text-base font-normal text-gray-500 ml-1'>P</span>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className='px-6 py-6 bg-white flex flex-col gap-4'>
                    <FetchMyProfile>
                        {(user) => {
                            const point = user.point ?? 0;
                            const inputValue = value ? Number(value) : 0;
                            const isOver = inputValue > point;
                            const isInvalid = !value || inputValue < 1 || isOver;
                            const willRemain = point - inputValue;
                            return (
                                <>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <span className='text-sm text-gray-500'>보유 포인트</span>
                                        <span className='font-bold text-[#FF7A00] text-lg'>
                                            {point.toLocaleString()}P
                                        </span>
                                    </div>
                                    <Input
                                        type='number'
                                        min={1}
                                        max={point}
                                        value={value}
                                        onChange={onChange}
                                        placeholder='입찰 금액을 입력하세요'
                                        disabled={point < 1}
                                        className='mb-1 text-lg px-4 py-2 border-2 border-[#FFD1BE] focus:border-[#FF7A00] rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A00]/20 disabled:bg-gray-100 disabled:text-gray-400'
                                    />
                                    {value && !isOver && inputValue > 0 && (
                                        <div className='text-sm text-gray-700 mb-1'>
                                            <span className='font-semibold text-[#FF7A00]'>
                                                {inputValue.toLocaleString()}P
                                            </span>{' '}
                                            사용, 남은 포인트{' '}
                                            <span className='font-semibold text-[#FF7A00]'>
                                                {willRemain.toLocaleString()}P
                                            </span>
                                        </div>
                                    )}
                                    {point < 1 && (
                                        <div className='text-red-500 text-sm mb-2'>
                                            포인트가 부족하여 입찰할 수 없습니다.
                                        </div>
                                    )}
                                    {isOver && (
                                        <div className='text-red-500 text-sm mb-2'>
                                            보유 포인트를 초과할 수 없습니다.
                                        </div>
                                    )}
                                    <Button
                                        onClick={onClickBid}
                                        className='w-full bg-[#FF7A00] hover:bg-[#FFB380] text-white font-bold py-2 rounded-lg shadow transition-colors'
                                        disabled={isInvalid || point < 1}
                                    >
                                        입찰하기
                                    </Button>
                                </>
                            );
                        }}
                    </FetchMyProfile>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default BiddingDialog;
