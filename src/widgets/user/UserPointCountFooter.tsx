// filepath: /Users/kotlinandnode/seungho/capstone/FlashBid-Front/src/widgets/user/UserPointCountFooter.tsx
import React from 'react';

type Props = {
    total: number;
    visible: number;
};

const UserPointCountFooter: React.FC<Props> = ({ total, visible }) => {
    if (total <= 0) return null;
    return (
        <div className='text-center text-sm text-gray-500'>
            총 {total}개의 내역 중 {visible}개 표시
        </div>
    );
};

export default UserPointCountFooter;
