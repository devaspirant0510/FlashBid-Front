import { useState, useRef, useEffect } from 'react';
import { axiosClient, getServerURL } from '@shared/lib';
import { toast } from 'react-toastify';
import { ImagePlus, X as XIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface ModalProps {
    onClose: () => void;
}

export const Modal = ({ onClose }: ModalProps) => {
    const [content, setContent] = useState('');
    const queryClient = useQueryClient();
    // support multiple files now
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const prevUrlsRef = useRef<string[]>([]);

    useEffect(() => {
        return () => {
            // cleanup when component unmounts
            prevUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
            prevUrlsRef.current = [];
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (selected && selected.length > 0) {
            const added: File[] = Array.from(selected);

            // create object URLs for new files
            const newUrls = added.map((f) => URL.createObjectURL(f));

            // revoke none here for existing; just append
            prevUrlsRef.current = prevUrlsRef.current.concat(newUrls);

            setFiles((prev) => prev.concat(added));
            setPreviewUrls((prev) => prev.concat(newUrls));

            // reset input so same file can be selected again if needed
            const el = inputRef.current;
            if (el) el.value = '';
        }
    };

    const handleRemoveFileAt = (index: number) => {
        const url = previewUrls[index];
        if (url) URL.revokeObjectURL(url);

        prevUrlsRef.current = prevUrlsRef.current.filter((u) => u !== url);
        setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const triggerFilePicker = () => {
        inputRef.current!.click();
    };

    const handleSubmit = async () => {
        if (!content.trim()) {
            toast('내용을 입력해주세요', { type: 'error', autoClose: 2000 });
            return;
        }

        const formData = new FormData();
        formData.append(
            'data',
            new Blob([JSON.stringify({ content })], { type: 'application/json' }),
        );

        // append all files (server should accept multiple 'files' entries)
        files.forEach((f) => formData.append('files', f));

        const response = await axiosClient.post(`${getServerURL()}/api/v1/feed`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        } as any);

        const result = response.data;

        if (response) {
            toast('작성 성공', { type: 'success' });
            setContent('');
            // cleanup previews
            prevUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
            prevUrlsRef.current = [];
            setFiles([]);
            setPreviewUrls([]);
            queryClient.refetchQueries({ queryKey: ['api', 'v1', 'feed', 'test-all'] });
            onClose();
        } else {
            console.error('실패:', result);
            alert(`실패: ${result?.error?.errorMessage || result?.message}`);
        }
    };

    return (
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
            <div
                className='relative bg-white w-[500px] max-w-full rounded-lg shadow-lg p-6'
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className='absolute top-4 right-4 text-orange-400 text-xl font-bold hover:text-orange-600'
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className='text-center text-orange-500 text-lg font-semibold mb-4'>
                    게시글 작성
                </h2>
                <hr className={'border-t-1 border-uprimary'} />

                <textarea
                    className='mt-5 w-full h-80 p-4 bg-orange-50 text-gray-700 border border-orange-100 rounded-md resize-none outline-none'
                    placeholder='게시글 내용 작성'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* Custom file picker and preview (multi) */}
                <div className='mt-4'>
                    {/* thumbnails above the add button */}
                    {previewUrls.length > 0 && (
                        <div className='flex gap-2 flex-wrap mb-2'>
                            {previewUrls.map((url, idx) => (
                                <div
                                    key={url + idx}
                                    className='relative w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden'
                                >
                                    <img
                                        src={url}
                                        alt={`preview-${idx}`}
                                        className='object-cover w-full h-full'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveFileAt(idx)}
                                        className='absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-black/70'
                                        aria-label={`이미지 삭제 ${idx + 1}`}
                                    >
                                        <XIcon className='w-3 h-3' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='flex items-start gap-3'>
                        <input
                            ref={(el) => (inputRef.current = el)}
                            type='file'
                            accept='image/*'
                            multiple
                            className='hidden'
                            onChange={handleFileChange}
                        />

                        {/* Add button remains visible */}
                        <button
                            type='button'
                            onClick={triggerFilePicker}
                            className='inline-flex items-center gap-2 px-3 py-1 rounded-md text-uprimary hover:bg-uprimary/10 transition'
                        >
                            <ImagePlus className='w-5 h-5' />
                            <span className='font-medium text-sm'>사진 추가</span>
                        </button>
                    </div>
                </div>

                <div className='text-center mt-6'>
                    <button
                        className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded'
                        onClick={handleSubmit}
                    >
                        게시하기
                    </button>
                </div>
            </div>
        </div>
    );
};
