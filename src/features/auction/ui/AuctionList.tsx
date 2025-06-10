import {useQueryGetAuctionList} from "@/features/auction/lib";
import {Card, CardContent, CardHeader} from "@shared/components/ui/card.tsx";
import {Divider} from "@shared/ui";
import {useCallback} from "react";
import {useNavigate} from "react-router";

const AuctionList = () => {
    const navigate = useNavigate();
    const {isLoading, isError, data, error} = useQueryGetAuctionList();

    const onClickAuctionItem = useCallback((id: number) => {
        navigate("/auction/live/" + id);
    }, [])
    console.log(data)

    if (isLoading) {
        return (
            <>
                loading
            </>
        )
    }
    if (isError) {
        return (
            <>{error}</>
        );
    }
    if (!data || !data.data) {
        return <>nodata</>
    }
    return (
        <>
            {
                data.data.map((v,index) => {
                    return (
                        <Card key={index} className={'my-4'} onClick={() => onClickAuctionItem(v.auction.id)}>
                            <CardContent className={'flex'}>
                                <div className={'flex-1'}>
                                    <img className={" rounded-lg w-full h-48 object-contain object-fill"} src={import.meta.env.VITE_SERVER_URL+v.images[0].url}  />
                                </div>
                                <div className={'flex-4 ml-4 flex flex-col gap-2 justify-between'}>
                                    <div className={'text-xl font-bold'}>
                                        {v.auction.goods.title}
                                    </div>
                                    <div className={'text-lg font-bold'}>
                                        현재가 :{v.auction.startPrice + 100000}
                                    </div>
                                    <div className={'text-sm text-gray-500 '}>
                                        마감까지
                                        :{Math.floor((new Date() - new Date(v.auction.endTime)) / 3600000)}시간 {Math.floor(((new Date() - new Date(v.auction.endTime)) % 3600000) / 60000)}분
                                        남음
                                    </div>
                                    <div>
                                        참여자수 :{v.auction.count} 명
                                    </div>
                                    <div className={'flex h-4 items-center'}>
                                        입찰 : {v.bidCount}
                                        <Divider vertical/>
                                        대화량 : {v.chatCount}
                                        <Divider vertical/>
                                        조회 : {v.auction.viewCount}
                                        <Divider vertical/>
                                        관심 : {v.likeCount}


                                    </div>
                                    <div>
                                        판매자: {v.auction.user.nickname}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    )
                })
            }
        </>
    )

}
export default AuctionList;