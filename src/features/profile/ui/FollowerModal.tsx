import React, {useState, useRef, useEffect} from "react";
import {useFollowStore} from "@shared/store/myProfileStore.ts";

type User = {
    id: number;
    name: string;
    isMutual: boolean;
    canMessage: boolean;
};

type Props = {
    username: string;
    followers: User[];
    followings: User[];
    onClose: () => void;
    initialTab?: "followers" | "followings";
};

const FollowerModal: React.FC<Props> = ({
                                            username,
                                            followers,
                                            followings,
                                            onClose,
                                        }) => {
    const { currentTab} = useFollowStore()
    const [activeTab, setActiveTab] = useState<"followers" | "followings">(currentTab);
    const [followerList, setFollowerList] = useState(followers);
    const [followingList, setFollowingList] = useState(followings);
    const [dropdownUserId, setDropdownUserId] = useState<number | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownUserId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFollowClick = (userId: number) => {
        const update = (list: User[]) =>
            list.map((u) =>
                u.id === userId ? {...u, isMutual: false, canMessage: true} : u
            );

        if (activeTab === "followers") setFollowerList(update);
        else setFollowingList(update);
    };

    const handleRemove = (userId: number) => {
        if (activeTab === "followers") {
            setFollowerList((prev) => prev.filter((user) => user.id !== userId));
        } else {
            setFollowingList((prev) => prev.filter((user) => user.id !== userId));
        }
    };

    const list = activeTab === "followers" ? followerList : followingList;

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center"
            style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
            onClick={onClose}
        >
            <div
                className="bg-white w-[430px] max-h-[600px] overflow-hidden py-10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center font-bold text-xl mb-4">{username}</div>

                <div className="flex justify-center space-x-40 border-b mb-4">
                    <button
                        onClick={() => setActiveTab("followers")}
                        className={`pb-2 ${
                            activeTab === "followers"
                                ? "text-[#ED6C37] border-b-2 border-[#ED6C37]"
                                : "text-gray-400"
                        }`}
                    >
                        팔로워 {followers.length}
                    </button>
                    <button
                        onClick={() => setActiveTab("followings")}
                        className={`pb-2 ${
                            activeTab === "followings"
                                ? "text-[#ED6C37] border-b-2 border-[#ED6C37]"
                                : "text-gray-400"
                        }`}
                    >
                        팔로잉 {followings.length}
                    </button>
                </div>

                <div className="max-h-[360px] overflow-y-auto space-y-7 pr-2 pl-7">
                    {list.map((user) => (
                        <div key={user.id} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full ml-3"/>
                                <span className="text-sm">{user.name}</span>
                            </div>
                            <div className="flex items-center space-x-2 relative">
                                {user.canMessage ? (
                                    <button className="bg-gray-200 text-sm text-gray-700 w-[110px] h-[35px] rounded-lg">
                                        메시지
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleFollowClick(user.id)}
                                        className="bg-[#ED6C37] text-white text-sm w-[110px] h-[35px] rounded-lg"
                                    >
                                        맞팔로우
                                    </button>
                                )}

                                {activeTab === "followers" ? (
                                    <button
                                        className="text-gray-400 hover:text-[#ED6C37] text-[20pt] ml-5"
                                        onClick={() => handleRemove(user.id)}
                                    >
                                        ×
                                    </button>
                                ) : (
                                    <div ref={dropdownRef} className="relative">
                                        <button
                                            className="text-gray-400 hover:text-orange-400 text-xl ml-5"
                                            onClick={() =>
                                                setDropdownUserId(
                                                    dropdownUserId === user.id ? null : user.id
                                                )
                                            }
                                        >
                                            ⋯
                                        </button>
                                        {dropdownUserId === user.id && (
                                            <div
                                                className="absolute right-7 top-0 mt-2 w-35 bg-white border rounded-lg shadow z-50 items-center"
                                                style={{fontSize: 13}}
                                            >
                                                <button className="block w-full text-left px-6 py-2.5 hover:text-[red]"
                                                        onClick={() => {
                                                            handleRemove(user.id);
                                                            setDropdownUserId(null); // 드롭다운도 닫기
                                                        }}>
                                                    팔로우 취소
                                                </button>
                                                <button className="block w-full text-left px-6 py-2.5 hover:text-[red]">
                                                    알림 끄기
                                                </button>
                                                <button className="block w-full text-left px-6 py-2.5 hover:text-[red]">
                                                    판매 상품 보기
                                                </button>
                                                <button className="block w-full text-left px-6 py-2.5 hover:text-[red]">
                                                    경매 초대하기
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowerModal;
