import React, { FC, useEffect, useRef, useState } from 'react';
import { useQueryGetAuctionById } from '@/features/auction/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEye } from '@fortawesome/free-solid-svg-icons';
import { getServerURL } from '@shared/lib';

type Props = {
    id: number;
};

const MyFeed: FC<Props> = ({ id }) => {
    const { isLoading, isError, data } = useQueryGetAuctionById(id);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null); // 메뉴 참조

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    if (isLoading) return <>로딩 중...</>;
    if (isError || !data?.data) return <>데이터 오류</>;

    const product = data.data;

    return (
        <div>
            <div className='h-[200px] w-[200px] relative overflow-hidden rounded-md'>
                <img
                    className='h-full w-full object-cover'
                    src={`${getServerURL()}` + product.images[0].url}
                    alt='product'
                />

                {/* 더보기 아이콘 */}
                <div
                    className='absolute top-2 right-3 cursor-pointer z-20'
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <span className='text-[#ED6C37]'>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </span>
                </div>

                {/* 수정/삭제 메뉴 */}
                {menuOpen && (
                    <div
                        className='absolute top-10 right-3 space-y-1 z-10'
                        ref={menuRef} // 참조 연결
                    >
                        <div className='bg-white px-3 py-1 rounded-md text-gray-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100'>
                            수정
                        </div>
                        <div className='bg-white px-3 py-1 rounded-md text-gray-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100'>
                            삭제
                        </div>
                    </div>
                )}
            </div>

            <div>
                <div className='flex justify-between mt-2'>
                    <div className='text-[12px] text-black font-semibold text-left pr-1'>
                        [카테고리]
                    </div>
                    <div className='text-[10px] text-[#ED6C37] flex'>
                        <FontAwesomeIcon icon={faEye} className='mr-1 mt-1' />
                        <span>{product.auction.viewCount || 196}</span>
                    </div>
                </div>
                <div className='text-[12px] text-black font-semibold text-left pb-2 pr-1'>
                    <span>{product.auction.goods.title}</span>
                </div>
            </div>
        </div>
    );
};

export default MyFeed;
