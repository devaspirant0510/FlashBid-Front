import React, { FC } from 'react';
import { Card, CardContent } from '@shared/components/ui/card.tsx';
import { Skeleton } from '@shared/components/ui/skeleton.tsx';

const AuctionItemSkeleton: FC = () => {
    return (
        <Card className='my-4'>
            <CardContent className='flex'>
                {/* Left image */}
                <div className='pr-4'>
                    <Skeleton className='w-48 h-48 rounded-xl' />
                </div>

                {/* Middle text */}
                <div className='ml-4 flex flex-col gap-2 justify-between flex-grow'>
                    <Skeleton className='w-24 h-4' />
                    <Skeleton className='w-3/4 h-6' />
                    <Skeleton className='w-1/2 h-4' />
                    <Skeleton className='w-36 h-6' />
                    <Skeleton className='w-2/3 h-4' />
                    <div className='flex items-center gap-2'>
                        <Skeleton className='w-10 h-4' />
                        <Skeleton className='w-16 h-4' />
                    </div>
                </div>

                {/* Right icons + button */}
                <div className='flex flex-col justify-between items-center h-48 w-40'>
                    <div className='flex flex-col gap-3 items-center'>
                        <div className='flex items-center gap-2'>
                            <Skeleton className='w-6 h-6 rounded-full' />
                            <Skeleton className='w-8 h-4' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Skeleton className='w-6 h-6 rounded-full' />
                            <Skeleton className='w-8 h-4' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Skeleton className='w-6 h-6 rounded-full' />
                            <Skeleton className='w-8 h-4' />
                        </div>
                    </div>

                    <div className='w-full flex justify-center'>
                        <Skeleton className='w-28 h-9 rounded-full' />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AuctionItemSkeleton;
