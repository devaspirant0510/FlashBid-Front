import React, {FC, useCallback} from "react";
import {useQueryGetAuctionById} from "@/features/auction/lib";
import {Badge} from "@shared/components/ui/badge.tsx";
import AuctionImageCarousel from "@widgets/auction/AuctionImageCarousel.tsx";
import UserProfile from "@/features/user/ui/UserProfile.tsx";
import SellerCard from "@widgets/user/SellerCard.tsx";
import {Button} from "@shared/components/ui/button.tsx";
import {Link, useNavigate} from "react-router";
import {axiosClient, DateUtil} from "@shared/lib";
import {useCookies} from "react-cookie";
import Cookies from "js-cookie";
import {ChartLine} from "lucide-react";
import AuctionInfoStatus from "@widgets/auction/AuctionInfoStatus.tsx";
import AuctionBiddingNow from "@/features/auction/ui/AuctionBiddingNow.tsx";
import {useMutation} from "@tanstack/react-query";
import FetchAccountStatus from "@/features/profile/ui/FetchAccountStatus.tsx";
import {ProfileImage} from "@shared/ui";

type Props = {
    id: number

}

const AuctionInfo: FC<Props> = ({id}) => {
    const {isLoading, isError, error, data} = useQueryGetAuctionById(id);
    const token = Cookies.get("access_token");
    const navigate = useNavigate();
    // POST 요청 mutation
    const {isPending, mutate} = useMutation({
        mutationFn: async () => {
            return axiosClient.post("api/v1/auction/participate", {
                auctionId: id
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            } as any);
        },
        onSuccess: () => {
            // 성공 시 채팅방 이동
            navigate(`/auction/chat/${id}`);
        },
        onError: (error) => {
            console.error("경매 참여 실패", error);
            navigate(`/auction/chat/${id}`);
        }
    });

    const onClickAuctionChat = useCallback(() => {
        mutate();
    }, [mutate]);
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>aa</>
    }
    if (!data || !data.data) {
        return <>no data</>
    }
    if(isPending){
        return <>참여하는중</>
    }
    return (
        <>

            <div className={"flex gap-2"}>
                <Badge className={'bg-[var(--uprimary)] text-white'}>카테고리 - {data.data.auction.category.name}
                    {/*{data.data.goods.category}*/}
                </Badge>
                <div>경매번호 {data.data.auction.id}</div>
            </div>
            <div className={"mt-4 text-2xl font-bold flex justify-between"}>
                <div>
                    {data.data.auction.goods.title}
                </div>
                <Button onClick={() => navigate(`/auction/live/${id}/bid-history`)}>
                    <ChartLine/>
                    거래 내역 상세보기
                </Button>
            </div>
            <div className={'text-[#E36E3E]'}>경매 기간
                :{DateUtil.convertDateFormat(data.data.auction.startTime, "yyyy년MM월dd일 hh시mm분")} ~ {DateUtil.convertDateFormat(data.data.auction.endTime, "yyyy년MM월dd일 hh시mm분")}</div>
            <AuctionImageCarousel images={data.data.images} isWishListed={data.data.isWishListed}/>
            <section className={'flex bg-ubackground1 p-4'}>
                <article className={'flex flex-col flex-3'}>

                    <Badge className={'bg-[var(--uprimary)] text-white mb-1'}>판매자</Badge>
                    <FetchAccountStatus accountId={data.data.auction.user.id}>
                        {(data)=>{
                            return <div className={'flex'}>
                                <ProfileImage size={60} src={data.profileUrl}/>
                                <div className={'ml-2'}>
                                    <div>
                                        {data.nickname}
                                    </div>
                                    <div>입찰 {data.biddingCount} | 판매 {data.sellCount} | 리뷰 {data.reviewCount ??0 }</div>
                                    <div>팔로워 {data.followerCount} | 팔로잉 {data.followingCount}</div>
                                </div>
                            </div>

                        }}
                    </FetchAccountStatus>
                    <div className={'flex flex-col '}>
                        <Badge className={'bg-[var(--uprimary)] text-white'}>내용</Badge>
                        {data.data.auction.goods.description}
                    </div>
                </article>
                <div className={'w-24'}></div>
                <article className={'flex-2'}>
                    <div> 현재 판매 가격</div>
                    <div
                        className={'text-uprimary font-bold text-4xl'}>{data.data.lastBiddingLog ? data.data.lastBiddingLog.price.toLocaleString() : data.data.auction.startPrice.toLocaleString()}p
                    </div>

                    <button
                        onClick={onClickAuctionChat}
                        className={"bg-uprimary p-4 rounded-xl border-2 border-usecondary w-full mt-4 "}>
                        <div>
                            <div className={'text-xl text-white'}> 채팅방 참여하기</div>
                            <div
                                className={'text-white'}>{Math.ceil(Math.random() * 3)}일 {Math.ceil(Math.random() * 11)}시간
                                남음
                            </div>
                        </div>
                    </button>
                    <AuctionInfoStatus data={data.data}/>
                </article>

            </section>
            <AuctionBiddingNow data={data.data}/>

        </>
    );
};

export default AuctionInfo;
