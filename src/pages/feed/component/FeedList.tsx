import {useQueryGetAuctionList} from "@/features/auction/lib";
import {faComment, faExclamation, faFaceSmile, faHeart, faShareNodes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router";

const FeedList = () => {
    const { isLoading, isError, data, error } = useQueryGetAuctionList();
    const navigate = useNavigate();

    if (isLoading) return <>loading</>;
    if (isError) return <>{error?.message || "error"}</>;
    if (!data || !data.data) return <>nodata</>;

    return (
        <div className="px-4 py-6 flex flex-col items-center gap-6" onClick={() => navigate("/FeedInfo")}>
            {data.data.map((v) => (
                <div
                    key={v.id}
                    className="bg-white w-full max-w-[800px] rounded-xl shadow-md px-6 py-5"
                >
                    <div className="flex items-center mb-4">
                        <img
                            onClick={event => event.stopPropagation()}
                            src="/images/profile.jpg"
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-3">
                            <div className="font-semibold">{v.user.userName}</div>
                            <div className="text-sm text-gray-400">2시간 전</div>
                        </div>
                    </div>

                    <div className="text-gray-800 leading-relaxed mb-4 whitespace-pre-line">
                        {v.goods.description}
                    </div>

                    <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-3">
                        <div className="flex gap-3">
                            <button style={{background:"#FFFFFF"}} onClick={event => event.stopPropagation()}><FontAwesomeIcon icon={faHeart} /> {v.likeCount}</button>
                            <button style={{background:"#FFFFFF"}} onClick={event => event.stopPropagation()}><FontAwesomeIcon icon={faComment} /> {v.chatCount}</button>
                        </div>
                        <div className="flex gap-3">
                            <button style={{background:"#FFFFFF"}} onClick={event => event.stopPropagation()}><FontAwesomeIcon icon={faShareNodes} /></button>
                            <button style={{background:"#FFFFFF"}} onClick={event => event.stopPropagation()}><FontAwesomeIcon icon={faExclamation} /></button>
                        </div>
                    </div>

                    <div className="mt-4 border-t pt-3 flex items-center">
                        <input
                            onClick={event => event.stopPropagation()}
                            type="text"
                            placeholder="댓글 작성하기"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-600 placeholder-gray-400 outline-none focus:ring-2"
                        />
                        <button style={{background:"#FFFFFF"}} className="ml-2 text-2xl text-gray-400" onClick={event => event.stopPropagation()}>
                            <FontAwesomeIcon icon={faFaceSmile} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedList;
