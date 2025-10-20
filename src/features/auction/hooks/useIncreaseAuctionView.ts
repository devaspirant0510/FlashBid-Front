import { useEffect } from 'react';
import { axiosClient } from '@shared/lib';
import { toast } from 'react-toastify';

export const useIncreaseAuctionView = (auctionId: number) => {
    useEffect(() => {
        if (!auctionId) {
            return;
        }
        axiosClient
            .patch(`/api/v1/auction/views/${auctionId}`)
            .then()
            .catch((e) => {
                console.log(e);
            });
    }, [auctionId]);
};
