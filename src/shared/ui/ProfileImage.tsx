import React, {FC} from "react";

type Props = {
    src?: string,
    size: number
    onClick?: (e:React.MouseEvent<HTMLImageElement>) => void
}
const ProfileImage: FC<Props> = ({size = 36, src, onClick}) => {
    return (
        <div style={{width:size,height:size}}>
            <img
                onClick={onClick}
                src={src ? import.meta.env.VITE_SERVER_URL + src : "/img/default.png"}
                className={`rounded-full object-cover w-full h-full`}
                alt="profile image"/>
        </div>
    );
};

export default ProfileImage;
