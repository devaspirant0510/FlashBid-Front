import { useQueryGetAuctionList } from '@/features/auction/lib';
import { Card, CardContent, CardHeader } from '@shared/components/ui/card.tsx';
import { Divider } from '@shared/ui';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
    Clock3Icon,
    CreditCardIcon,
    ExpandIcon,
    EyeIcon,
    HeartIcon,
    MessageSquareDiffIcon,
    MessageSquareIcon,
    MessageSquareMoreIcon,
    ViewIcon,
} from 'lucide-react';
import { DateUtil, getServerURL } from '@shared/lib';
import { Button } from '@shared/components/ui/button.tsx';

type Props = {
    type: 'live' | 'blind';
};
const AuctionList: FC<Props> = ({ type }) => {
    const navigate = useNavigate();
    const { isLoading, isError, data, error } = useQueryGetAuctionList(type);

    const onClickAuctionItem = useCallback((id: number) => {
        navigate(`/auction/${type}/` + id);
    }, []);
    console.log(data);

    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>error</>;
    }
    if (!data || !data.data) {
        return <>nodata</>;
    }
    return (
        <>
            {data.data.map((v, index) => {
                return (
                    <Card
                        key={index}
                        className='my-4'
                        onClick={() => onClickAuctionItem(v.auction.id)}
                    >
                        <CardContent className='flex'>
                            {/* 왼쪽 이미지 */}
                            <div className='flex-1'>
                                <img
                                    className='rounded-xl w-full h-48 object-fill border-1'
                                    src={getServerURL() + v.images[0].url}
                                />
                            </div>

                            {/* 가운데 텍스트 */}
                            <div className='flex-4 ml-4 flex flex-col gap-2 justify-between'>
                                <div className='text-gray-400'>[{v.auction.category.name}]</div>
                                <div className='text-xl font-bold'>{v.auction.goods.title}</div>
                                <div className='text-gray-500 flex gap-1 text-sm'>
                                    <span className='text-[#F7A17E]'>판매자</span>
                                    <span>{v.auction.user.nickname}</span>
                                </div>
                                <div className='text-xl font-bold flex gap-2'>
                                    <span className='text-[#F7A17E]'>현재가</span>
                                    {type === 'blind' ? (
                                        <>***,***p</>
                                    ) : (
                                        <span>
                                            {v.currentPrice
                                                ? v.currentPrice.toLocaleString()
                                                : v.auction.startPrice.toLocaleString()}
                                            p
                                        </span>
                                    )}
                                </div>
                                <div>
                                    참여자수 <strong>{v.participateCount} 명</strong> | 입찰{' '}
                                    <strong>{v.biddingCount}</strong>
                                </div>
                                <div className='text-gray-400 text-sm flex gap-1 items-center'>
                                    <Clock3Icon size={20} />
                                    {DateUtil.timeAgo(v.auction.createdAt)}
                                </div>
                            </div>

                            {/* 오른쪽 아이콘 + 버튼 */}
                            <div className='flex flex-col justify-between items-center h-48'>
                                <div className='flex flex-col gap-2 items-center'>
                                    <div className='flex gap-1 justify-between w-16'>
                                        <EyeIcon className='text-uprimary' />0
                                    </div>
                                    <div className='flex gap-1 justify-between w-16'>
                                        <MessageSquareIcon className='text-uprimary' />
                                        {v.chatMessagingCount}
                                    </div>
                                    <div className='flex gap-1 justify-between w-16'>
                                        <HeartIcon className='text-uprimary' />
                                        {v.wishListCount}
                                    </div>
                                </div>

                                <div className='w-full flex justify-center'>
                                    <Button className='bg-white text-gray-500 border-gray-400 border rounded-full'>
                                        상세보기
                                        <ExpandIcon className='text-uprimary' />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </>
    );
};
export default AuctionList;
