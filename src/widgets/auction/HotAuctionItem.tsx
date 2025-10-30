import React, { FC, useCallback } from 'react';
import { AuctionData } from '@entities/auction/model';
import { UserIcon } from 'lucide-react';
import { getServerURL } from '@shared/lib';
import { useNavigate } from 'react-router';

type Props = {
    item: AuctionData;
};
const HotAuctionItem: FC<Props> = ({ item }) => {
    const navigate = useNavigate();
    const onClickItem = useCallback(() => {
        navigate(`/auction/${item.auction.auctionType.toLowerCase()}/${item.auction.id}`);
    }, [item]);

    const displayPrice = item.currentPrice ?? item.auction.startPrice;

    return (
        <div className={'w-full'} onClick={onClickItem}>
            {/* 1. 이미지 */}
            <div className='w-full aspect-square overflow-hidden'>
                <img
                    className='w-full h-full object-cover rounded-2xl'
                    src={item.images.length > 0 ? item.images[0].url : ''}
                    alt=''
                />
            </div>

            {/* 2. 상품명 */}
            <div className={'truncate w-64'}>
                <div className={'truncate w-full text-[#565656] text-lg'}>
                    {item.auction.goods.title}
                </div>
            </div>

            {/* 3. 가격 (추가된 부분) */}
            <div className={'font-bold text-lg text-black mt-2'}>
                {displayPrice.toLocaleString('ko-KR')}원
            </div>

            {/* 4. 조회수 및 입찰 횟수 (추가된 부분) */}
            <div className={'flex text-xs text-gray-500 mt-1 gap-2 items-center'}>
                <span>조회 {item.auction.viewCount}</span>
                <span className="text-gray-300">|</span>
                <span>입찰 {item.biddingCount}</span>
            </div>

            {/* 5. 사용자 정보 (수정된 부분) */}
            <div className={'mt-2 flex items-center'}> {/* 마진(mt) 조절 */}
                {item.auction.user.profileUrl ? (
                    <img
                        src={item.auction.user.profileUrl}
                        alt={item.auction.user.nickname}
                        className={'w-6 h-6 rounded-full mr-2 object-cover'}
                    />
                ) : (
                    <UserIcon className={'w-6 h-6 text-[#BFA0A0] mr-2'} />
                )}
                <div>{item.auction.user.nickname}</div>
            </div>
        </div>
    );
};

export default HotAuctionItem;