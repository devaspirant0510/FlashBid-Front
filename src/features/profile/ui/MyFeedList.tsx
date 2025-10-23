// profile/ui/MyFeedList.tsx
import { ChevronDown } from 'lucide-react';
import MyFeed from '@/features/profile/ui/MyFeed.tsx';
import { useQueryGetMyFeeds } from '../lib/useQueryGetMyFeeds';
import { useState } from 'react'; // [추가]
import { Button } from '@shared/components/ui/button.tsx'; // [추가]

// [추가] 한 번에 보여줄 아이템 수
const LOAD_COUNT_PER_PAGE = 6;

const MyFeedList = () => {
    const { data, isLoading, isError } = useQueryGetMyFeeds();

    // [추가] 현재까지 보여줄 아이템 수를 관리하는 상태
    const [visibleCount, setVisibleCount] = useState(LOAD_COUNT_PER_PAGE);

    // [추가] 더보기 버튼 클릭 핸들러
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + LOAD_COUNT_PER_PAGE);
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className='py-10 text-gray-500'>게시물을 불러오는 중...</div>;
        }

        if (isError) {
            return <div className='py-10 text-red-500'>게시물을 불러오는데 실패했습니다.</div>;
        }

        // [수정] 전체 데이터를 'allFeeds'로 받음
        const allFeeds = data?.data;

        if (!allFeeds || allFeeds.length === 0) {
            return <div className='py-10 text-gray-500'>작성한 게시물이 없습니다.</div>;
        }

        // [수정] 'allFeeds'를 'visibleCount'만큼 잘라서 보여줌
        const visibleFeeds = allFeeds.slice(0, visibleCount);
        // [수정] 더 보여줄 아이템이 있는지 확인
        const hasMore = allFeeds.length > visibleCount;

        return (
            // [수정] Fragment(<> </>)로 감싸서 버튼을 추가
            <>
                <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                    {/* [수정] visibleFeeds로 맵핑 */}
                    {visibleFeeds.map((feed) => (
                        <MyFeed key={feed.feed.id} feedData={feed} />
                    ))}
                </div>

                {/* [추가] 더보기 버튼 */}
                {hasMore && (
                    <div className='mt-6 text-center'>
                        <Button
                            variant='outline'
                            onClick={handleLoadMore}
                            className='px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                        >
                            더보기
                        </Button>
                    </div>
                )}
            </>
        );
    };

    return (
        <section className='bg-white rounded-xl shadow border text-center px-8 py-5'>
            <div className='flex justify-between items-center mb-5'>
                <span
                    className='font-semibold '
                    style={{ fontSize: 24, color: '#ED6C37', fontWeight: 'bold' }}
                >
                    MY 게시물
                </span>
                <div>
                    <span
                        className='text-sm text-muted-foreground mr-1'
                        style={{ color: '#ED6C37' }}
                    >
                        최신순
                    </span>
                    <span className='text-sm text-muted-foreground' style={{ color: '#ED6C37' }}>
                        <ChevronDown size={16} />
                    </span>
                </div>
            </div>
            {renderContent()}
        </section>
    );
};

export default MyFeedList;