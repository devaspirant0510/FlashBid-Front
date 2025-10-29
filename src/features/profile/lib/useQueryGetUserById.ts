import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib'; // [주의] httpFetcher 경로는 실제 프로젝트에 맞게 확인해주세요.
import { ApiResult } from '@entities/common';
import {FileEntity} from "@/entities/auction/model"; // [주의] ApiResult 경로는 실제 프로젝트에 맞게 확인해주세요.

export interface Account {
    id: number;
    createdAt: string;
    updatedAt: string;
    loginType: 'KAKAO' | 'GOOGLE' | 'NAVER' | string;
    userStatus: 'ACTIVE' | 'INACTIVE' | 'UN_LINK' | string;
    userType: 'CUSTOMER' | 'ADMIN' | 'UN_REGISTER' | string;
    password: string | null;
    email: string;
    deletedAt: string | null;
    isVerified: boolean;
    uuid: string;
    nickname: string;
    description: string | null;
    profileUrl: string | null;
    point: number;
}

/**
 * UserDto.java 및 샘플 JSON 기반 타입
 * profileImage는 FileEntity 또는 null일 수 있습니다.
 */
export interface UserDto {
    user: Account;
    followerCount: number;
    followingCount: number;
    feedCount: number;
    profileImage: FileEntity;
}

/**
 * [신규 훅] ID로 특정 유저의 기본 정보(스탯 포함)를 조회합니다.
 * API: GET /api/v1/profile/{id}
 */
export const useQueryGetUserById = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['api', 'v1', 'profile', Number(userId)],
        queryFn: httpFetcher<ApiResult<UserDto>>,
        enabled: !!userId, // userId가 유효할 때만 쿼리를 실행합니다.
    });
};