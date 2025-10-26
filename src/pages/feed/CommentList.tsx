import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTime } from '@pages/feed/getTime.ts';
import CommentReplyInput from '@pages/feed/CommentReplyInput.tsx';
import { axiosClient, getServerURL, httpFetcher } from '@shared/lib';

interface Comment {
    id: number;
    contents: string;
    user: { nickname: string };
    createdAt: string;
    reply?: Comment;
}

const fetchReplies = async (commentId: number): Promise<Comment[]> => {
    const res = await axiosClient(`${getServerURL()}/api/v1/feed/comment/reply/${commentId}`);
    console.log(res.data);
    return res.data.data;
};

const CommentList = ({ feedId }: { feedId: number }) => {
    const {
        data: comments,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['api', 'v1', 'feed', 'comment', feedId, 'root'],
        queryFn: httpFetcher,
    });
    const [replyInputVisibleMap, setReplyInputVisibleMap] = useState<{ [key: number]: boolean }>(
        {},
    );
    const [repliesVisibleMap, setRepliesVisibleMap] = useState<{ [key: number]: boolean }>({});
    const [repliesMap, setRepliesMap] = useState<{ [key: number]: Comment[] }>({});

    const toggleReplyInput = (commentId: number) => {
        setReplyInputVisibleMap((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const toggleReplies = async (commentId: number) => {
        if (!repliesMap[commentId]) {
            const replies = await fetchReplies(commentId);
            setRepliesMap((prev) => ({ ...prev, [commentId]: replies }));
        }
        setRepliesVisibleMap((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    if (isLoading) return <div>댓글 로딩 중...</div>;

    return (
        <div className='mt-4 space-y-2'>
            {comments && comments.data.length > 0 ? (
                comments.data.map((comment) => (
                    <div key={comment.id} className='p-2 border rounded-md bg-gray-50'>
                        <div className='text-sm font-semibold'>{comment.user.nickname}</div>
                        <div className='text-gray-700'>{comment.contents}</div>
                        <div className='flex items-center gap-2 mt-1'>
                            <div className='text-xs text-gray-400'>
                                {getTime(comment.createdAt)}
                            </div>
                            <button
                                onClick={() => toggleReplyInput(comment.id)}
                                className='text-xs text-gray-600'
                            >
                                답글
                            </button>
                        </div>
                        <button
                            onClick={() => toggleReplies(comment.id)}
                            className='text-xs text-blue-500'
                        >
                            {'     '}답글 보기
                        </button>

                        {replyInputVisibleMap[comment.id] && (
                            <CommentReplyInput
                                feedId={feedId}
                                commentId={comment.id}
                                onReplyPosted={refetch}
                            />
                        )}

                        {repliesVisibleMap[comment.id] && repliesMap[comment.id] && (
                            <div className='ml-4 mt-2 space-y-1'>
                                {repliesMap[comment.id].map((reply) => (
                                    <div key={reply.id} className='p-2 bg-white border rounded-md'>
                                        <div className='text-xs font-semibold'>
                                            {reply.user.nickname}
                                        </div>
                                        <div className='text-gray-600 text-sm'>
                                            {reply.contents}
                                        </div>
                                        <div className='text-xs text-gray-400 mt-1'>
                                            {getTime(reply.createdAt)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div>댓글이 없습니다.</div>
            )}
        </div>
    );
};

export default CommentList;
