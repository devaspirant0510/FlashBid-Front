// src/store/authStore.ts
import { create } from 'zustand';
import { AccessTokenPayload, parseJwtPayload } from '@shared/lib';

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    getAccessToken: () => string | null;
    userAuth: AccessTokenPayload | null;
    setUserAuth: (data: AccessTokenPayload) => void;
    getUserAuth: () => AccessTokenPayload | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    userAuth: null,

    setAccessToken: (token: string) => {
        set({ accessToken: token });
        const parse = parseJwtPayload<AccessTokenPayload>(token);
        get().setUserAuth(parse);
    },
    setUserAuth: (data) => {
        set({ userAuth: data });
    },

    getAccessToken: () => {
        return get().accessToken;
    },
    getUserAuth: () => {
        return get().userAuth;
    },
}));
