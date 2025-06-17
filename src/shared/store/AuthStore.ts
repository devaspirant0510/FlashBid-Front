// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    getAccessToken: () => string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,

    setAccessToken: (token: string) => {
        set({ accessToken: token });
    },

    getAccessToken: () => {
        return get().accessToken;
    },
}));
