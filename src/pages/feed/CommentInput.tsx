// components/CommentInput.tsx
import { useState } from "react";
import Cookies from "js-cookie";

interface CommentInputProps {
    feedId: number | string;
    onCommentPosted?: () => void;
}

const CommentInput = ({ feedId, onCommentPosted }: CommentInputProps) => {
    const [contents, setContents] = useState("");
    const token = Cookies.get("access_token");

    const handleSubmit = async () => {
        if (!contents.trim()) {
            alert("댓글을 입력하세요.");
            return;
        }

        try {
            const response = await fetch("http://172.27.226.250:8080/api/v1/feed/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    contents,
                    feedId,
                }),
            });

            if (!response.ok) throw new Error("댓글 등록 실패");

            setContents("");
            alert("댓글이 등록되었습니다.");
            onCommentPosted?.();
        } catch (err: any) {
            alert(err.message || "에러 발생");
        }
    };

    return (
        <div className="mt-4 border-t pt-3 flex items-center">
            <input
                type="text"
                placeholder="댓글 작성하기"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-600 placeholder-gray-400 outline-none focus:ring-1"
                onClick={(e) => e.stopPropagation()}
            />
            <button
                className="px-2 py-2.5 text-black rounded-md text-sm font-semibold whitespace-nowrap leading-normal bg-transparent"
                onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit();
                }}
            >
                등록
            </button>
        </div>

    );
};

export default CommentInput;
