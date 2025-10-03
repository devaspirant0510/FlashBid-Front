import { FC } from 'react';
import { useQueryGetAuctionById } from '@/features/auction/lib';
import { getServerURL } from '@shared/lib';

type Props = {
    id: number;
};

const MyPostProduct: FC<Props> = ({ id }) => {
    const { isLoading, isError, data } = useQueryGetAuctionById(id);

    if (isLoading) return <>로딩 중...</>;
    if (isError || !data?.data) return <>데이터 오류</>;

    const product = data.data;

    return (
        <div>
            <div className='h-[160px] w-[160px] relative overflow-hidden'>
                <img
                    className='h-full w-full object-cover'
                    src={`${getServerURL()}` + data.data.images[0].url}
                />
            </div>

            <div>
                <div className='flex mt-2'>
                    <div className='text-[12px] text-black font-semibold text-left pr-1'>
                        {/*<span>[{product.goods.category}]</span>*/}
                        [카테고리]
                        <span>{product.auction.goods.title}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPostProduct;
