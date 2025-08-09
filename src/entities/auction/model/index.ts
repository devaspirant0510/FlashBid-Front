import {Account, User} from "@entities/user/model";

export enum DELIVERY_TYPE {
    DIRECT = "DIRECT",
    PARCEL = "PARCEL",
    NEGOTIATE = "NEGOTIATE",
}
export type Goods = {
    title: string;
    description: string;
    deliveryType: DELIVERY_TYPE;
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
export type Category ={
    createdAt:string;
    id:number;
    name:string
    root:string
    updatedAt:Date;
}
export type AuctionInfoData = {
    auction: Auction;
    images: FileEntity[];
    biddingCount: number;
    chatCount: number;
    likeCount: number;
    participateCount:number;
    lastBiddingLog:BiddingLogEntity;
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
    category:Category;
    viewCount: number;
    auctionType: 'live';
    startPrice: number;
    count: number;
    startTime: string;
    endTime: string;
    createdAt: string;
    tradingArea:TradingArea
    deliveryInfo:DeliveryInfo
}
export type TradingArea = {
    id: number,
    latitude: number,
    longitude: number,
    radius: number,
    address: number
}

type DeliveryInfo = {
    id: number,
    deliveryFee: number
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