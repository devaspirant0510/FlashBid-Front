import {useState} from "react";
import {FollowListModal} from "@/features/profile/ui/FollowListModal.tsx";

type Props = {
    followercount: number,
    followingcount: number,
    feedcount: number
}

const MyActive = ({followercount, followingcount, feedcount}: Props) => {
    const [modalState, setModalState] = useState<{ isOpen: boolean, type: 'followers' | 'followings' | null }>({
        isOpen: false,
        type: null,
    });

    const openModal = (type: 'followers' | 'followings') => {
        setModalState({ isOpen: true, type });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: null });
    };

    return (
        <div>
            <h2 className="font-semibold mb-4" style={{color: '#f26522', fontSize: 24, fontWeight: 'bold'}}>
                MY 활동
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div
                    className="bg-white rounded-xl shadow border p-6 cursor-pointer hover:bg-orange-50 transition-colors"
                    onClick={() => openModal('followers')}
                >
                    <div className="text-lg font-semibold text-gray-600">팔로워</div>
                    <div className="text-3xl font-bold text-orange-500 mt-2">{followercount}</div>
                </div>
                <div
                    className="bg-white rounded-xl shadow border p-6 cursor-pointer hover:bg-orange-50 transition-colors"
                    onClick={() => openModal('followings')}
                >
                    <div className="text-lg font-semibold text-gray-600">팔로잉</div>
                    <div className="text-3xl font-bold text-orange-500 mt-2">{followingcount}</div>
                </div>
                <div className="bg-white rounded-xl shadow border p-6">
                    <div className="text-lg font-semibold text-gray-600">게시글</div>
                    <div className="text-3xl font-bold text-orange-500 mt-2">{feedcount}</div>
                </div>
            </div>

            {modalState.isOpen && modalState.type && (
                <FollowListModal
                    isOpen={modalState.isOpen}
                    onClose={closeModal}
                    type={modalState.type}
                />
            )}
        </div>
    );
};

export default MyActive;