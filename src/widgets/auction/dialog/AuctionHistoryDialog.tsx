import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@shared/components/ui/dialog.tsx';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@shared/components/ui/table';
import { Button } from '@shared/components/ui/button';
import { useQueryGetAuctionHistory } from '@/features/auction/lib';
import { useParams } from 'react-router-dom';
import { ListCheckIcon } from 'lucide-react';
import { ProfileImage } from '@shared/ui';

const AuctionHistoryDialog = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState(0);
    const { data, isLoading, isError } = useQueryGetAuctionHistory(Number(id), page);

    const handleNextPage = () => {
        if (data && data.data?.length === 8) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        setPage(Math.max(0, page - 1));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='bg-white border-[#FFD1BE] border-solid border-1 flex justify-center items-center flex-col py-3 px-2 cursor-pointer'>
                    <div className='w-10 h-10 bg-[#FFD1BE] rounded-full flex justify-center items-center'>
                        <ListCheckIcon className={'text-[#FEFDFD] border-0.5 border-[#DADADA]'} />
                    </div>
                    <span className='text-xs mt-1'>경매 내역</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>경매 내역</DialogTitle>
                </DialogHeader>
                <div>
                    {isLoading && <p>로딩 중...</p>}
                    {isError && <p>에러가 발생했습니다.</p>}
                    {data && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>입찰자</TableHead>
                                    <TableHead>입찰 가격</TableHead>
                                    <TableHead>입찰 시간</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.data?.map((history) => (
                                    <TableRow key={history.id}>
                                        <TableCell>
                                            <div className={'flex items-center'}>
                                                <ProfileImage size={30} src={history.profileUrl} />
                                                <span className='ml-2'>{history.bidderName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{history.price.toLocaleString()}원</TableCell>
                                        <TableCell>
                                            {new Date(history.createdAt).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
                <DialogFooter className={'justify-between'}>
                    <div>
                        <Button onClick={handlePrevPage} disabled={page === 0}>
                            이전
                        </Button>
                        <Button
                            onClick={handleNextPage}
                            disabled={!data || data.data.length < 8}
                            className={'ml-2'}
                        >
                            다음
                        </Button>
                    </div>

                    <DialogClose asChild>
                        <Button type='button' variant='secondary'>
                            닫기
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AuctionHistoryDialog;
