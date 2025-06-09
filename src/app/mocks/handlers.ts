import {http, HttpResponse} from 'msw';
import {fakerKO} from '@faker-js/faker';
import {ApiResult, ApiResultBuilder} from "@entities/common";
import {AuctionData} from "@entities/auction/model";
import {Account} from "@entities/user/model";

const fakerT1 = fakerKO;

export const handlers = [
    http.get("/api/user/:id",()=>{
        const user:Account = {
            id:fakerT1.number.int(),
            description:fakerT1.lorem.lines(1),
            email:fakerT1.internet.email(),
            followers:fakerT1.number.int({min:10,max:2000}),
            followings:fakerT1.number.int({min:10,max:2000}),
            userName:fakerT1.person.fullName(),
            userProfileUrl: fakerT1.image.avatar(),
            userType:"CUSTOMER",
            bidCount:fakerT1.number.int({min:10,max:100}),
            reviewCount:fakerT1.number.int({min:4,max:25}),
            sellCount:fakerT1.number.int({min:4,max:45}),
        }
        return HttpResponse.json(ApiResultBuilder<Account>(user));
    }),

    http.get("/api/auction/live/:id", () => {
        return HttpResponse.json(
            {
                apiHeader: {
                    code: 200,
                    status: "OK",
                },
                data: {
                    id: fakerT1.number.int(),
                    goods: {
                        title: `[${fakerT1.company.name()}] ` + fakerT1.commerce.productName() + ' 경매',
                        description: fakerT1.commerce.productDescription() + fakerT1.lorem.lines(10),
                        deliveryType: ['직거래', '택배', '협의후 결정'][Math.floor(Math.random() * 3)],
                        images: Array.from({length: Math.ceil(Math.random() * 7) + 3}, () => {
                            return fakerT1.image.url({width: 200, height: 200})
                        }),
                        category: [
                            "전자제품",
                            "한정판 스니커즈",
                            "빈티지 시계",
                            "아이돌 굿즈",
                            "미술 작품",
                            "중고 서적",
                            "레고 세트",
                            "캠핑 용품",
                            "피규어",
                            "디지털 아트"
                        ][Math.floor(Math.random() * 9)],
                    },
                    user: {
                        id: fakerT1.number.int(),
                        userName: fakerT1.person.fullName(),
                        userProfileUrl: fakerT1.image.avatar(),
                        email: fakerT1.internet.email(),
                    },
                    viewCount: fakerT1.number.int({min:100,max:100000}),
                    auctionType: "live",
                    count: Math.ceil(Math.random() * 1000) + 75,
                    likeCount:Math.ceil(Math.random() * 1000) + 75,
                    chatCount:Math.ceil(Math.random() * 1000) + 75,
                    bidCount:Math.ceil(Math.random() * 1000) + 75,
                    startPrice: Math.ceil(Math.random() * 1000) * 1000,
                    startTime: fakerT1.date.anytime(),
                    endTime: fakerT1.date.between({from: new Date() - 60 * 60 * 1000 * 12, to: new Date(),}),
                    createdAt: fakerT1.date.anytime(),
                },
                error: null,
                message: "test",
                method: "GET",
                path: "/api/auction/live", // ← 여기도 경로 일치하게!
                timestamp: Date.now().toString(),
            }

        )

    }),
    http.get("/api/auction/live", () => {
        const result: ApiResult<AuctionData[]> = {
            apiHeader: {
                code: 200,
                status: "OK",
            },
            data: Array.from({length: 20}, () => ({
                id: fakerT1.number.int(),
                goods: {
                    title: `[${fakerT1.company.name()}] ` + fakerT1.commerce.productName() + ' 경매',
                    description: fakerT1.commerce.productDescription() + fakerT1.lorem.lines(10),
                    deliveryType: ['직거래', '택배', '협의후 결정'][Math.floor(Math.random() * 3)],
                    images: Array.from({length: Math.ceil(Math.random() * 7) + 3}, () => {
                        return fakerT1.image.url({width: 200, height: 200})
                    }),
                    category: [
                        "전자제품",
                        "한정판 스니커즈",
                        "빈티지 시계",
                        "아이돌 굿즈",
                        "미술 작품",
                        "중고 서적",
                        "레고 세트",
                        "캠핑 용품",
                        "피규어",
                        "디지털 아트"
                    ][Math.floor(Math.random() * 9)],
                },
                user: {
                    id: fakerT1.number.int(),
                    userName: fakerT1.person.fullName(),
                    userProfileUrl: fakerT1.image.avatar(),
                    email: fakerT1.internet.email(),
                },
                viewCount: fakerT1.number.int({min:100,max:100000}),
                auctionType: "live",
                count: Math.ceil(Math.random() * 1000) + 75,
                likeCount:Math.ceil(Math.random() * 1000) + 75,
                chatCount:Math.ceil(Math.random() * 1000) + 75,
                bidCount:Math.ceil(Math.random() * 1000) + 75,
                startPrice: Math.ceil(Math.random() * 1000) * 1000,
                startTime: fakerT1.date.anytime(),
                endTime: fakerT1.date.between({from: new Date() - 60 * 60 * 1000 * 12, to: new Date(),}),
                createdAt: fakerT1.date.anytime(),
            })) as AuctionData[],
            error: null,
            message: "test",
            method: "GET",
            path: "/api/auction/live", // ← 여기도 경로 일치하게!
            timestamp: Date.now().toString(),
        };

        return HttpResponse.json(result);
    }),
    http.get("/api/category", () => {
        const result: ApiResult<string[]> = {
            apiHeader: {
                code: 200,
                status: "OK"
            },
            data: [
                "전자제품",
                "한정판 스니커즈",
                "빈티지 시계",
                "아이돌 굿즈",
                "미술 작품",
                "중고 서적",
                "레고 세트",
                "캠핑 용품",
                "피규어",
                "디지털 아트"

            ],
            error: null,
            message: "test",
            method: "GET",
            path: "/api/category",
            timestamp: "202103644"
        }
        return HttpResponse.json(result);
    }),
    http.get('/api/auction-list', () => {
        const fakeData = Array.from({length: 20}, () => ({
            id: fakerT1.string.uuid(),
            image: fakerT1.image.url(),
            title: `[${fakerT1.company.name()}]` + fakerT1.commerce.productName() + ' 경매',
            description: fakerT1.commerce.productDescription() + fakerT1.lorem.lines(10),
            createdAt: fakerT1.date.anytime(),
        }));

        return HttpResponse.json(fakeData);
    }),
];
