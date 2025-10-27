import { FC, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { getServerURL } from '@shared/lib';
import { FeedWrapper } from '@pages/feed/component/FeedList';
import { useNavigate } from 'react-router-dom';

type Props = {
    feedData: FeedWrapper;
};

const MyFeed: FC<Props> = ({ feedData }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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

    const { feed, images, likeCount, commentCount } = feedData;
    const feedId = feed.id;

    // 네비게이션 핸들러
    const handleNavigate = () => {
        navigate(`/FeedInfo/${feedId}`);
    };

    return (
        <div className='flex flex-col'>
            {/* 이미지 영역 */}
            <div className='aspect-square w-full relative overflow-hidden rounded-md bg-gray-100'>
                {images && images.length > 0 ? (
                    <img
                        className='h-full w-full object-cover cursor-pointer'
                        src={`${getServerURL()}${images[0].url}`}
                        alt='feed'
                        onClick={handleNavigate}
                    />
                ) : (
                    <div
                        className='h-full w-full bg-gray-200 flex items-center justify-center cursor-pointer'
                        onClick={handleNavigate}
                    >
                        <span className='text-gray-500 text-sm'>No Image</span>
                    </div>
                )}

                {/* 메뉴 버튼 */}
                <div
                    className='absolute top-2 right-2 cursor-pointer z-20 bg-black/30 rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/50'
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen((prev) => !prev);
                    }}
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} className='text-white' size='sm' />
                </div>

                {/* 드롭다운 메뉴 */}
                {menuOpen && (
                    <div
                        className='absolute top-9 right-2 space-y-1 z-30'
                        ref={menuRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='bg-white px-3 py-1 rounded-md text-gray-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100'>
                            수정
                        </div>
                        <button className='w-full bg-white px-3 py-1 rounded-md text-red-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100 disabled:opacity-50'>
                            삭제
                        </button>
                    </div>
                )}
            </div>

            {/* 텍스트 정보 영역 */}
            <div className='text-left mt-2'>
                <p
                    className='text-[13px] text-black font-semibold text-left pr-1 truncate cursor-pointer'
                    title={feed.contents}
                    onClick={handleNavigate}
                >
                    {feed.contents}
                </p>
                <div className='text-[12px] text-gray-500 flex items-center space-x-3 mt-1'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faHeart} className='mr-1 text-red-500' />
                        <span>{likeCount}</span>
                    </div>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faComment} className='mr-1' />
                        <span>{commentCount ?? 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyFeed;