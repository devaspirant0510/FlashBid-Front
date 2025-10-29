import { create } from 'zustand';

type FollowTab = 'followers' | 'followings';

interface FollowState {
    currentTab: FollowTab;
    setTab: (tab: FollowTab) => void;
}

export const useFollowStore = create<FollowState>((set) => ({
    currentTab: 'followers', // 초기값은 '팔로워'
    setTab: (tab) => set({ currentTab: tab }),
}));
