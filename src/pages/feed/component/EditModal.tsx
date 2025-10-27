import { useState } from 'react';
import { axiosClient, getServerURL } from '@shared/lib';
import { useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons';

interface FileWithPreview {
    file: File;
    preview: string;
}

interface ExistingImage {
    url: string;
    fileName: string;
}

interface EditModalProps {
    feedId: number;
    initialContent: string;
    initialImages: ExistingImage[];
    onClose: () => void;
}

export const EditModal = ({ feedId, initialContent, initialImages, onClose }: EditModalProps) => {
    const [content, setContent] = useState(initialContent);
    const [allImages, setAllImages] = useState<(FileWithPreview | (ExistingImage & { isExisting: true }))[]>(
        initialImages.map((img) => ({ ...img, isExisting: true }))
    );
    const [isLoading, setIsLoading] = useState(false);

    const queryClient = useQueryClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Array.from(e.target.files).forEach((selectedFile) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAllImages((prev) => [
                        ...prev,
                        {
                            file: selectedFile,
                            preview: reader.result as string,
                        },
                    ]);
                };
                reader.readAsDataURL(selectedFile);
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setAllImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!content.trim()) {
            alert('내용을 입력하세요.');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append(
                'data',
                new Blob([JSON.stringify({ content })], { type: 'application/json' }),
            );

            // 새로운 파일들만 추가 (isExisting이 없는 것들)
            allImages.forEach((image) => {
                if (!('isExisting' in image)) {
                    formData.append('files', image.file);
                }
            });

            const response = await axiosClient.patch(
                `${getServerURL()}/api/v1/feed/${feedId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                } as any,
            );

            if (response.data) {
                alert('수정 완료');
                queryClient.invalidateQueries({
                    queryKey: ['api', 'v1', 'feed', 'test-all'],
                });
                queryClient.invalidateQueries({
                    queryKey: ['api', 'v1', 'feed', feedId],
                });
                onClose();
            } else {
                alert('실패: 수정에 실패했습니다.');
            }
        } catch (error: any) {
            console.error('수정 에러:', error);
            alert(`실패: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4'>
            <div
                className='relative bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto'
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className='absolute top-4 right-4 text-gray-400 text-2xl font-bold hover:text-gray-600 disabled:opacity-50 transition'
                    onClick={onClose}
                    disabled={isLoading}
                >
                    ×
                </button>

                <h2 className='text-center text-gray-800 text-2xl font-bold mb-6'>
                    게시글 수정
                </h2>

                {/* 텍스트 영역 */}
                <textarea
                    className='w-full h-40 p-4 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
                    placeholder='게시글 내용을 작성하세요'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isLoading}
                />

                {/* 이미지 관리 영역 */}
                <div className='mt-6'>
                    <p className='text-sm font-semibold text-gray-700 mb-3'>이미지</p>

                    {allImages.length === 0 ? (
                        <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition'>
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <FontAwesomeIcon
                                    icon={faImage}
                                    className='w-10 h-10 text-gray-400 mb-2'
                                />
                                <p className='text-sm text-gray-500'>
                                    <span className='font-semibold'>클릭하여 업로드</span> 또는 드래그
                                </p>
                                <p className='text-xs text-gray-400 mt-1'>
                                    이미지 파일 (최대 400x400px 권장)
                                </p>
                            </div>
                            <input
                                type='file'
                                className='hidden'
                                onChange={handleFileChange}
                                disabled={isLoading}
                                accept='image/*'
                                multiple
                            />
                        </label>
                    ) : (
                        <div>
                            <div className='grid grid-cols-2 gap-4 mb-4'>
                                {allImages.map((image, index) => (
                                    <div key={index} className='relative'>
                                        <img
                                            src={
                                                'isExisting' in image
                                                    ? `${getServerURL()}${image.url}`
                                                    : image.preview
                                            }
                                            alt={
                                                'isExisting' in image
                                                    ? image.fileName
                                                    : `미리보기 ${index + 1}`
                                            }
                                            className='w-full h-32 object-cover rounded-lg border border-gray-200'
                                        />
                                        <button
                                            type='button'
                                            onClick={() => handleRemoveImage(index)}
                                            disabled={isLoading}
                                            className='absolute top-2 right-2 hover:bg-red-600 rounded-full p-1.5 shadow-md transition disabled:opacity-50'
                                        >
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                className='text-white text-sm'
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label className='flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition'>
                                <span className='text-sm text-gray-600 font-medium'>+ 이미지 추가</span>
                                <input
                                    type='file'
                                    className='hidden'
                                    onChange={handleFileChange}
                                    disabled={isLoading}
                                    accept='image/*'
                                    multiple
                                />
                            </label>
                        </div>
                    )}
                </div>

                {/* 버튼 */}
                <div className='flex gap-3 mt-8'>
                    <button
                        className='flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition disabled:opacity-50'
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        취소
                    </button>
                    <button
                        className='flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition'
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? '수정 중...' : '수정하기'}
                    </button>
                </div>
            </div>
        </div>
    );
};