// src/pages/feed/CommentReplyInput.tsx

import { useState } from 'react';
import { axiosClient, getServerURL } from '@shared/lib';

interface Props {
    feedId: number;
    commentId: number;
    onReplyPosted?: () => void;
}

const CommentReplyInput = ({ feedId, commentId, onReplyPosted }: Props) => {
    const [contents, setContents] = useState('');

    const handleSubmit = async () => {
        if (!contents.trim()) {
            alert('대댓글을 입력하세요.');
            return;
        }

        try {
            const res = await axiosClient.post(
                `${getServerURL()}/api/v1/feed/comment`,
                JSON.stringify({
                    contents,
                    commentId,
                    feedId,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } as any,
            );
            setContents('');
            alert('대댓글이 등록되었습니다.');
            onReplyPosted?.();
        } catch (err: any) {
            alert(err.message || '에러 발생');
        }
    };

    return (
        <div className='mt-2 flex items-center'>
            <input
                type='text'
                placeholder='답글 작성하기'
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className='w-full rounded-[8px] border border-gray-300 rounded px-3 py-1 text-sm text-gray-600 '
            />
            <button
                className='px-2 py-1 text-black rounded text-sm font-semibold whitespace-nowrap leading-normal bg-transparent'
                onClick={handleSubmit}
            >
                등록
            </button>
        </div>
    );
};

export default CommentReplyInput;
