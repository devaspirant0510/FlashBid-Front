import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { parseJwtPayload } from '@shared/lib/jwtUtils.ts';

export interface UserTokenPayload {
    email: string;
    exp: number; // 만료 시간 (UNIX timestamp)
    iat: number; // 발급 시간 (UNIX timestamp)
    id: number; // 유저 고유 ID
    nickname: string;
    profileUrl: string;
    role: 'CUSTOMER' | 'ADMIN' | string; // enum 느낌으로도 가능
    sub: string;
    uid: string;
}

// 튜플 타입 정의
type UseAuthUserResult = [null, null, null] | [string, number, UserTokenPayload];

export const useAuthUser = (): UseAuthUserResult => {
    const accessToken = Cookies.get('access_token');
    const [userInfo, setUser] = useState<UserTokenPayload | null>(null);

    useEffect(() => {
        if (accessToken) {
            console.log(accessToken);
            const user = parseJwtPayload(accessToken);
            console.log(user);
            setUser({ ...user });
        }
    }, [accessToken]);

    if (userInfo == null) {
        return [null, null, null];
    }
    return [userInfo.nickname, userInfo.id, userInfo];
};
