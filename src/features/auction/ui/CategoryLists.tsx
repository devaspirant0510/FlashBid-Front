import { useQueryGetCategories } from '@/features/auction/lib';
import AuctionCategory from '@widgets/auction/AuctionCategory.tsx';
import React, { FC } from 'react';

type Props = {
    type: 'blind' | 'live';
};
const CategoryLists: FC<Props> = ({ type }) => {
    const { isLoading, data, isError, error } = useQueryGetCategories();
    if (isLoading) {
        return <>loading</>;
    }
    if (!data || !data.data) {
        return <>nodata</>;
    }
    if (isError) {
        return <>{error}</>;
    }

    return (
        <div className={'flex '}>
            <AuctionCategory type={type} category={data?.data!} />
        </div>
    );
};
export default CategoryLists;
