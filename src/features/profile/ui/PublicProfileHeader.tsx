import { FC } from 'react';
import { ProfileImage } from '@shared/ui';
import { Button } from '@shared/components/ui/button.tsx';
import { UserDto } from '../lib/useQueryGetUserById.ts'; // 3단계에서 정의한 타입

interface Props {
    userData: UserDto;
}

export const PublicProfileHeader: FC<Props> = ({ userData }) => {
    const { user, followerCount, followingCount, feedCount } = userData;

    return (
        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-12 p-4 border-b mb-8'>
            <div className='flex-shrink-0'>
                <ProfileImage size={120} src={user.profileUrl ?? undefined} />
            </div>
            <div className='flex flex-col gap-4 items-center sm:items-start'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-2xl font-bold'>{user.nickname}</h1>
                    <Button
                        style={{ backgroundColor: '#ED6C37', color: 'white' }}
                        // TODO: 팔로우 API 연동 필요
                    >
                        팔로우
                    </Button>
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