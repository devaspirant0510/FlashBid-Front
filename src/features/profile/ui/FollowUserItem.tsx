import React, { useState, useRef, useEffect } from 'react';

interface User {
    id: number;
    nickname: string;
    profileUrl?: string;
}

interface FollowUserItemProps {
    user: User;
    type: 'followers' | 'followings';
}

export const FollowUserItem: React.FC<FollowUserItemProps> = ({ user, type }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    // 버튼 클릭 핸들러 (예시)
    const handleUnfollow = () => {
        alert(`${user.nickname} 팔로우 취소`);
        setDropdownOpen(false);
    };
    const handleTurnOffAlerts = () => {
        alert(`${user.nickname} 알림 끄기`);
        setDropdownOpen(false);
    };
    const handleViewSales = () => {
        alert(`${user.nickname} 판매 상품 보기`);
        setDropdownOpen(false);
    };
    const handleInviteAuction = () => {
        alert(`${user.nickname} 경매 초대하기`);
        setDropdownOpen(false);
    };
    const handleFollowBack = () => {
        alert(`${user.nickname} 맞팔로우`);
    };
    const handleRemoveFollower = () => {
        alert(`${user.nickname} 팔로워 제거`);
    };

    return (
        <div className='flex items-center justify-between py-2 px-4 border-b'>
            <div className='flex items-center space-x-3'>
                {user.profileUrl ? (
                    <img
                        src={user.profileUrl}
                        alt={`${user.nickname} 프로필`}
                        className='w-10 h-10 rounded-full object-cover'
                    />
                ) : (
                    <div className='w-10 h-10 bg-gray-300 rounded-full' />
                )}
                <span>{user.nickname}</span>
            </div>

            {type === 'followers' ? (
                <div className='flex items-center space-x-2'>
                    <button
                        onClick={handleFollowBack}
                        className='bg-orange-500 text-white px-4 py-1 rounded-md text-sm'
                    >
                        맞팔로우
                    </button>
                    <button
                        onClick={handleRemoveFollower}
                        className='text-gray-500 text-xl font-bold px-2 py-1'
                        aria-label='팔로워 제거'
                    >
                        ×
                    </button>
                </div>
            ) : (
                <div className='flex items-center space-x-3'>
                    <button className='bg-gray-300 px-3 py-1 rounded-md text-sm cursor-default'>
                        메시지
                    </button>
                    <div className='relative' ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className='text-xl font-bold px-2 py-1 focus:outline-none'
                            aria-label='설정 메뉴 열기'
                        >
                            ⋯
                        </button>
                        {dropdownOpen && (
                            <div className='absolute right-0 top-full mt-1 w-40 bg-white border rounded shadow-lg z-50'>
                                <button
                                    onClick={handleUnfollow}
                                    className='w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'
                                >
                                    팔로우 취소
                                </button>
                                <button
                                    onClick={handleTurnOffAlerts}
                                    className='w-full text-left px-4 py-2 hover:bg-gray-100'
                                >
                                    알림 끄기
                                </button>
                                <button
                                    onClick={handleViewSales}
                                    className='w-full text-left px-4 py-2 hover:bg-gray-100'
                                >
                                    판매 상품 보기
                                </button>
                                <button
                                    onClick={handleInviteAuction}
                                    className='w-full text-left px-4 py-2 hover:bg-gray-100'
                                >
                                    경매 초대하기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
