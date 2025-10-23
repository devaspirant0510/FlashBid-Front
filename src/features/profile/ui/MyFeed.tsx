// profile/ui/MyFeed.tsx
import { FC, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { getServerURL } from '@shared/lib';
import { FeedWrapper } from '@pages/feed/component/FeedList';
import { useNavigate } from 'react-router-dom'; // [추가]

type Props = {
    feedData: FeedWrapper;
};

const MyFeed: FC<Props> = ({ feedData }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate(); // [추가]

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
    const feedId = feed.id; // [추가]

    // [추가] 네비게이션 핸들러
    const handleNavigate = () => {
        // FeedList.tsx에서 사용하는 경로와 일치시킵니다.
        navigate(`/FeedInfo/${feedId}`);
    };

    return (
        <div className='relative aspect-square w-full overflow-hidden rounded-lg shadow-sm group'>
            {/* 1. 이미지 (배경) - [수정] onClick과 cursor-pointer 추가 */}
            {images && images.length > 0 ? (
                <img
                    className='h-full w-full object-cover cursor-pointer'
                    src={`${getServerURL()}${images[0].url}`}
                    alt='feed'
                    onClick={handleNavigate} // [추가]
                />
            ) : (
                <div
                    className='h-full w-full bg-gray-200 flex items-center justify-center cursor-pointer'
                    onClick={handleNavigate} // [추가]
                >
                    <span className='text-gray-500 text-sm'>No Image</span>
                </div>
            )}

            {/* 2. 상단 '...' 메뉴 - [수정] e.stopPropagation() 추가 */}
            <div
                className='absolute top-2 right-2 cursor-pointer z-20 bg-black/30 rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/50'
                onClick={(e) => {
                    e.stopPropagation(); // [중요] 네비게이션 방지
                    setMenuOpen((prev) => !prev);
                }}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} className='text-white' size='sm' />
            </div>

            {/* 3. '...' 메뉴 클릭 시 드롭다운 - [수정] e.stopPropagation() 추가 */}
            {menuOpen && (
                <div
                    className='absolute top-9 right-2 space-y-1 z-30'
                    ref={menuRef}
                    onClick={(e) => e.stopPropagation()} // [중요] 네비게이션 방지
                >
                    <div
                        className='bg-white px-3 py-1 rounded-md text-gray-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100'
                        // onClick={handleEdit} // (보류된 기능)
                    >
                        수정
                    </div>
                    <button
                        className='w-full bg-white px-3 py-1 rounded-md text-red-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100 disabled:opacity-50'
                        // onClick={handleDelete} // (보류된 기능)
                    >
                        삭제
                    </button>
                </div>
            )}

            {/* 4. [수정] 하단 오버레이 (클릭 가능하게) */}
            <div
                className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white cursor-pointer'
                onClick={handleNavigate} // [추가]
            >
                <p className='text-sm font-semibold truncate' title={feed.contents}>
                    {feed.contents}
                </p>
                <div className='text-xs flex items-center space-x-3 mt-1 opacity-80'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faHeart} className='mr-1' />
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