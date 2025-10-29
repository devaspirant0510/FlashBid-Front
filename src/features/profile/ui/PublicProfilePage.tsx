import { useParams } from 'react-router-dom';
import { MainLayout } from '@shared/layout';
import { BackButton } from '@shared/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs.tsx';

// 훅 임포트
import { useQueryGetUserById } from '../lib/useQueryGetUserById.ts';
import { useQueryGetUserFeeds } from '../lib/useQueryGetUserFeeds.ts';
import { useAuthUser } from '@shared/hooks/useAuthUser.tsx'; // 로그인 유저 정보 훅

// 재사용 컴포넌트
import { PublicProfileHeader } from '../ui/PublicProfileHeader.tsx';
import MyFeed from '@/features/profile/ui/MyFeed.tsx';

const PublicProfilePage = () => {
    const { userId } = useParams<{ userId: string }>();

    // 현재 로그인한 유저의 ID를 가져옵니다.
    const [_, authUserId] = useAuthUser();

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

    // 현재 보고 있는 프로필이 '내 프로필'인지 확인합니다.
    const isMe = Number(authUserId) === Number(userId);

    const renderContent = () => {
        if (isLoading) {
            return <div className='py-20 text-center text-gray-500'>로딩 중...</div>;
        }
        if (isError || !userProfile) {
            return <div className='py-20 text-center text-red-500'>프로필을 불러오는데 실패했습니다.</div>;
        }

        return (
            <>
                {/* 1. 프로필 헤더 (isMe 프롭스 전달) */}
                <PublicProfileHeader userData={userProfile} isMe={isMe} />

                {/* 2. 콘텐츠 탭 */}
                <Tabs defaultValue='feeds'>
                    <TabsList className='grid w-full grid-cols-2 mb-6'>
                        <TabsTrigger value='feeds'>
                            게시물 ({userProfile.feedCount})
                        </TabsTrigger>
                        <TabsTrigger value='sales' disabled>
                            판매 상품
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='feeds' className='mt-0'>
                        {feeds.length === 0 ? (
                            <div className='py-20 text-center text-gray-500'>게시물이 없습니다.</div>
                        ) : (
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