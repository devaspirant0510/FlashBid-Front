import { FC } from "react";
import { useQueryGetAuctionById } from "@/features/auction/lib";

type Props = {
    id: number;
};

const MyPostProduct: FC<Props> = ({ id }) => {
    const { isLoading, isError, data } = useQueryGetAuctionById(id);

    if (isLoading) return <>로딩 중...</>;
    if (isError || !data?.data) return <>데이터 오류</>;

    const product = data.data;
    const isDev = import.meta.env.VITE_MODE === "development";
    const baseURL = isDev
        ? "http://127.0.0.1:8080"
        : `http://${import.meta.env.VITE_SERVER_URL}:8080`;
    const imageUrl = baseURL + (product.images?.[0]?.url || "/fallback.png");

    return (
        <div>
            <div className="h-[160px] w-[160px] relative overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={imageUrl}
                    alt="product"
                />
            </div>

            <div>
                <div className="flex mt-2 flex-col">
                    <div className="text-[12px] text-black font-semibold text-left pr-1">
                        [카테고리]
                    </div>
                    <div className="text-[12px] text-black font-semibold text-left pr-1">
                        {product.auction.goods.title}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPostProduct;
