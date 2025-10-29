import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResult } from '@entities/common';
import { useAuthUser } from '@shared/hooks/useAuthUser.tsx';
import { axiosClient } from '@shared/lib/axiosClient.ts';
import Cookies from 'js-cookie'; // axiosClient를 직접 import 합니다.

export interface UpdateProfilePayload {
    nickname?: string;
    profileImage?: File;
}

const updateProfile = (id: number, payload: UpdateProfilePayload) => {
    const formData = new FormData();

    if (payload.nickname) {
        formData.append('nickname', payload.nickname);
    }
    if (payload.profileImage) {
        formData.append('profileImage', payload.profileImage);
    }

    // httpFetcher 대신 axiosClient를 직접 사용합니다.
    return axiosClient.patch<ApiResult<any>>(
        `/api/v1/profile/${id}`, // 요청 URL
        formData, // 요청 Body
        {
            // 요청 헤더 (파일 업로드용)
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${Cookies.get('access_token') || ''}`, // 토큰이 필요한 경우
            },
        },
    );
};

export const useMutationUpdateProfile = () => {
    const queryClient = useQueryClient();
    const [_, id] = useAuthUser();

    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) => updateProfile(Number(id), payload),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['api', 'v1', 'profile', id] });
        },
        onError: (error) => {
            console.error('프로필 업데이트 실패:', error);
            alert('프로필 업데이트에 실패했습니다.');
        },
    });
};
