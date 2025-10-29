import { FC } from 'react';
import { getServerURL } from '@/shared/lib';
import { AuctionData } from '@entities/auction/model';
import { ProfileImage } from '@shared/ui';
import { Link } from 'react-router-dom'; // [추가] react-router-dom의 Link를 가져옵니다.

type Props = {
    item: AuctionData;
};

const MyBuysList: FC<Props> = ({ item }) => {
    if (!item || !item.auction) {
        return null;
    }

    const { auction } = item; // [수정] item에서 auction을 미리 추출합니다.

    const imageUrl =
        item.images && item.images.length > 0
            ? `${getServerURL()}${item.images[0].url}`
            : '/img/default.png';


    const seller = auction.user;

    // [추가] 상세 페이지로 이동할 동적 URL을 생성합니다.
    const detailUrl = `/auction/${auction.auctionType}/${auction.id}`;
    const profileUrl = `/users/${seller.id}`;

    return (
        <div className='w-full'>
            {/* [수정] Link 컴포넌트로 이미지 영역을 감싸줍니다. */}
            <Link to={detailUrl}>
                <div className='relative w-full aspect-square overflow-hidden rounded-md'>
                    <img className='h-full w-full object-cover' src={imageUrl} alt='purchased product' />
                </div>
            </Link>

            {/* 정보 영역 */}
            <div className='mt-2'>
                <Link to={profileUrl} className='flex items-center space-x-2 mb-2 group'>
                    <ProfileImage
                        size={24}
                        src={seller.profileUrl}
                    />
                    <span className='text-xs font-semibold text-gray-700 truncate group-hover:underline'>
                        {seller.nickname}
                    </span>
                </Link>

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

export default MyBuysList;