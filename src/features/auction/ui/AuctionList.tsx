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
                data.data.map(v => {
                    return (
                        <Card className={'my-4'} onClick={() => onClickAuctionItem(v.id)}>
                            <CardContent className={'flex'}>
                                <div>
                                    <img className={"w-full rounded-lg"} src={v.goods.images[0]}/>
                                </div>
                                <div className={'ml-4 flex flex-col gap-2 justify-between'}>
                                    <div className={'text-xl font-bold'}>
                                        {v.goods.title}
                                    </div>
                                    <div className={'text-lg font-bold'}>
                                        현재가 :{v.startPrice + 100000}
                                    </div>
                                    <div className={'text-sm text-gray-500 '}>
                                        마감까지
                                        :{Math.floor((new Date() - new Date(v.endTime)) / 3600000)}시간 {Math.floor(((new Date() - new Date(v.endTime)) % 3600000) / 60000)}분
                                        남음
                                    </div>
                                    <div>
                                        참여자수 :{v.count} 명
                                    </div>
                                    <div className={'flex h-4 items-center'}>
                                        입찰 : {v.bidCount}
                                        <Divider vertical/>
                                        대화량 : {v.chatCount}
                                        <Divider vertical/>
                                        조회 : {v.viewCount}
                                        <Divider vertical/>
                                        관심 : {v.likeCount}


                                    </div>
                                    <div>
                                        판매자: {v.user.userName}
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