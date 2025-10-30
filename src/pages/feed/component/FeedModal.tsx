import React, { useState, useRef, useEffect } from 'react';
import { axiosClient, getServerURL, toastError } from '@shared/lib';
import { toast } from 'react-toastify';
import { ArrowUpDownIcon, ImagePlus, PackageIcon, X as XIcon, Loader2 } from 'lucide-react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/shared/components/ui/dialog';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ApiResult, Page } from '@entities/common';
import { FeedListResponse } from '@entities/feed/model';
interface InfiniteData<T> {
    pages: T[];
    pageParams: any[];
}
interface ModalProps {
    onClose: () => void;
}

export const FeedModal = ({ onClose }: ModalProps) => {
    const [content, setContent] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const prevUrlsRef = useRef<string[]>([]);
    const queryClient = useQueryClient();

    // 내 상품 홍보 다이얼로그 상태
    const [isPromoOpen, setPromoOpen] = useState(false);
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoItems, setPromoItems] = useState<
        Array<{ id: number; title: string; price: number; thumb: string }>
    >([]);

    useEffect(() => {
        return () => {
            prevUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
            prevUrlsRef.current = [];
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (selected && selected.length > 0) {
            const added = Array.from(selected);
            const newUrls = added.map((f) => URL.createObjectURL(f));
            prevUrlsRef.current = prevUrlsRef.current.concat(newUrls);
            setFiles((prev) => prev.concat(added));
            setPreviewUrls((prev) => prev.concat(newUrls));
            if (inputRef.current) inputRef.current.value = '';
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
        inputRef.current?.click();
    };

    // ✅ useMutation: 게시글 등록 로직
    const { mutate: submitFeed, isPending } = useMutation({
        mutationFn: async () => {
            if (!content.trim()) {
                throw new Error('내용을 입력해주세요');
            }

            const formData = new FormData();
            formData.append(
                'data',
                new Blob([JSON.stringify({ content })], { type: 'application/json' }),
            );
            files.forEach((f) => formData.append('files', f));

            const response = await axiosClient.post(`${getServerURL()}/api/v1/feed`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            } as any);
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success('작성 성공');
            setContent('');
            prevUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
            prevUrlsRef.current = [];
            setFiles([]);
            setPreviewUrls([]);
            queryClient.setQueryData(
                ['api', 'v2', 'feed'],
                (oldData: InfiniteData<ApiResult<Page<FeedListResponse>>>) => {
                    const newData = structuredClone(oldData);
                    console.log(newData.pages[0].data?.content[0]);
                    newData.pages[0].data?.content.unshift({ ...data.data });
                    console.log(newData.pages[0].data?.content[0]);
                    return newData;
                },
            );
            onClose();
        },
        onError: (error: any) => {
            toastError(error?.message || '게시글 작성 중 오류 발생');
        },
    });

    const handleOpenPromo = () => {
        setPromoOpen(true);
        setPromoLoading(true);
        setPromoItems([]);
        setTimeout(() => {
            const demo = [
                { id: 1, title: '테스트 상품 A', price: 12900, thumb: '/img/default.png' },
                { id: 2, title: '테스트 상품 B', price: 34900, thumb: '/img/default.png' },
                { id: 3, title: '테스트 상품 C', price: 9900, thumb: '/img/default.png' },
            ];
            setPromoItems(demo);
            setPromoLoading(false);
        }, 1200);
    };

    const renderPromoBody = () => {
        if (promoLoading) {
            return (
                <div className='space-y-3'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='flex items-center gap-3'>
                            <Skeleton className='h-12 w-12 rounded-md' />
                            <div className='flex-1 space-y-2'>
                                <Skeleton className='h-4 w-1/2' />
                                <Skeleton className='h-4 w-1/3' />
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className='space-y-3'>
                {promoItems.map((it) => (
                    <div key={it.id} className='flex items-center gap-3 p-2 rounded-md border'>
                        <img
                            src={it.thumb}
                            className='w-12 h-12 rounded-md object-cover'
                            alt={it.title}
                        />
                        <div className='flex-1 min-w-0'>
                            <div className='text-sm font-medium truncate'>{it.title}</div>
                            <div className='text-xs text-gray-500'>
                                {it.price.toLocaleString()}원
                            </div>
                        </div>
                        <button className='text-uprimary text-sm hover:underline'>홍보하기</button>
                    </div>
                ))}
                {promoItems.length === 0 && (
                    <div className='text-sm text-gray-500'>표시할 상품이 없습니다.</div>
                )}
            </div>
        );
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
                <hr className='border-t-1 border-uprimary' />

                <textarea
                    className='mt-5 w-full h-80 p-4 bg-orange-50 text-gray-700 border border-orange-100 rounded-md resize-none outline-none'
                    placeholder='게시글 내용 작성'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* 이미지 미리보기 */}
                <div className='mt-4'>
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
                            ref={(el) => {
                                inputRef.current = el;
                            }}
                            type='file'
                            accept='image/*'
                            multiple
                            className='hidden'
                            onChange={handleFileChange}
                        />
                        <div className='flex flex-col gap-1'>
                            <button
                                type='button'
                                onClick={triggerFilePicker}
                                className='inline-flex items-center gap-2 px-3 py-1 rounded-md text-uprimary hover:bg-uprimary/10 transition'
                            >
                                <ImagePlus className='w-5 h-5' />
                                <span className='font-medium text-sm'>사진 추가</span>
                            </button>
                            <button
                                type='button'
                                onClick={handleOpenPromo}
                                className='inline-flex items-center gap-2 px-3 py-1 rounded-md text-uprimary hover:bg-uprimary/10 transition'
                            >
                                <PackageIcon className='w-5 h-5' />
                                <span className='font-medium text-sm'>내 상품 홍보</span>
                            </button>
                            <button
                                type='button'
                                className='inline-flex items-center gap-2 px-3 py-1 rounded-md text-uprimary hover:bg-uprimary/10 transition'
                            >
                                <ArrowUpDownIcon className='w-5 h-5' />
                                <span className='font-medium text-sm'>거래내역</span>
                            </button>
                        </div>
                    </div>
                </div>

                <hr className='border-t-1 mt-4 border-uprimary' />
                <div className='text-center mt-6'>
                    <button
                        onClick={() => submitFeed()}
                        disabled={isPending}
                        className={`bg-orange-500 text-white font-semibold py-2 px-6 rounded transition ${
                            isPending ? 'opacity-60 cursor-not-allowed' : 'hover:bg-orange-600'
                        }`}
                    >
                        {isPending ? (
                            <div className='flex items-center justify-center gap-2'>
                                <Loader2 className='w-4 h-4 animate-spin' />
                                게시 중...
                            </div>
                        ) : (
                            '게시하기'
                        )}
                    </button>
                </div>
            </div>

            {/* 내 상품 홍보 다이얼로그 */}
            <Dialog open={isPromoOpen} onOpenChange={setPromoOpen}>
                <DialogContent className='sm:max-w-lg w-[90vw]'>
                    <DialogHeader>
                        <DialogTitle>내 상품 홍보</DialogTitle>
                        <DialogDescription>테스트 데이터 로딩 예시입니다.</DialogDescription>
                    </DialogHeader>

                    {renderPromoBody()}

                    <DialogFooter className='mt-4'>
                        <DialogClose asChild>
                            <button className='px-4 py-2 rounded-md border hover:bg-gray-50'>
                                닫기
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FeedModal;
