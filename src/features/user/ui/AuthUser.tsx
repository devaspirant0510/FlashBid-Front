import React, { FC, useEffect } from 'react';
import Cookies from 'js-cookie';
import { parseJwtPayload } from '@shared/lib/jwtUtils.ts';
import { Navigate } from 'react-router';
import { useAuthStore } from '@shared/store/AuthStore.ts';

type Props = {
    children: React.ReactNode;
};
const AuthUser: FC<Props> = ({ children }) => {
    const { accessToken } = useAuthStore();
    useEffect(() => {}, [accessToken]);
    if (!accessToken) {
        return <Navigate to={'/login'} />;
    }
    return <>{children}</>;
};

export default AuthUser;
