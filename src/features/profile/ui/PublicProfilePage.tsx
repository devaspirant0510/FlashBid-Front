import { useParams } from 'react-router-dom';
import { MainLayout } from '@shared/layout';
import { BackButton } from '@shared/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs.tsx';

// 3단계에서 생성한 훅
import { useQueryGetUserById } from '../lib/useQueryGetUserById.ts';
import { useQueryGetUserFeeds } from '../lib/useQueryGetUserFeeds.ts';

// 재사용 컴포넌트
import { PublicProfileHeader } from '../ui/PublicProfileHeader.tsx';
import MyFeed from '@/features/profile/ui/MyFeed.tsx'; //

const PublicProfilePage = () => {
    const { userId } = useParams<{ userId: string }>();

    // 1. 유저 정보 API 호출
    const { data: userData, isLoading: isUserLoading, isError: isUserError } =
        useQueryGetUserById(userId);

    // 2. 유저 피드 API 호출
    const { data: feedsData, isLoading: isFeedsLoading, isError: isFeedsError } =
        useQueryGetUserFeeds(userId);

    const isLoading = isUserLoading || isFeedsLoading;
    const isError = isUserError || isFeedsError;

    const feeds = feedsData?.data || [];
    const userProfile = userData?.data;

    const renderContent = () => {
        if (isLoading) {
            return <div className='py-20 text-center text-gray-500'>로딩 중...</div>;
        }
        if (isError || !userProfile) {
            return <div className='py-20 text-center text-red-500'>프로필을 불러오는데 실패했습니다.</div>;
        }

        return (
            <>
                {/* 1. 프로필 헤더 */}
                <PublicProfileHeader userData={userProfile} />

                {/* 2. 콘텐츠 탭 */}
                <Tabs defaultValue='feeds'>
                    <TabsList className='grid w-full grid-cols-2 mb-6'>
                        <TabsTrigger value='feeds'>
                            게시물 ({userProfile.feedCount})
                        </TabsTrigger>

                        {/* [제한 사항]
                          현재 백엔드에는 {id}로 남의 '판매 상품' 목록을 가져오는 API가 없습니다.
                          (GET /api/v1/profile/sales는 '내' 판매 목록만 가져옴)
                          따라서 이 탭은 비활성화합니다.
                        */}
                        <TabsTrigger value='sales' disabled>
                            판매 상품
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='feeds' className='mt-0'>
                        {feeds.length === 0 ? (
                            <div className='py-20 text-center text-gray-500'>게시물이 없습니다.</div>
                        ) : (
                            // MyFeedList.tsx의 그리드 스타일 재사용
                            <div className='grid grid-cols-3 gap-4'>
                                {feeds.map((feed) => (
                                    <MyFeed key={feed.feed.id} feedData={feed} />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </>
        );
    };

    return (
        <MainLayout>
            <div className='container mx-auto px-4 py-8 max-w-4xl'>
                <div className='flex items-center mb-6'>
                    <BackButton />
                </div>
                {renderContent()}
            </div>
        </MainLayout>
    );
};

export default PublicProfilePage;