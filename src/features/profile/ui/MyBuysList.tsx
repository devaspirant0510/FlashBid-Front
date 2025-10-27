import { FC } from 'react';
import { getServerURL } from '@/shared/lib';
import { AuctionData } from '@entities/auction/model';
import { ProfileImage } from '@shared/ui';

type Props = {
    item: AuctionData;
};

const MyBuysList: FC<Props> = ({ item }) => {
    const imageUrl =
        item.images && item.images.length > 0
            ? getServerURL() + item.images[0].url
            : '/img/default.png';

    const seller = item.auction.user;

    return (
        <div>
            {/* 상품 이미지 */}
            <div className='h-[160px] w-[160px] relative overflow-hidden rounded-md'>
                <img className='h-full w-full object-cover' src={imageUrl} alt='purchased product' />
            </div>

            {/* 정보 영역 (상품 + 판매자) */}
            <div className='mt-2'>
                {/* [추가] 판매자 정보 UI */}
                <div className='flex items-center space-x-2 mb-2'>
                    <ProfileImage
                        size={24} // 24px 크기
                        src={seller.profileUrl} // 판매자 프로필 URL
                    />
                    <span className='text-xs font-semibold text-gray-700 truncate'>
                        {seller.nickname} {/* 판매자 닉네임 */}
                    </span>
                </div>

                {/* 기존 상품 정보 UI */}
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

export default MyBuysList;