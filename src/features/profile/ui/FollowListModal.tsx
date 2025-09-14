import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/components/ui/dialog.tsx";
import { useQueryGetFollowers } from "@/features/profile/lib/useQueryGetFollowers.ts";
import { useQueryGetFollowings } from "@/features/profile/lib/useQueryGetFollowings.ts";
import { FollowUserItem } from "@/features/profile/ui/FollowUserItem.tsx";
import { useAuthUser } from "@shared/hooks/useAuthUser.tsx";

interface FollowListModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FollowListModal: React.FC<FollowListModalProps> = ({ isOpen, onClose }) => {
    const [_, userId] = useAuthUser();
    const [tab, setTab] = useState<'followers' | 'followings'>('followers');

    const { data: followersData, isLoading: isFollowersLoading } = useQueryGetFollowers(Number(userId));
    const { data: followingsData, isLoading: isFollowingsLoading } = useQueryGetFollowings(Number(userId));

    const isLoading = tab === 'followers' ? isFollowersLoading : isFollowingsLoading;
    const data = tab === 'followers' ? followersData?.data : followingsData?.data;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-[425px] mx-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold text-lg">T1 Gumayusi</DialogTitle>
                </DialogHeader>

                {/* 탭 버튼 */}
                <div className="flex border-b border-gray-300">
                    <button
                        className={`flex-1 py-2 text-center font-semibold ${tab === 'followers' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
                        onClick={() => setTab('followers')}
                    >
                        팔로워 {followersData?.data.length || 0}
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-semibold ${tab === 'followings' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
                        onClick={() => setTab('followings')}
                    >
                        팔로잉 {followingsData?.data.length || 0}
                    </button>
                </div>

                {/* 리스트 */}
                <div className="mt-4 max-h-[400px] overflow-y-auto space-y-2">
                    {isLoading && <div className="text-center p-4">로딩 중...</div>}
                    {!isLoading && data && data.length > 0 ? (
                        data.map(user => <FollowUserItem key={user.id} user={user} type={tab} />)
                    ) : (
                        <div className="text-center text-gray-500 py-8">목록이 비어있습니다.</div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
