import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import { ApiResult } from '@entities/common';
import { useParams } from 'react-router';
import { Header } from '@widgets/ui';
import { getTime } from '@pages/feed/getTime.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComment,
    faEllipsis,
    faExclamation,
    faHeart,
    faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import CommentInput from '@pages/feed/CommentInput.tsx';
import CommentList from '@pages/feed/CommentList.tsx';
import React, { useState } from 'react';
import { ProfileImage } from '@shared/ui';

interface User {
    nickname: string;
    profileUrl?: string;
}

interface Feed {
    id: number | string;
    contents: string;
    createdAt: string;
    user: User;
}

interface Image {
    url: string;
    fileName: string;
}

interface FeedWrapper {
    feed: Feed;
    images: Image[];
    commentCount: number;
    likeCount: number;
}

const FeedInfo = () => {
    const { id } = useParams();
    const [showComments, setShowComments] = useState(false);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['api', 'v1', 'feed', id],
        queryFn: httpFetcher<ApiResult<FeedWrapper>>,
    });

    if (isLoading) return <>loading</>;
    if (isError) return <>{error?.message || 'error'}</>;
    if (!data || !data.data) return <>nodata</>;

    const v = data.data;
    const feedId = Number(v.feed.id);

    return (
        <>
            <Header />
            <div className='min-h-screen w-full bg-[#F7F7F7] py-5'>
                <div className='max-w-[700px] mx-auto bg-white w-full rounded-xl shadow-md px-6 py-5'>
                    <div className='flex justify-between items-start mb-4'>
                        <div className='flex items-center'>
                            <ProfileImage src={v.feed.user.profileUrl} size={56} />
                            <div className='ml-3'>
                                <div className='font-semibold'>{v.feed.user.nickname}</div>
                                <div className='text-sm text-gray-400'>
                                    {getTime(v.feed.createdAt)}
                                </div>
                            </div>
                        </div>
                        <div className='text-right'>
                            <div className='text-sm text-gray-400'>
                                {new Date(v.feed.createdAt)
                                    .toISOString()
                                    .split('T')
                                    .join(' ')
                                    .slice(0, 19)}
                            </div>
                            <div className='relative top-3'>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='border-t border-gray-200'></div>
                        <div className='py-5'>{v.feed.contents}</div>
                        {v.images.length > 0 && (
                            <div className='flex flex-col gap-3 items-center my-3'>
                                {v.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={`${getServerURL()}${img.url}`}
                                        alt={img.fileName}
                                        className='h-60 rounded-md object-cover'
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='flex items-center justify-between text-gray-500 text-sm border-t pt-3'>
                        <div className='flex gap-3'>
                            <button
                                style={{ background: '#FFFFFF' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FontAwesomeIcon icon={faHeart} /> {v.likeCount}
                            </button>
                            <button
                                style={{ background: '#FFFFFF' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowComments((prev) => !prev);
                                }}
                            >
                                <FontAwesomeIcon icon={faComment} /> {v.commentCount}
                            </button>
                        </div>
                        <div className='flex gap-3'>
                            <button
                                style={{ background: '#FFFFFF' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FontAwesomeIcon icon={faShareNodes} />
                            </button>
                            <button
                                style={{ background: '#FFFFFF' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FontAwesomeIcon icon={faExclamation} />
                            </button>
                        </div>
                    </div>

                    {showComments && (
                        <div className='mt-4'>
                            <CommentInput feedId={feedId} />
                            <CommentList feedId={feedId} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FeedInfo;
