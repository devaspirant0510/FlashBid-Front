// src/pages/feed/CommentReplyInput.tsx

import { useState } from "react";

interface Props {
    feedId: number;
    commentId: number;
    onReplyPosted?: () => void;
}

const CommentReplyInput = ({ feedId, commentId, onReplyPosted }: Props) => {
    const [contents, setContents] = useState("");

    const handleSubmit = async () => {
        if (!contents.trim()) {
            alert("대댓글을 입력하세요.");
            return;
        }

        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImlhdCI6MTc0OTQ4MTM5OSwiZXhwIjoxNzgxMDE3Mzk5LCJpZCI6IjEiLCJ1aWQiOiJiNGZmMDIyOTQ1MWQ4ZmM0Zjk4YjBjMmE2NTQ1ZGEzMyIsImVtYWlsIjoic2V1bmdobzAyMDUxMEBnbWFpbC5jb20iLCJyb2xlIjoidG9wIGdhcCJ9.hQVu0R5rxhOiJYHsdLqvkZ5bQMvOZifwKruQkvNa08Y";
        try {
            const res = await fetch("http://172.27.226.250:8080/api/v1/feed/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    contents,
                    commentId,
                    feedId,
                }),
            });

            if (!res.ok) throw new Error("대댓글 등록 실패");

            setContents("");
            alert("대댓글이 등록되었습니다.");
            onReplyPosted?.();
        } catch (err: any) {
            alert(err.message || "에러 발생");
        }
    };

    return (
        <div className="mt-2 flex items-center">
            <input
                type="text"
                placeholder="답글 작성하기"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="w-full rounded-[8px] border border-gray-300 rounded px-3 py-1 text-sm text-gray-600 "
            />
            <button
                className="px-2 py-1 text-black rounded text-sm font-semibold whitespace-nowrap leading-normal bg-transparent"
                onClick={handleSubmit}
            >
                등록
            </button>
        </div>
    );
};

export default CommentReplyInput;
