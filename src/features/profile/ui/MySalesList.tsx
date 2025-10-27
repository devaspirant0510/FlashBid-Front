// profile/ui/MySalesList.tsx

import { FC } from 'react';
import { getServerURL } from '@/shared/lib';
import { AuctionData } from '@entities/auction/model';

type Props = {
    item: AuctionData;
};

const MySalesList: FC<Props> = ({ item }) => {
    if (!item || !item.auction) {
        return null;
    }

    const imageUrl =
        item.images && item.images.length > 0
            ? getServerURL() + item.images[0].url
            : '/img/default.png';

    const isEnded = new Date(item.auction.endTime) < new Date();

    return (
        <div className='w-full'>
            <div className={`relative w-full aspect-square overflow-hidden rounded-md ${isEnded ? 'grayscale' : ''}`}>
                <img
                    className='h-full w-full object-cover'
                    src={imageUrl}
                    alt='sold product'
                />
                <div className='absolute top-2 left-2'>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${isEnded ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'}`}>
                        {isEnded ? '판매완료' : '진행중'}
                    </span>
                </div>
            </div>

            {/* 상품 정보 */}
            <div className='mt-2'>
                {/* [수정] flex-col -> flex-col */}
                <div className='flex flex-col items-start'>
                    {/* [수정] 카테고리와 상품명을 flex-row로 감싸기 */}
                    <div className='flex flex-row items-baseline w-full'>
                        <span className='text-[12px] text-gray-500 font-semibold pr-1'>
                            [{item.auction.category.name}]
                        </span>
                        {/* [수정] truncate 클래스로 긴 제목 처리 */}
                        <span className='text-[12px] text-black font-semibold text-left truncate' title={item.auction.goods.title}>
                            {item.auction.goods.title}
                        </span>
                    </div>

                    {/* 가격 영역 */}
                    <div className='text-[13px] text-orange-600 font-bold pr-1 text-left mt-1'>
                        {item.currentPrice?.toLocaleString() || item.auction.startPrice.toLocaleString()}원
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySalesList;