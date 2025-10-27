import { FC } from 'react';
import { getServerURL } from '@/shared/lib';
import { AuctionData } from '@entities/auction/model';

type Props = {
    item: AuctionData;
};

const MySalesList: FC<Props> = ({ item }) => {
    const imageUrl =
        item.images && item.images.length > 0
            ? getServerURL() + item.images[0].url
            : '/img/default.png';

    // 경매 종료 여부 확인
    const isEnded = new Date(item.auction.endTime) < new Date();

    return (
        <div>
            {/* 이미지 컨테이너 */}
            <div className={`h-[160px] w-[160px] relative overflow-hidden rounded-md ${isEnded ? 'grayscale' : ''}`}>
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
                <div className='flex flex-col items-start'>
                    <div className='text-[12px] text-gray-500 font-semibold pr-1'>
                        [{item.auction.category.name}]
                    </div>
                    <div className='text-[12px] text-black font-semibold pr-1 text-left'>
                        {item.auction.goods.title}
                    </div>
                    <div className='text-[13px] text-orange-600 font-bold pr-1 text-left mt-1'>
                        {item.currentPrice?.toLocaleString() || item.auction.startPrice.toLocaleString()}원
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySalesList;