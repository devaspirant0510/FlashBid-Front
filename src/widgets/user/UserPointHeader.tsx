// filepath: /Users/kotlinandnode/seungho/capstone/FlashBid-Front/src/widgets/user/UserPointHeader.tsx
import React from 'react';

type Props = {
    title?: string;
    description?: string;
};

const UserPointHeader: React.FC<Props> = ({
    title = '포인트 내역',
    description = '나의 포인트 사용 및 충전 내역을 확인해보세요',
}) => {
    return (
        <div className='text-center space-y-2'>
            <h1 className='text-4xl font-bold text-udark'>{title}</h1>
            <p className='text-gray-600'>{description}</p>
        </div>
    );
};

export default UserPointHeader;
