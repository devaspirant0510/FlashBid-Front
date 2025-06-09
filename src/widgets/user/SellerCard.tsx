import React, {FC} from "react";
import UserProfile from "@/features/user/ui/UserProfile.tsx";
import {Account, AccountDto} from "@entities/user/model";
import {Badge} from "@shared/components/ui/badge.tsx";
import userProfile from "@/features/user/ui/UserProfile.tsx";

type Props = {
    userDto: AccountDto
}
const SellerCard: FC<Props> = ({userDto}) => {
    const user = userDto.user;
    return (
        <>
            <Badge className={'bg-[var(--usecondary)] mb-2'}>판매자</Badge>
            <div className={'flex  items-center gap-4'}>
                <div>
                    <img className={'rounded-full w-24 h-24'} src={import.meta.env.VITE_SERVER_URL+(userDto.profileImage?userDto.profileImage.url:"/uploads/default.jpg")}/>
                </div>
                <div>
                    <span className={'font-bold text-lg'}>{user.nickname}</span>
                    <div>
                        입찰 {user.bidCount} | 판매 {user.sellCount} | 리뷰 {user.reviewCount}

                    </div>
                    <div>
                        팔로우 {user.followers} | 팔로잉 {user.followings}
                    </div>
                </div>
                <div>
                    <Badge  className={'bg-[var(--usecondary)]'}>DM</Badge>
                </div>
            </div>
        </>
    );
};

export default SellerCard;
