import { ChevronDown } from 'lucide-react';
import MyFeed from '@/features/profile/ui/MyFeed.tsx';
import { useQueryGetMyFeeds } from '../lib/useQueryGetMyFeeds';

const MyFeedList = () => {
    const { data, isLoading, isError } = useQueryGetMyFeeds();

    const renderContent = () => {
        if (isLoading) {
            return <div className='py-10 text-gray-500'>게시물을 불러오는 중...</div>;
        }

        if (isError) {
            return <div className='py-10 text-red-500'>게시물을 불러오는데 실패했습니다.</div>;
        }

        if (!data?.data || data.data.length === 0) {
            return <div className='py-10 text-gray-500'>작성한 게시물이 없습니다.</div>;
        }

        return (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {data.data.map((feed) => (
                    <MyFeed key={feed.feed.id} feedData={feed} />
                ))}
            </div>
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

