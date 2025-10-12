import React, { FC } from 'react';
import { BidLog } from '@entities/auction/model';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@shared/components/ui/table.tsx';
import ProfileImage from '@shared/ui/ProfileImage.tsx';

type Props = {
    data: BidLog[];
};
const BidHistoryTable: FC<Props> = ({ data }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>입찰자</TableHead>
                    <TableHead>입찰 가격</TableHead>
                    <TableHead>입찰 시간</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((history) => (
                    <TableRow key={history.id}>
                        <TableCell>
                            <div className={'flex items-center'}>
                                <ProfileImage size={30} src={history.profileUrl} />
                                <span className='ml-2'>{history.bidderName}</span>
                            </div>
                        </TableCell>
                        <TableCell>{history.price.toLocaleString()}p</TableCell>
                        <TableCell>{new Date(history.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BidHistoryTable;
