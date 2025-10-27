import { useState } from 'react';
import { axiosClient, getServerURL } from '@shared/lib';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    feedId: number;
    commentId: number;
    onReplyPosted?: () => void;
}

const CommentReplyInput = ({ feedId, commentId, onReplyPosted }: Props) => {
    const [contents, setContents] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const queryClient = useQueryClient();

    const handleSubmit = async () => {
        if (!contents.trim()) {
            alert('대댓글을 입력하세요.');
            return;
        }

        setIsLoading(true);

        try {
            await axiosClient.post(
                `${getServerURL()}/api/v1/feed/comment`,
                {
                    contents,
                    commentId,
                    feedId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setContents('');

            // ✅ 해당 댓글의 답글 목록 캐시 무효화
            queryClient.invalidateQueries({
                queryKey: ['replies', commentId],
            });

            alert('대댓글이 등록되었습니다.');
            onReplyPosted?.();
        } catch (err: any) {
            console.error('대댓글 등록 에러:', err);
            alert(err.response?.data?.message || '대댓글 등록에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='mt-2 flex items-center gap-2'>
            <input
                type='text'
                placeholder='답글 작성하기'
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
                className='flex-1 rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-1 focus:ring-orange-400'
                disabled={isLoading}
            />
            <button
                className='px-3 py-1 text-white rounded text-sm font-semibold whitespace-nowrap bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 transition'
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? '중...' : '등록'}
            </button>
        </div>
    );
};

export default CommentReplyInput;