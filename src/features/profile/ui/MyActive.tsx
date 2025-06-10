import {useState} from "react";
import FollowerModal from "@/features/profile/ui/FollowerModal.tsx";
import {useFollowStore} from "@shared/store/myProfileStore.ts";

interface UserActiveProps {
    followercount: number;
    followingcount: number;
    feedcount: number;
}

const MyActive = ({followercount, followingcount, feedcount} : UserActiveProps) => {

    const [modalOpen, setModalOpen] = useState(false);
    const  {setTab} = useFollowStore();

    return (
        <div>
            <h2 className="font-semibold mb-4"
                style={{color: '#f26522', fontSize: 24, fontWeight: 'bold'}}>
                MY 활동
            </h2>
            <div className="bg-white py-7 rounded-xl shadow border grid grid-cols-3 text-center">
                <div>
                    <div className="text-l text-muted-foreground">
                        게시물
                    </div>
                    <div className="mt-5"
                         style={{fontSize: 36, color: '#ED6C37', fontWeight: 'bold'}}>
                        {feedcount}
                    </div>
                </div>
                <div className="cursor-pointer"
                     onClick={() => {
                         setModalOpen(true);
                         setTab("followers")
                     }}
                >
                    <div className="text-l text-muted-foreground">
                        팔로워
                    </div>
                    <div className="mt-5"
                         style={{fontSize: 36, color: '#ED6C37', fontWeight: 'bold'}}>
                        {followercount}
                    </div>
                </div>
                <div className="cursor-pointer"
                     onClick={() => {
                         setModalOpen(true);
                         setTab("followings")
                     }}>
                    <div className="text-l text-muted-foreground">
                        팔로잉
                    </div>
                    <div className="mt-5"
                         style={{fontSize: 36, color: '#ED6C37', fontWeight: 'bold'}}>
                        {followingcount}
                    </div>
                </div>
            </div>

            {modalOpen && (
                <FollowerModal
                    username="T1 Gumayusi"
                    followers={[
                        { id: 1, name: "이동헌", isMutual: true, canMessage: false },
                        { id: 2, name: "이승엽", isMutual: false, canMessage: true },
                        { id: 3, name: "이승호", isMutual: true, canMessage: false },
                        { id: 4, name: "이동헌", isMutual: true, canMessage: false },
                        { id: 5, name: "이승엽", isMutual: false, canMessage: true },
                        { id: 6, name: "이승호", isMutual: true, canMessage: false },
                        { id: 7, name: "이동헌", isMutual: true, canMessage: false },
                        { id: 8, name: "이승엽", isMutual: false, canMessage: true },
                        { id: 9, name: "이승호", isMutual: true, canMessage: false },
                        { id: 10, name: "이동헌", isMutual: true, canMessage: false },
                        { id: 11, name: "이승엽", isMutual: false, canMessage: true },
                        { id: 12, name: "이승호", isMutual: true, canMessage: false }
                    ]}
                    followings={[
                        { id: 13, name: "김태현", isMutual: false, canMessage: true },
                        { id: 14, name: "오지원", isMutual: true, canMessage: true },
                        { id: 15, name: "이승호", isMutual: true, canMessage: true },
                        { id: 16, name: "이동헌", isMutual: true, canMessage: true },
                        { id: 17, name: "이승엽", isMutual: false, canMessage: true },
                        { id: 18, name: "이승호", isMutual: true, canMessage: true },
                        { id: 19, name: "이동헌", isMutual: true, canMessage: true },
                        { id: 20, name: "이승엽", isMutual: false, canMessage: true },
                        { id: 21, name: "이승호", isMutual: true, canMessage: true }
                    ]}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    )
}

export default MyActive;