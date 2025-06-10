import { FC } from "react";
import { useQueryGetAuctionById } from "@/features/auction/lib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faEye } from "@fortawesome/free-solid-svg-icons";

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
                {/* 더보기 아이콘 */}
                <div className="absolute top-2 right-3">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>

                {/* 수정/삭제 메뉴 */}
                <div className="absolute top-10 right-3 space-y-1">
                    <div className="bg-white px-3 py-1 rounded-md text-gray-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100">
                        수정
                    </div>
                    <div className="bg-white px-3 py-1 rounded-md text-gray-500 shadow text-sm text-center cursor-pointer hover:bg-gray-100">
                        삭제
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between mt-2">
                    <div className="text-[12px] text-black font-semibold text-left pr-1">
                        <span>[{product.goods.category}]</span>

                    </div>
                    <div className="text-[10px] text-[#ED6C37] flex ">
                        <FontAwesomeIcon icon={faEye} className="mr-1 mt-1" />
                        <span>{product.viewCount || 196}</span>
                    </div>
                </div>
                <div className="text-[12px] text-black font-semibold text-left pb-2 pr-1">
                    <span>{product.goods.title}</span>
                </div>
            </div>
        </div>
    );
};

export default MyPostProduct;
