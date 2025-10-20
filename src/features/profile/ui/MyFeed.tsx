import { FC, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getServerURL } from '@shared/lib';
import { FeedWrapper } from '@pages/feed/component/FeedList';

type Props = {
    feedData: FeedWrapper;
};

const MyFeed: FC<Props> = ({ feedData }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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

    const { feed, images, likeCount } = feedData;

    return (
        <div className='flex flex-col'>
            <div className='aspect-square w-full relative overflow-hidden rounded-md bg-gray-100'>
                {images && images.length > 0 ? (
                    <img
                        className='h-full w-full object-cover'
                        src={`${getServerURL()}${images[0].url}`}
                        alt='feed'
                    />
                ) : (
                    <div className='h-full w-full bg-gray-200 flex items-center justify-center'>
                        <span className='text-gray-500 text-sm'>No Image</span>
                    </div>
                )}

                <div
                    className='absolute top-2 right-2 cursor-pointer z-20 bg-black/30 rounded-full w-6 h-6 flex items-center justify-center'
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} className='text-white' size='sm'/>
                </div>

                {menuOpen && (
                    <div
                        className='absolute top-9 right-2 space-y-1 z-10'
                        ref={menuRef}
                    >
                        <div className='bg-white px-3 py-1 rounded-md text-gray-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100'>
                            수정
                        </div>
                        <div className='bg-white px-3 py-1 rounded-md text-red-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100'>
                            삭제
                        </div>
                    </div>
                )}
            </div>

            <div className='text-left mt-2'>
                <p className='text-[13px] text-black font-semibold text-left pr-1 truncate'>
                    {feed.contents}
                </p>
                <div className='text-[12px] text-gray-500 flex items-center mt-1'>
                    <FontAwesomeIcon icon={faHeart} className='mr-1 text-red-500' />
                    <span>{likeCount}</span>
                </div>
            </div>
        </div>
    );
};

export default MyFeed;
