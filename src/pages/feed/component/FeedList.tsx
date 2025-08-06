import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { httpFetcher } from "@shared/lib";
import { ApiResult } from "@entities/common";
import { useNavigate } from "react-router";
import {
    faComment,
    faExclamation,
    faHeart,
    faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTime } from "@pages/feed/getTime.ts";
import CommentInput from "@pages/feed/CommentInput.tsx";
import CommentList from "@pages/feed/CommentList.tsx";
import {ProfileImage} from "@shared/ui";

interface User {
    nickname: string;
    profileUrl?: string;
}

interface Feed {
    id: number | string;
    contents: string;
    createdAt: string;
    user: User;
}

interface Image {
    url: string;
    fileName: string;
}

export interface FeedWrapper {
    feed: Feed;
    images: Image[];
    commentCount: number;
    likeCount: number;
}

const FeedList = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["api", "v1", "feed", "test-all"],
        queryFn: httpFetcher<ApiResult<FeedWrapper[]>>,
    });

    const navigate = useNavigate();
    const [commentVisibleMap, setCommentVisibleMap] = useState<{ [key: number]: boolean }>({});

    const toggleComment = (feedId: number) => {
        setCommentVisibleMap((prev) => ({ ...prev, [feedId]: !prev[feedId] }));
    };

    if (isLoading) return <>loading</>;
    if (isError) return <>{error?.message || "error"}</>;
    if (!data || !data.data) return <>nodata</>;

    return (
        <div className="px-4 py-6 flex flex-col items-center gap-6">
            {data.data.map((v) => {
                const feedId = Number(v.feed.id);
                const isVisible = commentVisibleMap[feedId] ?? false;

                return (
                    <div key={feedId} className="bg-white w-full rounded-xl shadow-md px-6 py-5">
                        <div className="flex items-center mb-4">
                            <ProfileImage src={v.feed.user.profileUrl} size={48} onClick={(e) => e.stopPropagation()}/>
                            <div className="ml-3">
                                <div className="font-semibold">{v.feed.user.nickname}</div>
                                <div className="text-sm text-gray-400">{getTime(v.feed.createdAt)}</div>
                            </div>
                        </div>
                        <div onClick={() => navigate(`/FeedInfo/${feedId}`)}>
                            <div className="text-gray-800 leading-relaxed mb-4 whitespace-pre-line">
                                {v.feed.contents}
                            </div>
                            {v.images.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto mb-3 flex items-center">
                                    {v.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={`${getServerURL()}${img.url}`}
                                            alt={img.fileName}
                                            className="h-60 rounded-md object-cover"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-3">
                            <div className="flex gap-3">
                                <button onClick={(e) => e.stopPropagation()}><FontAwesomeIcon icon={faHeart} /> {v.likeCount}</button>
                                <button onClick={(e) => { e.stopPropagation(); toggleComment(feedId); }}><FontAwesomeIcon icon={faComment} /> {v.commentCount}</button>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={(e) => e.stopPropagation()}><FontAwesomeIcon icon={faShareNodes} /></button>
                                <button onClick={(e) => e.stopPropagation()}><FontAwesomeIcon icon={faExclamation} /></button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <CommentInput feedId={feedId} />
                        </div>

                        {isVisible && <CommentList feedId={feedId} />}
                    </div>
                );
            })}
        </div>
    );
};

export default FeedList;