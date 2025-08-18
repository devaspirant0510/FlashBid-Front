import React, {FC} from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@shared/components/ui/carousel.tsx";
import {Card, CardContent} from "@shared/components/ui/card.tsx";
import {FileEntity} from "@entities/auction/model";
import {HeartIcon} from "lucide-react";
import AuctionWishListButton from "@/features/auction/ui/AuctionWishListButton.tsx";
import {useParams} from "react-router";
import {getServerURL} from "@shared/lib";

type Props = {
    images: FileEntity[],
    isWishListed: boolean
}
const AuctionImageCarousel: FC<Props> = ({images,isWishListed}) => {

    const {id:auctionId} = useParams<{ id: number }>();
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    if(!auctionId){
        return <></>
    }

    return (
        <div className="mx-auto max-w-xs">
            <Carousel setApi={setApi} className={"w-full max-w-xs"}>

                <CarouselContent className={"w-full"}>
                    {images.map((image, index) => {
                        return(
                            <CarouselItem className={"w-full"} key={index}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                                        <img className="w-full h-full object-cover" src={getServerURL() + image.url} />
                                        <div className="absolute right-4 bottom-4 bg-white rounded-full p-1 flex items-center justify-center shadow">
                                            <AuctionWishListButton isWishListed={isWishListed} auctionId={auctionId}/>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
                <div className={'text-center'}>
                    {current}/{count}
                </div>
            </Carousel>
        </div>
    );
};

export default AuctionImageCarousel;
