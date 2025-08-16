import {useQueryGetAuctionList} from "@/features/auction/lib";
import {Card, CardContent, CardHeader} from "@shared/components/ui/card.tsx";
import {Divider} from "@shared/ui";
import {useCallback} from "react";
import {useNavigate} from "react-router";
import {
    Clock3Icon, CreditCardIcon,
    EyeIcon, HeartIcon,
    MessageSquareDiffIcon,
    MessageSquareIcon,
    MessageSquareMoreIcon,
    ViewIcon
} from "lucide-react";
import {DateUtil, getServerURL} from "@shared/lib";

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
                data.data.map((v, index) => {
                    return (
                        <Card key={index} className={'my-4'} onClick={() => onClickAuctionItem(v.auction.id)}>
                            <CardContent className={'flex'}>
                                <div className={'flex-1'}>
                                    <img className={" rounded-xl w-full h-48 object-fill border-1"}
                                         src={getServerURL() + v.images[0].url}/>
                                </div>
                                <div className={'flex-4 ml-4 flex flex-col gap-2 justify-between'}>
                                    <div
                                        className={'text-gray-400'}>[{v.auction.category.name}]
                                    </div>
                                    <div className={'text-xl font-bold'}>
                                        {v.auction.goods.title}
                                    </div>
                                    <div className={'text-gray-500 flex gap-1 text-sm'}>
                                       <span className={'text-[#F7A17E]'}>
                                           판매자
                                       </span>
                                        <span>
                                            {v.auction.user.nickname}
                                        </span>
                                    </div>
                                    <div className={'text-xl font-bold flex gap-2'}>
                                        <span className={'text-[#F7A17E]'}>
                                         현재가
                                        </span>
                                        <span>
                                            {v.currentPrice?v.currentPrice.toLocaleString():v.auction.startPrice.toLocaleString()}p
                                        </span>
                                    </div>
                                    <div>
                                        참여자수 <strong>{v.participateCount} 명</strong> | 입찰 <strong>{Math.ceil(Math.random() * 50)}</strong>
                                    </div>
                                    <div className={' text-gray-400 text-sm flex gap-1 items-center'}>
                                        <Clock3Icon size={20}/>
                                        {DateUtil.timeAgo(v.auction.createdAt)}
                                    </div>
                                </div>
                                <div className={'flex h-full items-center flex-col'}>
                                    <div className={'flex gap-1 justify-between w-16'}>
                                        <EyeIcon className={'text-black'}/>
                                        0
                                    </div>
                                    <div className={'flex gap-1 justify-between w-16'}>
                                        <MessageSquareIcon className={'text-black'}/>
                                        {v.chatMessagingCount}
                                    </div>
                                    <div className={'flex gap-1 justify-between w-16'}>
                                        <HeartIcon className={'text-black'}/>
                                        {v.wishListCount}
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