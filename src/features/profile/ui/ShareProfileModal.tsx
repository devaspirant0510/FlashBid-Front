// src/features/profile/ui/ShareProfileModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/components/ui/dialog.tsx";
import { Button } from "@shared/components/ui/button.tsx";
import { Input } from "@shared/components/ui/input.tsx";

interface ShareProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profileUrl: string;
}

export const ShareProfileModal: React.FC<ShareProfileModalProps> = ({ isOpen, onClose, profileUrl }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // 2초 후 '복사됨' 메시지 초기화
        } catch (error) {
            console.error('클립보드 복사에 실패했습니다:', error);
            alert('링크 복사에 실패했습니다.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-lg">프로필 공유</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <h3 className="text-md font-semibold mb-3">링크 복사</h3>
                    <div className="flex w-full items-center space-x-2">
                        <Input
                            type="text"
                            value={profileUrl}
                            readOnly
                            className="flex-1"
                        />
                        <Button onClick={handleCopyLink}>
                            {isCopied ? '복사됨!' : '복사'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};