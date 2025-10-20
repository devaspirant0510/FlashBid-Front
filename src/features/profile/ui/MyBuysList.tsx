import { FC } from 'react';
import { getServerURL } from '@/shared/lib';
import { ConfirmedBidsEntity } from '@entities/auction/model';

type Props = {
    item: ConfirmedBidsEntity;
};

const MyBuysList: FC<Props> = ({ item }) => {
    // auction.goods.images 배열에서 이미지 URL을 가져옵니다.
    const imageUrl =
        item.auction.goods.images && item.auction.goods.images.length > 0
            ? getServerURL() + item.auction.goods.images[0]
            : '/img/default.png'; // 기본 이미지

    return (
        <div>
            <div className='h-[160px] w-[160px] relative overflow-hidden rounded-md'>
                <img className='h-full w-full object-cover' src={imageUrl} alt='purchased product' />
            </div>

            <div>
                <div className='flex mt-2 flex-col items-start'>
                    <div className='text-[12px] text-gray-500 font-semibold pr-1'>
                        [{item.auction.category.name}]
                    </div>
                    <div className='text-[12px] text-black font-semibold pr-1 text-left'>
                        {item.auction.goods.title}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBuysList;

