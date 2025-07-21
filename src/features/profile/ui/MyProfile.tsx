import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage_dumi from "@/pages/profile/components/ProfileImage_dumi";
//import { ProfileImage } from "@shared/ui";

interface User {
    nickname: string;
    email: string;
    url: string;
}

const MyProfile = ({ nickname, email, url }: User) => {
    const navigate = useNavigate();

    // 상태로 이미지 및 닉네임 관리
    const [profileImage, setProfileImage] = useState<string | null>(url);
    const [userNickname, setUserNickname] = useState<string>(nickname);

    useEffect(() => {
        // API로 프로필 데이터 불러오기 (나중에 활성화)
        // const fetchProfileData = async () => {
        //     try {
        //         const response = await fetch("/api/user/profile"); // API 엔드포인트로 요청
        //         const data = await response.json();
        //         setUserNickname(data.nickname);
        //         setProfileImage(data.profileUrl); // API에서 받은 URL로 프로필 이미지 설정
        //     } catch (error) {
        //         console.error("프로필 데이터를 가져오는 데 실패했습니다.", error);
        //     }
        // };

        //fetchProfileData();

        // 로컬 스토리지에서 불러오는 부분 (API가 없는 경우 대체)
        const savedImage = localStorage.getItem("profileUrl");
        const savedNickname = localStorage.getItem("nickname");

        if (savedImage) {
            setProfileImage(savedImage);
        }
        if (savedNickname) {
            setUserNickname(savedNickname);
        }
    }, []); // 컴포넌트가 마운트될 때만 실행

    return (
        <aside className="col-span-3 space-y-4 mt-30">
            <h2
                className="font-semibold"
                style={{ color: '#f26522', fontSize: 24, fontWeight: 'bold' }}
            >
                MY 프로필
            </h2>

            <div className="bg-white rounded-xl shadow border text-center">
                <div className="py-10">
                    <div className="flex justify-center">
                        {/* 프로필 이미지 반영 */}
                        {/*<ProfileImage size={100} src={profileImage || url} />*/}
                        <ProfileImage_dumi size={100} src={profileImage || url} />
                    </div>

                    <div className="font-semibold mt-3">{userNickname}</div>
                    <div className="text-sm text-muted-foreground">{email}</div>

                    <button
                        className="w-2/3 rounded-4xl bg-orange-100 py-2 mt-5"
                        style={{ backgroundColor: '#E3E3E3', color: '#969696' }}
                    >
                        본인인증
                    </button>

                    <div className="space-y-1 mt-10">
                        <button
                            className="w-2/3 rounded-4xl py-2"
                            style={{ backgroundColor: '#FFDDCF', color: '#FB8A5B' }}
                            onClick={() => navigate("/Profile/edit")}
                        >
                            프로필 수정
                        </button>
                        <button
                            className="w-2/3 rounded-4xl py-2 mb-10"
                            style={{ backgroundColor: '#FFDDCF', color: '#FB8A5B' }}
                        >
                            프로필 공유
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl text-sm">
                    <div
                        className="flex justify-between border-2 p-5 text-center items-center"
                        style={{
                            borderColor: '#CBA89A',
                            fontSize: '16px',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderBottom: 'none',
                        }}
                    >
                        <span style={{ color: '#969696' }}>나의 캐시</span>
                        <span style={{ color: '#F7A17E', fontSize: '24px', fontWeight: 'bold' }}>
                            5,500
                        </span>
                    </div>

                    <div
                        className="flex justify-between border-2 p-5 text-center items-center"
                        style={{
                            borderColor: '#CBA89A',
                            fontSize: '16px',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderBottom: 'none',
                        }}
                    >
                        <span style={{ color: '#969696' }}>관심 상품</span>
                        <span style={{ color: '#F7A17E', fontSize: '24px', fontWeight: 'bold' }}>
                            3
                        </span>
                    </div>

                    <div
                        className="flex justify-between border-2 p-5 text-center items-center"
                        style={{
                            borderColor: '#CBA89A',
                            fontSize: '16px',
                            borderLeft: 'none',
                            borderRight: 'none',
                        }}
                    >
                        <span style={{ color: '#969696' }}>입찰 상품</span>
                        <span style={{ color: '#F7A17E', fontSize: '24px', fontWeight: 'bold' }}>
                            7
                        </span>
                    </div>
                </div>

                <div className="text-center py-5" style={{ color: '#969696', fontSize: '14px' }}>
                    회원탈퇴
                </div>
            </div>
        </aside>
    );
};

export default MyProfile;
