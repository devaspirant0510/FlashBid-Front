// filepath: /Users/kotlinandnode/seungho/capstone/FlashBid-Front/src/widgets/user/UserPointTable.tsx
import React from 'react';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table';
import { Calendar } from 'lucide-react';

export type PointRecord = {
    createdAt: string;
    contents: string;
    earnedPoint: number;
    chargeType: string; // CHARGE | GIFT | PURCHASE | etc
};

export type ChargeTypeMeta = {
    label: string;
    icon: React.ReactNode;
    className: string; // badge class
};

type Props = {
    rows: PointRecord[];
    totalCount: number;
    formatDate: (dateString: string) => string;
    getChargeTypeInfo: (chargeType: string) => ChargeTypeMeta;
};

const UserPointTable: React.FC<Props> = ({ rows, totalCount, formatDate, getChargeTypeInfo }) => {
    return (
        <Card>
            <CardContent className='p-0'>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow className='bg-gradient-to-r from-uprimary to-uprimary/90'>
                                <TableHead className='text-white font-semibold'>
                                    <div className='flex items-center gap-2'>
                                        <Calendar className='w-4 h-4' />
                                        날짜
                                    </div>
                                </TableHead>
                                <TableHead className='text-white font-semibold'>내용</TableHead>
                                <TableHead className='text-white font-semibold text-right'>
                                    포인트
                                </TableHead>
                                <TableHead className='text-white font-semibold text-center'>
                                    구분
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='divide-y divide-gray-200'>
                            {rows.length > 0 ? (
                                rows.map((pointRecord, index) => {
                                    const isPositive =
                                        pointRecord.chargeType === 'CHARGE' ||
                                        pointRecord.chargeType === 'GIFT';
                                    const sign = isPositive ? '+' : '-';
                                    const typeInfo = getChargeTypeInfo(pointRecord.chargeType);

                                    return (
                                        <TableRow
                                            key={index}
                                            className='hover:bg-gray-50 transition-colors duration-200'
                                        >
                                            <TableCell className='font-medium text-gray-700'>
                                                <div className='space-y-1'>
                                                    <div className='text-sm'>
                                                        {formatDate(pointRecord.createdAt)}
                                                    </div>
                                                    <div className='text-xs text-gray-500'>
                                                        {new Date(
                                                            pointRecord.createdAt,
                                                        ).toLocaleTimeString('ko-KR', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='text-sm text-gray-800 font-medium'>
                                                    {pointRecord.contents}
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <span
                                                    className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                                                >
                                                    {sign}
                                                    {pointRecord.earnedPoint.toLocaleString()}P
                                                </span>
                                            </TableCell>
                                            <TableCell className='text-center'>
                                                <Badge
                                                    className={`${typeInfo.className} text-white flex items-center gap-1 justify-center w-fit mx-auto`}
                                                >
                                                    {typeInfo.icon}
                                                    {typeInfo.label}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : totalCount === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className='text-center py-16'>
                                        <div className='space-y-3'>
                                            <div className='text-6xl'>🥹</div>
                                            <div className='text-lg font-medium text-gray-600'>
                                                아직 포인트 내역이 없어요
                                            </div>
                                            <div className='text-sm text-gray-500'>
                                                포인트를 충전하거나 선물받으면 내역이 표시됩니다
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className='text-center py-16'>
                                        <div className='space-y-3'>
                                            <div className='text-4xl'>🔍</div>
                                            <div className='text-lg font-medium text-gray-600'>
                                                검색 결과가 없어요
                                            </div>
                                            <div className='text-sm text-gray-500'>
                                                다른 검색어나 필터를 사용해보세요
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserPointTable;
