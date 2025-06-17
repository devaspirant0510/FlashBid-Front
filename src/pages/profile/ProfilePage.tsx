import MyProfile from "@/features/profile/ui/MyProfile.tsx";
import MyWallet from "@/features/profile/ui/MyWallet.tsx";
import MyActive from "@/features/profile/ui/MyActive.tsx";
import MyFeedList from "@/features/profile/ui/MyFeedList.tsx";
import MySales from "@/features/profile/ui/MySales.tsx";
import MyBuys from "@/features/profile/ui/MyBuys.tsx";
import {Header} from "@widgets/ui"
import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@shared/lib";
import {ApiResult} from "@entities/common";
import {useAuthUser} from "@shared/hooks/useAuthUser.tsx";

export const ProfilePage = () => {
    const [_,id] = useAuthUser()
    const { isLoading, data, isError,error } = useQuery({queryKey:["api","v1","profile",id],
        queryFn:httpFetcher<ApiResult<any>>});

    if(isLoading) {
        return <>loading</>
    }
    if(isError) {
        return <>error</>
    }
    if(!data || !data.data){
        return <>nodata</>
    }
    console.log(data);
    return (
        <>
            <Header />

            <div className="max-w-screen-xl mx-auto px-4">
                <section className="grid grid-cols-12 gap-6">
                    <MyProfile
                        nickname={data.data.user.nickname}
                        email={data.data.user.email}
                        url={data.data.user.profileUrl}
                    />

                    {/* 오른쪽 콘텐츠 */}
                    <section className="col-span-9 space-y-6 mt-30">
                        {/* MY 지갑 */}
                        <MyWallet/>

                        {/* MY 활동 */}
                        <MyActive
                            followercount={data.data.followerCount}
                            followingcount={data.data.followingCount}
                            feedcount={data.data.feedCount}
                        />

                        {/* MY 게시글 */}
                        <MyFeedList/>

                        {/* MY 판매 목록 */}
                        <MySales/>

                        {/* MY 구매 목록 */}
                        <MyBuys/>
                    </section>
                </section>
            </div>
        </>
    );
}

export default ProfilePage;
