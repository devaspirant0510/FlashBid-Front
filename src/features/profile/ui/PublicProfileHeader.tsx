// features/profile/ui/PublicProfileHeader.tsx
import { FC } from 'react';
import { ProfileImage } from '@shared/ui';
import { Button } from '@shared/components/ui/button.tsx';
import { UserDto } from '../lib/useQueryGetUserById.ts';
import { useMutationFollowUser } from '../lib/useMutationFollowUser.ts';
import { useMutationUnfollowUser } from '../lib/useMutationUnfollowUser.ts';

interface Props {
    userData: UserDto;
    isMe: boolean;
}

export const PublicProfileHeader: FC<Props> = ({ userData, isMe }) => {
    const { user, followerCount, followingCount, feedCount, following } = userData;

    const followMutation = useMutationFollowUser();
    const unfollowMutation = useMutationUnfollowUser();

    const isFollowLoading = followMutation.isPending || unfollowMutation.isPending;

    const handleFollowToggle = () => {
        if (isFollowLoading || isMe) return;

        if (following) {
            unfollowMutation.mutate(user.id);
        } else {
            followMutation.mutate(user.id);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-12 p-4 border-b mb-8'>
            <div className='flex-shrink-0'>
                <ProfileImage size={120} src={user.profileUrl ?? undefined} />
            </div>
            <div className='flex flex-col gap-4 items-center sm:items-start'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-2xl font-bold'>{user.nickname}</h1>

                    {!isMe && (
                        <Button
                            style={{
                                // [수정] isFollowing -> following
                                backgroundColor: following ? '#E0E0E0' : '#ED6C37',
                                color: following ? '#333333' : 'white',
                            }}
                            onClick={handleFollowToggle}
                            disabled={isFollowLoading}
                        >
                            {isFollowLoading
                                ? '처리 중...'
                                : following // [수정] isFollowing -> following
                                    ? '팔로잉'
                                    : '팔로우'}
                        </Button>
                    )}
                </div>
                <div className='flex gap-6 text-sm sm:text-base'>
                    <span>게시물 <span className='font-bold'>{feedCount}</span></span>
                    <span>팔로워 <span className='font-bold'>{followerCount}</span></span>
                    <span>팔로잉 <span className='font-bold'>{followingCount}</span></span>
                </div>
            </div>
        </div>
    );
};