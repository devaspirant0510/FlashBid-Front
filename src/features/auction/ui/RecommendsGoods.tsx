import React, { FC } from 'react';
import FetchRecommendAuctions from '@/features/auction/ui/FetchRecommendAuctions.tsx';
import { ProfileImage } from '@shared/ui';
import { getServerURL } from '@shared/lib';

type Props = {
    id: number;
};
const RecommendsGoods: FC<Props> = ({ id }) => {
    return (
        <div>
            <div className='flex items-center my-4'>
                <div className='flex-grow border-t border-uprimary border-2'></div>
                <span className='px-4 text-uprimary text-xl'>다른 경매상품</span>
                <div className='flex-grow border-t border-uprimary border-2'></div>
            </div>

            <FetchRecommendAuctions id={id}>
                {(data) => (
                    <div className='flex flex-wrap'>
                        {data.map((auction) => (
                            <div key={auction.auction.id} className='basis-1/3 p-4 flex-shrink-0'>
                                <div className='bg-white shadow rounded-lg p-6 h-full'>
                                    <h3 className='text-lg font-semibold mb-2'>
                                        {auction.auction.goods.title}
                                    </h3>
                                    <p className='text-gray-600 mb-4'>
                                        {auction.auction.goods.description}
                                    </p>
                                    <img
                                        src={auction?.images?.[0]?.url}
                                        className='w-full aspect-square object-cover rounded-md mb-4'
                                    />
                                    <p className='text-gray-800 font-bold'>
                                        시작가격 {auction.auction.startPrice.toLocaleString()}p
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </FetchRecommendAuctions>
        </div>
    );
};

export default RecommendsGoods;
