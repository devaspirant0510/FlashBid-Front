import React, { useRef } from 'react';

interface ImageUploaderProps {
    images: { file: File; previewUrl: string }[];
    setImages: React.Dispatch<React.SetStateAction<{ file: File; previewUrl: string }[]>>;
}

const ImageUploader = ({ images, setImages }: ImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files).slice(0, 10 - images.length);
        const newImages = newFiles.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
    };

    const handleDelete = (index: number) => {
        setImages((prev) => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].previewUrl);
            updated.splice(index, 1);
            return updated;
        });
    };

    return (
        <div className='mb-6'>
            <label className='block font-semibold mb-2 text-orange-500'>
                상품이미지 ({images.length}/10)
            </label>
            <div className='flex gap-4 flex-wrap'>
                {images.length < 10 && (
                    <label className='w-40 h-40 border-2 border-dashed rounded-md flex justify-center items-center cursor-pointer hover:border-red-500'>
                        <input
                            type='file'
                            className='hidden'
                            ref={inputRef}
                            accept='image/*'
                            multiple
                            onChange={handleImageChange}
                        />
                        <span className='text-gray-400 text-sm'>이미지 업로드</span>
                    </label>
                )}
                {images.map((img, idx) => (
                    <div key={idx} className='relative w-40 h-40'>
                        <img
                            src={img.previewUrl}
                            alt={`uploaded-${idx}`}
                            className='w-full h-full object-cover rounded-md'
                        />
                        <button
                            type='button'
                            onClick={() => handleDelete(idx)}
                            className='absolute top-1 right-1 bg-white border border-gray-300 rounded-full text-xs w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white'
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            <p className='text-xs text-gray-400 mt-1'>
                * 상품 이미지는 400x400에 최적화 되어 있습니다.
            </p>
        </div>
    );
};

export default ImageUploader;
