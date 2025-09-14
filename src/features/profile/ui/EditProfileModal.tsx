import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@shared/components/ui/dialog.tsx";
import {Button} from "@shared/components/ui/button.tsx";
import {Input} from "@shared/components/ui/input.tsx";
import {ProfileImage} from "@shared/ui";
import {useMutationUpdateProfile} from "@/features/profile/lib/useMutationUpdateProfile.ts";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentNickname: string;
    currentProfileUrl: string;
}

export const EditProfileModal = ({isOpen, onClose, currentNickname, currentProfileUrl}: EditProfileModalProps) => {
    const [nickname, setNickname] = useState(currentNickname);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(currentProfileUrl);

    const updateProfileMutation = useMutationUpdateProfile();

    useEffect(() => {
        setNickname(currentNickname);
        setPreviewUrl(currentProfileUrl);
    }, [currentNickname, currentProfileUrl, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        await updateProfileMutation.mutateAsync({
            nickname: nickname !== currentNickname ? nickname : undefined,
            profileImage: profileImageFile ?? undefined,
        }, {
            onSuccess: () => {
                alert("프로필이 성공적으로 업데이트되었습니다.");
                onClose();
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle style={{fontWeight: 'bold'}}>프로필 수정</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="flex flex-col items-center gap-4">
                        <label htmlFor="profile-image-upload" className="cursor-pointer">
                            <ProfileImage size={120} src={previewUrl}/>
                        </label>
                        <input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <Button variant="outline" onClick={() => document.getElementById('profile-image-upload')?.click()}>
                            사진 변경
                        </Button>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="nickname" className="text-right font-semibold">
                            닉네임
                        </label>
                        <Input
                            id="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>취소</Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={updateProfileMutation.isPending}
                        style={{backgroundColor: '#f26522', color: 'white'}}
                    >
                        {updateProfileMutation.isPending ? '저장 중...' : '저장하기'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};