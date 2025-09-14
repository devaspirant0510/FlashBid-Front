import React, {useState} from "react";
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
import {useQueryGetAccountStatus} from "@/features/profile/lib/useQueryGetAccountStatus.ts";
import {EditProfileModal} from "@/features/profile/ui/EditProfileModal.tsx";

export const ProfilePage = () => {
    const [_,id] = useAuthUser()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { isLoading, data, isError,error } = useQuery({queryKey:["api","v1","profile",id],
        queryFn:httpFetcher<ApiResult<any>>});

    const { data: statusData } = useQueryGetAccountStatus(Number(id));

    if(isLoading) {
        return <>loading</>
    }
    if(isError) {
        return <>error</>
    }
    if(!data || !data.data){
        return <>nodata</>
    }

    return (
        <>
            <Header />

            <div className="max-w-screen-xl mx-auto px-4">
                <section className="grid grid-cols-12 gap-6">
                    <MyProfile
                        nickname={data.data.user.nickname}
                        email={data.data.user.email}
                        url={data.data.user.profileUrl}
                        cash={statusData?.data?.cash}
                        interestedCount={statusData?.data?.interestedCount}
                        biddingCount={statusData?.data?.biddingCount}
                        onEditClick={() => setIsEditModalOpen(true)}
                    />

                    <section className="col-span-9 space-y-6 mt-30">
                        <MyWallet cash={statusData?.data?.cash} />

                        {/* 👇 MyActive 컴포넌트에 필요한 모든 데이터를 정확히 전달합니다. */}
                        <MyActive
                            followercount={data.data.followerCount}
                            followingcount={data.data.followingCount}
                            feedcount={data.data.feedCount}
                        />

                        <MyFeedList/>

                        <MySales/>

                        <MyBuys/>
                    </section>
                </section>
            </div>

            {isEditModalOpen && (
                <EditProfileModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    currentNickname={data.data.user.nickname}
                    currentProfileUrl={data.data.user.profileUrl}
                />
            )}
        </>
    );
}

export default ProfilePage;