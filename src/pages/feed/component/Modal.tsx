import { useState } from "react";
import Cookies from "js-cookie";
import {getServerURL} from "@shared/lib";

interface ModalProps {
    onClose: () => void;
}

export const Modal = ({ onClose }: ModalProps) => {
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const token = Cookies.get("access_token");


    const handleSubmit = async () => {
        if (!content.trim()) {
            alert("내용을 입력하세요.");
            return;
        }

            const formData = new FormData();
            formData.append(
                "data",
                new Blob([JSON.stringify({ content })], { type: "application/json" })
            );
            if (file) {
                formData.append("files", file);
            }

            const response = await fetch(`${getServerURL()}/api/v1/feed`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            } as any);

            const result = await response.json();

            if (response.ok) {
                alert("성공");
                setContent("");
                setFile(null);
                onClose();
            } else {
                console.error("실패:", result);
                alert(`실패: ${result?.error?.errorMessage || result?.message}`);
            }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
        >
            <div
                className="relative bg-white w-[500px] max-w-full rounded-lg shadow-lg p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-orange-400 text-xl font-bold hover:text-orange-600"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="text-center text-orange-500 text-lg font-semibold mb-4">
                    게시글 작성
                </h2>

                <textarea
                    className="w-full h-40 p-4 bg-orange-50 text-gray-700 border border-orange-100 rounded-md resize-none outline-none"
                    placeholder="게시글 내용 작성"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <input
                    type="file"
                    className="mt-4"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />

                <div className="text-center mt-6">
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded"
                        onClick={handleSubmit}
                    >
                        게시하기
                    </button>
                </div>
            </div>
        </div>
    );
};
