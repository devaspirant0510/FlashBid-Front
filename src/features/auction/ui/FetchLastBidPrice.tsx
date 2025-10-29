import React, { FC } from 'react';
import { useQueryLastBidPrice } from '@/features/auction/lib';

type Props = {
    id: number;
    children: (price: number) => React.ReactNode;
};
const FetchLastBidPrice: FC<Props> = ({ id, children }) => {
    const { data, isError } = useQueryLastBidPrice(id);
    // If error, show error (could be replaced by a UI-friendly element)
    if (isError) {
        return <>error</>;
    }
    // Call children with the numeric price. Treat `0` as a valid price.
    // While loading or if API returned no data, fall back to 0 so consumers always render.
    const price = data?.data ?? 0;
    return <>{children(price)}</>;
};

export default FetchLastBidPrice;
