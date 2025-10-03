import React, { FC } from 'react';
import { AuctionData } from '@entities/auction/model';
import { UserIcon } from 'lucide-react';
import { getServerURL } from '@shared/lib';

type Props = {
    item: AuctionData;
};
const HotAuctionItem: FC<Props> = ({ item }) => {
    return (
        <div className={'w-full'}>
            <div className='w-full aspect-square overflow-hidden'>
                <img
                    className='w-full h-full object-cover rounded-2xl'
                    src={getServerURL() + item.images[0].url}
                    alt=''
                />
            </div>
            <div className={'truncate w-64'}>
                <div className={'truncate w-full text-[#565656] text-lg'}>
                    {item.auction.goods.title}
                </div>
            </div>
            <div className={'mt-4 flex'}>
                <UserIcon className={'text-xs text-[#BFA0A0]'} />
                <div>{item.auction.user.nickname}</div>
            </div>
        </div>
    );
};

export default HotAuctionItem;
