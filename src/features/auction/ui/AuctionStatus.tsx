import React, { FC } from 'react';
import { useQueryGetAuctionById } from '@/features/auction/lib';
import { ClockIcon, UserIcon } from 'lucide-react';
import AuctionParticipantsDialog from '@widgets/auction/dialog/AuctionParticipantsDialog.tsx';
import { DateUtil } from '@shared/lib';

type Props = {
    auctionId: number;
};
const AuctionStatus: FC<Props> = ({ auctionId }) => {
    const { isLoading, data, isError, error } = useQueryGetAuctionById(auctionId);
    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>{error}</>;
    }
    if (!data || !data.data) {
        return <>no data</>;
    }
    return (
        <div className={'flex justify-between mb-2 mx-2'}>
            <div className={'flex text-[#BFA0A0] font-bold items-center gap-1'}>
                <ClockIcon size={'17px'} className={' text-[#BFA0A0]'} />
                <div>{DateUtil.timeUntilInfo(data.data.auction.endTime)}</div>
            </div>
            <AuctionParticipantsDialog auctionId={auctionId}>
                <div className={'flex text-[#BFA0A0] font-bold items-center gap-1'}>
                    {data.data.participateCount}
                    <UserIcon className={'text-xs text-[#BFA0A0]'} />
                </div>
            </AuctionParticipantsDialog>
        </div>
    );
};

export default AuctionStatus;
