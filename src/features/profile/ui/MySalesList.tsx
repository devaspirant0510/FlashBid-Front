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

    return (
        <div>
            <div className="bg-gray-200 aspect-square relative">
                {/* 상품 이미지 */}
            </div>

            <div>
                <div className="flex mt-2">
                    <div className="text-[12px] text-black font-semibold text-left pr-1">
                        <span>[{product.goods.category}]</span>
                        <span>{product.goods.title}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPostProduct;
