import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTime } from "@pages/feed/getTime.ts";
import CommentReplyInput from "@pages/feed/CommentReplyInput.tsx";

interface Comment {
    id: number;
    contents: string;
    user: { nickname: string };
    createdAt: string;
    reply?: Comment;
}

const fetchComments = async (feedId: number): Promise<Comment[]> => {
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0OTQ4MTM5OSwiZXhwIjoxNzgxMDE3Mzk5LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoic2V1bmdobzAyMDUxMEBnbWFpbC5jb20iLCJyb2xlIjoidG9wIGdhcCJ9.hQVu0R5rxhOiJYHsdLqvkZ5bQMvOZifwKruQkvNa08Y";
    const res = await fetch(`http://172.27.226.250:8080/api/v1/feed/comment/${feedId}/root`, {
        headers: { Authorization: token },
    });
    const json = await res.json();
    return json.data;
};

const fetchReplies = async (commentId: number): Promise<Comment[]> => {
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0OTQ4MTM5OSwiZXhwIjoxNzgxMDE3Mzk5LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoic2V1bmdobzAyMDUxMEBnbWFpbC5jb20iLCJyb2xlIjoidG9wIGdhcCJ9.hQVu0R5rxhOiJYHsdLqvkZ5bQMvOZifwKruQkvNa08Y";
    const res = await fetch(`http://172.27.226.250:8080/api/v1/feed/comment/reply/${commentId}`, {
        headers: { Authorization: token },
    });
    const json = await res.json();
    return json.data;
};

const CommentList = ({ feedId }: { feedId: number }) => {
    const { data: comments, isLoading, refetch } = useQuery({
        queryKey: ["comments", feedId],
        queryFn: () => fetchComments(feedId),
        enabled: !!feedId,
    });

    const [replyInputVisibleMap, setReplyInputVisibleMap] = useState<{ [key: number]: boolean }>({});
    const [repliesVisibleMap, setRepliesVisibleMap] = useState<{ [key: number]: boolean }>({});
    const [repliesMap, setRepliesMap] = useState<{ [key: number]: Comment[] }>({});

    const toggleReplyInput = (commentId: number) => {
        setReplyInputVisibleMap(prev => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const toggleReplies = async (commentId: number) => {
        if (!repliesMap[commentId]) {
            const replies = await fetchReplies(commentId);
            setRepliesMap(prev => ({ ...prev, [commentId]: replies }));
        }
        setRepliesVisibleMap(prev => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    if (isLoading) return <div>댓글 로딩 중...</div>;

    return (
        <div className="mt-4 space-y-2">
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="p-2 border rounded-md bg-gray-50">
                        <div className="text-sm font-semibold">{comment.user.nickname}</div>
                        <div className="text-gray-700">{comment.contents}</div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="text-xs text-gray-400">{getTime(comment.createdAt)}</div>
                            <button onClick={() => toggleReplyInput(comment.id)} className="text-xs text-gray-600">답글</button>
                        </div>
                        <button onClick={() => toggleReplies(comment.id)} className="text-xs text-blue-500">{"     "}답글 보기</button>

                        {replyInputVisibleMap[comment.id] && (
                            <CommentReplyInput
                                feedId={feedId}
                                commentId={comment.id}
                                onReplyPosted={refetch}
                            />
                        )}

                        {repliesVisibleMap[comment.id] && repliesMap[comment.id] && (
                            <div className="ml-4 mt-2 space-y-1">
                                {repliesMap[comment.id].map((reply) => (
                                    <div key={reply.id} className="p-2 bg-white border rounded-md">
                                        <div className="text-xs font-semibold">{reply.user.nickname}</div>
                                        <div className="text-gray-600 text-sm">{reply.contents}</div>
                                        <div className="text-xs text-gray-400 mt-1">{getTime(reply.createdAt)}</div>
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
