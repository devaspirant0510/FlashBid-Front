import {FileEntity} from "@entities/auction/model";

export type User ={
    id: number;
    userName: string;
    userProfileUrl: string;
    email: string;
}
export type Account = {
    id: number;
    nickname: string;
    userProfileUrl: string;
    email: string;
    followers:number;
    followings:number;
    description:string;
    bidCount:number;
    sellCount:number;
    reviewCount:number;
    userType:string;
}

export type AccountDto ={
    user:Account;
    followingCount:number;
    followerCount:number;
    feedCount:number,
    profileImage:FileEntity
}