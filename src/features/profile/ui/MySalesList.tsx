import { FC } from 'react';
import { getServerURL } from '@/shared/lib';
import { AuctionData } from '@entities/auction/model';
import { Link } from 'react-router-dom'; // [추가] react-router-dom의 Link를 가져옵니다.

type Props = {
    item: AuctionData;
};

const MySalesList: FC<Props> = ({ item }) => {
    if (!item || !item.auction) {
        return null;
    }

    const { auction } = item; // [수정] item에서 auction을 미리 추출합니다.

    const imageUrl =
        item.images && item.images.length > 0
            ? getServerURL() + item.images[0].url
            : '/img/default.png';

    const isEnded = new Date(auction.endTime) < new Date();

    // [추가] 상세 페이지로 이동할 동적 URL을 생성합니다.
    // auction.auctionType이 'live' 또는 'blind' 값에 따라 URL이 결정됩니다.
    const detailUrl = `/auction/${auction.auctionType}/${auction.id}`;

    return (
        <div className='w-full'>
            {/* [수정] Link 컴포넌트로 이미지 영역을 감싸줍니다. */}
            <Link to={detailUrl}>
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
            </Link>

            {/* 상품 정보 */}
            <div className='mt-2'>
                <div className='flex flex-col items-start'>
                    <div className='flex flex-row items-baseline w-full'>
                        <span className='text-[12px] text-gray-500 font-semibold pr-1'>
                            [{auction.category.name}]
                        </span>
                        <span className='text-[12px] text-black font-semibold text-left truncate' title={auction.goods.title}>
                            {auction.goods.title}
                        </span>
                    </div>

                    <div className='text-[13px] text-orange-600 font-bold pr-1 text-left mt-1'>
                        {item.currentPrice?.toLocaleString() || auction.startPrice.toLocaleString()}원
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySalesList;