import { FC } from 'react';
import { getServerURL } from '@/shared/lib';
import { AuctionData } from '@entities/auction/model';

type Props = {
    item: AuctionData;
};

const MyBuysList: FC<Props> = ({ item }) => {
    const imageUrl =
        item.images && item.images.length > 0
            ? getServerURL() + item.images[0].url
            : '/img/default.png';

    return (
        <div>
            <div className='h-[160px] w-[160px] relative overflow-hidden rounded-md'>
                <img className='h-full w-full object-cover' src={imageUrl} alt='purchased product' />
            </div>

            <div>
                <div className='flex mt-2 flex-col items-start'>
                    {/* [유지] 경로는 item.auction.category.name으로 동일 */}
                    <div className='text-[12px] text-gray-500 font-semibold pr-1'>
                        [{item.auction.category.name}]
                    </div>
                    {/* [유지] 경로는 item.auction.goods.title로 동일 */}
                    <div className='text-[12px] text-black font-semibold pr-1 text-left'>
                        {item.auction.goods.title}
                    </div>
                    {/* [추가] 최종 낙찰가(currentPrice) 표시 */}
                    <div className='text-[13px] text-orange-600 font-bold pr-1 text-left mt-1'>
                        {item.currentPrice?.toLocaleString() || item.auction.startPrice.toLocaleString()}원
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBuysList;