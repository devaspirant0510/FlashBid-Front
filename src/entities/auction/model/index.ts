import {User} from "@entities/user/model";

export type Goods = {
    title: string;
    description: string;
    deliveryType: '직거래' | '택배' | '협의후 결정';
    images:string[],
    category:string,
}

export type AuctionData ={
    id: number;
    goods: Goods;
    user: User;
    viewCount: number;
    auctionType: 'live';
    startPrice: number;
    count:number;
    startTime: string;
    endTime: string;
    createdAt: string;
    bidCount: number;
    chatCount:number;
    likeCount:number;
}