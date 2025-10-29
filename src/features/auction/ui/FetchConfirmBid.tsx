import React, { forwardRef, useEffect } from 'react';
import { useQueryConfirmedBid } from '@/features/auction/lib';
import { ConfirmedBid } from '@entities/auction/model';

type Props = {
    auctionId: number;
    children: (data: ConfirmedBid) => React.ReactNode;
};
const FetchConfirmBid = forwardRef<HTMLDivElement, Props>(({ auctionId, children }, ref) => {
    const { isLoading, isError, data } = useQueryConfirmedBid(auctionId);

    // When data is ready and this wrapper is mounted, scroll it into view
    useEffect(() => {
        if (!data || !data.data) return;
        const el = (ref as React.RefObject<HTMLDivElement> | null)?.current;
        if (el) {
            // wait for paint to ensure layout is ready
            requestAnimationFrame(() => {
                // No animation: jump to element immediately
                el.scrollIntoView({ block: 'end', inline: 'nearest' });
            });
        }
    }, [data, ref]);

    if (isLoading) {
        return <></>;
    }
    if (isError) {
        return <>error</>;
    }
    if (!data || !data?.data) {
        return <>nodata</>;
    }
    return <div ref={ref}>{children(data.data)}</div>;
});

export default FetchConfirmBid;
