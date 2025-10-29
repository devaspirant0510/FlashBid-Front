import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosClient, getServerURL, httpFetcher } from '@shared/lib';
import { ApiResult } from '@entities/common';
import { useNavigate } from 'react-router';
import { faComment, faExclamation, faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTime } from '@pages/feed/getTime.ts';
import CommentInput from '@pages/feed/CommentInput.tsx';
import CommentList from '@pages/feed/CommentList.tsx';
import { ProfileImage } from '@shared/ui';
import { useAuthStore } from '@shared/store/AuthStore.ts';
import { EditModal } from '@pages/feed/component/EditModal.tsx';
import { toast } from 'react-toastify';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/shared/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { Pencil, Trash2 } from 'lucide-react';

interface User {
    nickname: string;
    profileUrl?: string;
    id?: number; // 추가: 사용자 ID 사용 라인과 타입 일치
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

export interface FeedWrapper {
    feed: Feed;
    images: Image[];
    commentCount: number;
    likeCount: number;
    liked?: boolean; // 추가: API 응답에 존재 가능
    isLiked?: boolean; // 추가: 기존 코드에서 참조함
}

const FeedList = () => {
    const queryClient = useQueryClient();
    const { getUserAuth } = useAuthStore();

    const { isLoading, isError, data, error } = useInfiniteQuery({
        queryKey: ['api', 'v1', 'feed', 'test-all'],
        queryFn: httpFetcher<ApiResult<FeedWrapper[]>>,
    });

    const navigate = useNavigate();
    const [commentVisibleMap, setCommentVisibleMap] = useState<{ [key: number]: boolean }>({});
    const [dynamicCommentCounts, setDynamicCommentCounts] = useState<{ [key: number]: number }>({});
    const [likeStatusMap, setLikeStatusMap] = useState<{
        [key: number]: { isLiked: boolean; count: number };
    }>({});
    const [likeLoadingMap, setLikeLoadingMap] = useState<{ [key: number]: boolean }>({});

    // 수정 모달 관련
    const [editingFeedId, setEditingFeedId] = useState<number | null>(null);
    const [editingFeedData, setEditingFeedData] = useState<FeedWrapper | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const toggleComment = (feedId: number) => {
        setCommentVisibleMap((prev) => ({ ...prev, [feedId]: !prev[feedId] }));
    };

    useEffect(() => {
        if (data?.data) {
            const commentCounts: { [key: number]: number } = {};
            const likeStatus: { [key: number]: { isLiked: boolean; count: number } } = {};

            data.data.forEach((item) => {
                commentCounts[Number(item.feed.id)] = item.commentCount;
                const computedLiked = item.liked ?? item.isLiked ?? false;
                likeStatus[Number(item.feed.id)] = {
                    isLiked: computedLiked,
                    count: item.likeCount,
                };
            });

            setDynamicCommentCounts(commentCounts);
            setLikeStatusMap(likeStatus);
        }
    }, [data]);

    // 첫 로드 시 현재 사용자 ID 가져오기
    useEffect(() => {
        const userAuth = getUserAuth();
        if (userAuth?.id) {
            console.log('✅ Current User ID:', userAuth.id);
            setCurrentUserId(userAuth.id);
        } else {
            console.log('⚠️ User Auth not found');
        }
    }, [getUserAuth]);

    const handleLikeToggle = async (feedId: number) => {
        const currentStatus = likeStatusMap[feedId];
        if (!currentStatus || likeLoadingMap[feedId]) return;

        setLikeLoadingMap((prev) => ({ ...prev, [feedId]: true }));

        try {
            await axiosClient.patch(`${getServerURL()}/api/v1/feed/${feedId}/like`);

            await queryClient.refetchQueries({
                queryKey: ['api', 'v1', 'feed', 'test-all'],
                type: 'active',
            });
        } catch (error: any) {
            console.error('좋아요 처리 에러:', error);
            alert(error.response?.data?.message || '좋아요 처리 중 오류가 발생했습니다.');
        } finally {
            setLikeLoadingMap((prev) => ({ ...prev, [feedId]: false }));
        }
    };

    const handleEditClick = (feedData: FeedWrapper) => {
        setEditingFeedId(Number(feedData.feed.id));
        setEditingFeedData(feedData);
    };

    const handleDeleteClick = (feedId: number) => {
        if (window.confirm('이 글을 삭제하시겠습니까?')) {
            handleDeleteFeed(feedId);
        }
    };

    const handleDeleteFeed = async (feedId: number) => {
        try {
            await axiosClient.delete(`${getServerURL()}/api/v1/feed/${feedId}`);
            toast('글이 삭제되었습니다.');
            queryClient.invalidateQueries({
                queryKey: ['api', 'v1', 'feed', 'test-all'],
            });
        } catch (error: any) {
            console.error('삭제 에러:', error);
            alert(error.response?.data?.message || '삭제 중 오류가 발생했습니다.');
        }
    };

    if (isLoading) return <>loading</>;
    if (isError) return <>{(error as any)?.message || 'error'}</>;
    if (!data || !data.data) return <>nodata</>;

    return (
        <div className=' flex flex-col items-center gap-2 mt-8'>
            {editingFeedId && editingFeedData && (
                <EditModal
                    feedId={editingFeedId}
                    initialContent={editingFeedData.feed.contents}
                    initialImages={editingFeedData.images}
                    onClose={() => {
                        setEditingFeedId(null);
                        setEditingFeedData(null);
                    }}
                />
            )}

            {data.data.map((v) => {
                const feedId = Number(v.feed.id);
                const isVisible = commentVisibleMap[feedId] ?? false;
                const commentCount = dynamicCommentCounts[feedId] ?? v.commentCount;

                const likeStatus = likeStatusMap[feedId] ?? {
                    isLiked: v.isLiked,
                    count: v.likeCount,
                };
                const isLikeLoading = likeLoadingMap[feedId] ?? false;
                const isAuthor =
                    currentUserId !== null &&
                    v.feed.user.id !== undefined &&
                    currentUserId === v.feed.user.id;

                console.log(`📝 Feed ${feedId}:`, {
                    currentUserId,
                    feedUserId: v.feed.user.id,
                    isAuthor,
                });

                return (
                    <div
                        key={feedId}
                        className='bg-white w-full rounded-xl shadow-md px-6 py-5 mt-2 '
                        style={{ border: '1px solid #bababa80' }}
                    >
                        <div className='flex items-start justify-between mb-2'>
                            <div className='flex items-center'>
                                <ProfileImage
                                    src={v.feed.user.profileUrl}
                                    size={48}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // 사용자 ID가 존재하면 프로필 페이지로 이동
                                        if (v.feed.user.id) {
                                            navigate(`/users/${v.feed.user.id}`);
                                        }
                                    }}
                                    style={{ cursor: v.feed.user.id ? 'pointer' : 'default' }}
                                />
                                <div className='ml-3'>
                                    <div className='font-semibold'>{v.feed.user.nickname}</div>
                                    <div className='text-sm text-gray-400'>
                                        {getTime(v.feed.createdAt)}
                                    </div>
                                </div>
                            </div>
                            {isAuthor && (
                                <div className='flex items-center'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className='p-2 rounded-md hover:bg-gray-100 transition text-gray-600'
                                                aria-label='글 옵션'
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreVertical className='w-5 h-5' />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            side='left'
                                            align='start'
                                            sideOffset={2}
                                            className='min-w-[8rem]'
                                        >
                                            <DropdownMenuItem
                                                className='justify-center gap-2'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(v);
                                                }}
                                            >
                                                <Pencil className='w-4 h-4' />
                                                <span>수정하기</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className='justify-center gap-2 text-red-600 focus:text-red-700'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(feedId);
                                                }}
                                            >
                                                <Trash2 className='w-4 h-4' />
                                                <span>삭제하기</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                        </div>
                        <div onClick={() => navigate(`/FeedInfo/${feedId}`)}>
                            <div className='text-gray-800 leading-relaxed mb-4 whitespace-pre-line'>
                                {v.feed.contents}
                            </div>
                            {v.images.length > 0 && (
                                <div className='flex items-center gap-2 overflow-x-auto mb-3'>
                                    {v.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={`${img.url}`}
                                            alt={img.fileName}
                                            className='h-60 rounded-md object-cover border border-gray-200'
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='flex items-center justify-between text-gray-500 text-sm border-t pt-3'>
                            <div className='flex gap-3'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLikeToggle(feedId);
                                    }}
                                    disabled={isLikeLoading}
                                    className={`transition ${
                                        likeStatus.isLiked
                                            ? 'text-red-500'
                                            : 'text-gray-500 hover:text-red-400'
                                    } disabled:opacity-50`}
                                >
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        style={{
                                            color: likeStatus.isLiked ? '#ef4444' : 'inherit', // Tailwind의 red-500
                                        }}
                                    />{' '}
                                    {likeStatus.count}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleComment(feedId);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faComment} /> {commentCount}
                                </button>
                            </div>
                            <div className='flex gap-3'>
                                <button onClick={(e) => e.stopPropagation()}>
                                    <FontAwesomeIcon icon={faShareNodes} />
                                </button>
                                <button onClick={(e) => e.stopPropagation()}>
                                    <FontAwesomeIcon icon={faExclamation} />
                                </button>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <CommentInput feedId={feedId} />
                        </div>

                        {isVisible && <CommentList feedId={feedId} />}
                    </div>
                );
            })}
        </div>
    );
};

export default FeedList;
