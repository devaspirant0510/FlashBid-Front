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

type Props = {
    images: FileEntity[]
}
const AuctionImageCarousel: FC<Props> = ({images}) => {

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

    return (
        <div className="mx-auto max-w-xs">
            <Carousel setApi={setApi} className={"w-full max-w-xs"}>

                <CarouselContent className={"w-full"}>
                    {images.map((image, index) => {
                        return(
                            <CarouselItem className={"w-full"} key={index}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <img className={'w-full'} src={import.meta.env.VITE_SERVER_URL+image.url}/>
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
