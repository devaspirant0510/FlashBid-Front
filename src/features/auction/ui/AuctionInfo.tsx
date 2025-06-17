import React, {FC, useCallback} from "react";
import {useQueryGetAuctionById} from "@/features/auction/lib";
import {Badge} from "@shared/components/ui/badge.tsx";
import AuctionImageCarousel from "@widgets/auction/AuctionImageCarousel.tsx";
import UserProfile from "@/features/user/ui/UserProfile.tsx";
import SellerCard from "@widgets/user/SellerCard.tsx";
import {Button} from "@shared/components/ui/button.tsx";
import {Link, useNavigate} from "react-router";
import {axiosClient} from "@shared/lib";
import {useCookies} from "react-cookie";
import Cookies from "js-cookie";

type Props = {
    id: number

}

const AuctionInfo: FC<Props> = ({id}) => {
    const {isLoading, isError, error, data} = useQueryGetAuctionById(id);
    const token = Cookies.get("access_token");
    const navigate = useNavigate();
    const onClickAuctionChat = useCallback(async () => {
        try{
            await axiosClient.post("api/v1/auction/participate", {
                auctionId: id
            }, {
                headers: {
                    Authorization: "Bearer " +token
                }
            } as any)
        }catch (e){
            console.log(e)
        }
        navigate("/auction/chat/" + id)
    }, [id,token])
    if (isLoading) {
        return <>loading</>
    }
    console.log(data)
    if (isError) {
        return <>aa</>
    }
    if (!data || !data.data) {
        return <>no data</>
    }
    return (
        <>

            <div className={"flex gap-2"}>
                <Badge className={'bg-[var(--uprimary)] text-white'}>카테고리 - 전자제품
                    {/*{data.data.goods.category}*/}
                </Badge>
                <div>경매번호 {data.data.auction.id}</div>
            </div>
            <div className={"mt-4 text-2xl font-bold"}>
                {data.data.auction.goods.title}
            </div>
            <div className={'text-[#E36E3E]'}>경매 기간 :{data.data.auction.startTime} ~ {data.data.auction.endTime}</div>
            <AuctionImageCarousel images={data.data.images}/>
            <section className={'flex bg-ubackground1 p-4'}>
                <article className={'flex flex-col flex-3'}>
                    <UserProfile userId={data.data.auction.user.id}>
                        {
                            (user) => {
                                return <SellerCard userDto={user}/>
                            }
                        }
                    </UserProfile>
                    <div className={'flex flex-col '}>
                        <Badge className={'bg-[var(--uprimary)] text-white'}>내용</Badge>
                        {data.data.auction.goods.description}
                    </div>
                </article>
                <div className={'w-24'}></div>
                <article className={'flex-2'}>
                    <div> 현재 판매 가격</div>
                    <div
                        className={'text-uprimary font-bold text-4xl'}>{data.data.currentPrice ? data.data.currentPrice.toLocaleString() : data.data.auction.startPrice.toLocaleString()}p
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
                    <div>
                        <div className={'flex  rounded-full justify-between items-center mt-4'}>
                            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>참여자</div>
                                <div className={'text-uprimary px-3'}>{data.data.participateCount}명</div>
                            </div>
                            <div className={'rounded-full text-usecondary bg-ubackground2 py-1 px-3'}>
                                3분전
                            </div>
                        </div>
                        <div className={'flex  rounded-full justify-between items-center mt-4'}>
                            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>입찰</div>
                                <div className={'text-uprimary px-3'}>{data.data.chatCount}명</div>
                            </div>
                            <div className={'rounded-full text-usecondary bg-ubackground2 py-1 px-3'}>
                                입찰내역
                            </div>
                        </div>
                        <div className={'flex  rounded-full justify-start items-center mt-4'}>
                            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>배송</div>
                                <div className={'text-uprimary px-3'}>{data.data.auction.goods.deliveryType}명</div>
                            </div>
                        </div>
                    </div>
                </article>

            </section>
            <section className={'flex flex-col bg-ubackground1 p-4'}>
                <div>
                    바로 입찰하기
                </div>
                <div className={'flex justify-between mb-2'}>
                    <div className={'text-usecondary'}>현재가
                        :{data.data.currentPrice ? data.data.currentPrice.toLocaleString() : data.data.auction.startPrice.toLocaleString()}p
                    </div>
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
