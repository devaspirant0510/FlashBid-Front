import React, { FC } from "react";

type Props = {
    src?: string,
    size: number,
    onClick?: (e: React.MouseEvent<HTMLImageElement>) => void
}

const ProfileImage: FC<Props> = ({ size = 36, src, onClick }) => {
    // Base64 URL인지 확인하고, Base64인 경우 그대로 사용
    const isBase64 = src && src.startsWith("data:image");

    return (
        <div style={{ width: size, height: size }}>
            <img
                onClick={onClick}
                // Base64 이미지라면 서버 URL을 붙이지 않고, 그렇지 않으면 서버 URL을 사용
                src={isBase64 ? src : (src ? "http://localhost:5173" + src : "/img/default.png")}
                className="rounded-full object-cover w-full h-full"
                alt="profile image"
            />
        </div>
    );
};

export default ProfileImage;
