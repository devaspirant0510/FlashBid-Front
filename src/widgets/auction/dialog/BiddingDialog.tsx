import React, { FC, useCallback, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@shared/components/ui/dialog.tsx';
import { GavelIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { useAuthUser } from '@shared/hooks/useAuthUser.tsx';
import { Client } from 'stompjs';
import { AuctionInfo } from '@/features/auction/ui';
import { useQueryGetAuctionById } from '@/features/auction/lib';
import { Input } from '@shared/components/ui/input.tsx';
import { Button } from '@shared/components/ui/button.tsx';
import useInput from '@shared/hooks/useInput.ts';
import { axiosClient } from '@shared/lib';

type Params = {
    id: number;
};
type Props = {
    client: Client;
};
const BiddingDialog: FC<Props> = ({ client }) => {
    const { id: auctionId } = useParams<Params>();
    const [userNickname, userId] = useAuthUser();
    const [open, setOpen] = useState(false);
    const { isLoading, isError, error, data } = useQueryGetAuctionById(auctionId!);
    const [value, onChange, setValue] = useInput({ initialValue: '' });
    const onClickBid = useCallback(() => {
        const jsondata = {
            contents: value,
            nickname: userNickname,
            userId: userId,
            bid: {
                price: value,
                prevPrice: data?.data?.currentPrice
                    ? data.data.currentPrice
                    : data?.data?.auction.startPrice,
            },
        };
        client.publish({
            destination: '/app/chat/send/' + auctionId,
            body: JSON.stringify(jsondata),
        });
        setOpen(false);
        setValue('');
    }, [value, data]);
    if (isLoading) {
        return <>loading</>;
    }
    if (isError) {
        return <>error</>;
    }
    if (!data || !data.data) {
        return <>nodata</>;
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div
                    className={
                        'bg-white border-[#FFD1BE] border-solid border-1 flex justify-center items-center flex-col py-3 px-2 rounded-b-2xl'
                    }
                >
                    <div
                        className={
                            'w-10 h-10 bg-[#FFD1BE] rounded-full flex justify-center items-center '
                        }
                    >
                        <GavelIcon className={'text-[#FEFDFD] border-0.5 border-[#DADADA]'} />
                    </div>
                    <span className={'text-xs mt-1'}>입찰하기</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className={'flex'}>
                            <img
                                className={'object-cover w-24 h-24 rounded-lg'}
                                width={50}
                                height={50}
                                src={import.meta.env.VITE_SERVER_URL + data.data.images[0].url}
                            />
                            <div>
                                <div>{data.data.auction.goods.title}</div>
                                <div>{data.data.auction.goods.description}</div>
                            </div>
                        </div>
                        <div className={'flex'}>
                            <span>현재 가격</span>
                            <div>
                                {data.data.currentPrice
                                    ? data.data.currentPrice.toLocaleString()
                                    : data.data.auction.startPrice.toLocaleString()}
                                p
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        <Input type={'number'} value={value} onChange={onChange} />
                        <Button onClick={onClickBid}>입찰하기</Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default BiddingDialog;
