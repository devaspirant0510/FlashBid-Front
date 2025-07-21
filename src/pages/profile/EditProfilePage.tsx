import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileImageUploader } from "@/pages/profile/components/ProfileImageUploader";
import { Header } from "@/widgets/ui";

const EditProfilePage = () => {
    const [nickname, setNickname] = useState("");
    const [image, setImage] = useState<{ file: File; previewUrl: string } | null>(null);
    const navigate = useNavigate();

    // ProfileImageUploader 참조용 ref
    const uploaderRef = useRef<{ openFileDialog: () => void }>(null);

    // 페이지 로드 시 localStorage에서 데이터 가져오기
    useEffect(() => {
        const savedNickname = localStorage.getItem("nickname");
        const savedImageUrl = localStorage.getItem("profileUrl");

        if (savedNickname) setNickname(savedNickname);
        if (savedImageUrl) setImage({ file: new File([], ""), previewUrl: savedImageUrl });

        // API 데이터 불러오기용 (나중에 활성화)
        // const fetchProfileData = async () => {
        //     try {
        //         const response = await fetch("/api/user/profile");
        //         const data = await response.json();
        //         setNickname(data.nickname);
        //         setImage({ file: new File([], ""), previewUrl: data.profileUrl });
        //     } catch (error) {
        //         console.error("프로필 데이터를 가져오는 데 실패했습니다.", error);
        //     }
        // };
        // fetchProfileData();
    }, []);

    const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // localStorage에 닉네임 및 이미지 저장
        localStorage.setItem("nickname", nickname);
        if (image) {
            localStorage.setItem("profileUrl", image.previewUrl);
        }

        // API 프로필 업데이트용 (나중에 활성화)
        // const updateProfile = async () => {
        //     try {
        //         const formData = new FormData();
        //         formData.append("nickname", nickname);
        //         if (image) formData.append("profileImage", image.file);

        //         const response = await fetch("/api/user/profile", {
        //             method: "POST",
        //             body: formData,
        //         });
        //         if (!response.ok) throw new Error("프로필 업데이트 실패");
        //         alert("프로필이 수정되었습니다.");
        //         navigate("/Profile");
        //     } catch (error) {
        //         console.error("프로필 업데이트 오류:", error);
        //         alert("프로필 업데이트 실패");
        //     }
        // };
        // updateProfile();

        alert("프로필이 수정되었습니다.");
        navigate("/Profile");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* 상단 Header */}
            <Header />

            <div className="flex justify-center items-center pt-10">
                <div className="bg-white p-10 rounded-xl shadow w-full max-w-2xl">
                    {/* 페이지 제목 */}
                    <h2 className="text-3xl font-bold text-gray-700 mb-8 border-b pb-4">
                        프로필 수정
                    </h2>

                    {/* 프로필 수정 폼 */}
                    <form onSubmit={onSubmit} className="space-y-8">
                        {/* 프로필 이미지 영역 */}
                        <div className="flex flex-col items-center space-y-4">
                            <ProfileImageUploader
                                ref={uploaderRef}
                                image={image}
                                setImage={setImage}
                            />
                            <div className="flex space-x-3">
                                {/* 사진변경 버튼 */}
                                <button
                                    type="button"
                                    onClick={() => uploaderRef.current?.openFileDialog()}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                                >
                                    사진변경
                                </button>
                                {/* 이미지 삭제 버튼 */}
                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>

                        {/* 닉네임 입력 영역 */}
                        <div className="flex items-center space-x-4">
                            <label htmlFor="nickname" className="w-24 text-gray-600 text-lg">
                                별명
                            </label>
                            <input
                                type="text"
                                id="nickname"
                                value={nickname}
                                onChange={onNicknameChange}
                                placeholder="새 닉네임 입력"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* 적용 / 취소 버튼 */}
                        <div className="flex justify-center space-x-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
                            >
                                적용
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/Profile")}
                                className="px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition duration-300"
                            >
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
