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
    return (
        <div className={'w-full'} onClick={onClickItem}>
            <div className='w-full aspect-square overflow-hidden'>
                <img
                    className='w-full h-full object-cover rounded-2xl'
                    src={item.images.length > 0 ? item.images[0].url : ''}
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
