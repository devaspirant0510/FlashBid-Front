import React, {FC} from "react";
import {useQueryGetAuctionById} from "@/features/auction/lib";
import {Badge} from "@shared/components/ui/badge.tsx";
import AuctionImageCarousel from "@widgets/auction/AuctionImageCarousel.tsx";
import UserProfile from "@/features/user/ui/UserProfile.tsx";
import SellerCard from "@widgets/user/SellerCard.tsx";
import {Button} from "@shared/components/ui/button.tsx";

type Props = {
    id: number

}
const getTimeLeft = (endTime: string) => {
    const now = new Date(endTime);
    const end = new Date();
    let diff = end.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;

    const minutes = Math.floor(diff / (1000 * 60));

    return `${days}일 ${hours}시간 ${minutes}분 남음`;
};
const AuctionInfo: FC<Props> = ({id}) => {
    const {isLoading, isError, error, data} = useQueryGetAuctionById(id);
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>{error}</>
    }
    if (!data || !data.data) {
        return <>no data</>
    }
    return (
        <>
            <div className={"flex"}>
                <Badge className={'bg-[var(--uprimary)] text-white'}>카테고리 - {data.data.goods.category}</Badge>
                <div>경매번호 {data.data.id}</div>
            </div>
            <AuctionImageCarousel images={data.data.goods.images}/>
            <section className={'flex bg-ubackground1 p-4'}>
                <article className={'flex flex-col flex-3'}>
                    <UserProfile userId={data.data.user.id}>
                        {
                            (user) => {
                                return <SellerCard user={user}/>
                            }
                        }
                    </UserProfile>
                    <div className={'flex flex-col '}>
                        <Badge className={'bg-[var(--uprimary)] text-white'}>내용</Badge>
                        {data.data.goods.description}
                    </div>
                </article>
                <div className={'w-24'}></div>
                <article className={'flex-2'}>
                    <div> 현재 판매 가격</div>
                    <div className={'text-uprimary font-bold text-2xl'}>{data.data.startPrice.toLocaleString()}p</div>
                    <button className={"bg-uprimary p-4 rounded-lg border-2 border-usecondary"}>
                        <div>
                            <div className={'text-xl text-white'}> 채팅방 참여하기</div>
                            <div className={'text-white'}>{getTimeLeft(data.data.endTime)}</div>
                        </div>
                    </button>
                    <div>
                        <div className={'flex  rounded-full justify-between items-center mt-4'}>
                            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>참여자</div>
                                <div className={'text-uprimary px-3'}>{data.data.count}명</div>
                            </div>
                            <div className={'rounded-full text-usecondary bg-ubackground2 py-1 px-3'}>
                                3분전
                            </div>
                        </div>
                        <div className={'flex  rounded-full justify-between items-center mt-4'}>
                            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>입찰</div>
                                <div className={'text-uprimary px-3'}>{data.data.bidCount}명</div>
                            </div>
                            <div className={'rounded-full text-usecondary bg-ubackground2 py-1 px-3'}>
                                입찰내역
                            </div>
                        </div>
                        <div className={'flex  rounded-full justify-start items-center mt-4'}>
                            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>배송</div>
                                <div className={'text-uprimary px-3'}>{data.data.goods.deliveryType}명</div>
                            </div>
                        </div>
                    </div>
                </article>

            </section>
            <section className={'flex flex-col bg-ubackground1 p-4'}>
                <div>
                    바로 입찰하기
                </div>
                <div className={'flex justify-between'}>
                    <div className={'text-usecondary'}>현재가 :{data.data.startPrice}p</div>
                    <div className={'text-usecondary'}>입찰단위 : 10,000p</div>
                </div>
                <div className={'rounded-full bg-ubackground2 flex justify-between items-center'}>
                    <div className={'bg-usecondary rounded-full text-white py-2 px-8'}>
                        입찰 가격
                    </div>
                    <div className={'text-uprimary pr-4 text-xl font-bold'}>
                        300,000p
                    </div>

                </div>
                <Button className={'bg-uprimary py-6 text-xl mt-4'}>
                    입찰하기

                </Button>

            </section>

        </>
    );
};

export default AuctionInfo;
