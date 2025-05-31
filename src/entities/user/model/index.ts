export type User ={
    id: number;
    userName: string;
    userProfileUrl: string;
    email: string;
}
export type Account = {
    id: number;
    userName: string;
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