import {Account, User} from "@entities/user/model";

export type Goods = {
    title: string;
    description: string;
    deliveryType: '직거래' | '택배' | '협의후 결정';
    images: string[],
    category: string,
}

export type AuctionData = {
    auction: Auction;
    images: FileEntity[];
    bidCount: number;
    chatCount: number;
    likeCount: number;
    participateCount:number;
    currentPrice:number;
}

export type FileEntity = {
    id?: number;
    userId?: object;
    fileName?: string;
    extension?: string;
    url?: string;
    fileType?: string;
    fileId?: number;
}

export type Auction = {
    id: number;
    goods: Goods;
    user: Account;
    viewCount: number;
    auctionType: 'live';
    startPrice: number;
    count: number;
    startTime: string;
    endTime: string;
    createdAt: string;
}

export type Category = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    rootId: Category
}

export type ChatEntity = {
    id:number;
    chatType:"MESSAGE"|"BID_LOG";
    contents:string,
    createdAt:string,
    auction:Auction,
    user:Account,
    biddingLog:BiddingLogEntity
}

export interface BiddingLogEntity {
    id: number;
    bidder: Account;
    auction: Auction;
    createdAt: string;
    price: number ;
    prevPrice: number ;
}
export type BidLog =  {
    id: number
    bidderId: number
    bidderName: string
    profileUrl: string
    price: number
    prevPrice: number
    createdAt: string
}

export type AuctionParticipateUser = {
    nickname: string,
    participantId: number,
    id: number,
    profileUrl: string
}