import React, {FC} from "react";
import {FeedWrapper} from "@pages/feed/component/FeedList.tsx";
import {ProfileImage} from "@shared/ui";
import {HeartIcon, MessageSquareIcon} from "lucide-react";

type Props = {
    feed:FeedWrapper
}
const HotFeedItem:FC<Props> = ({feed}) => {

    return (
        <div className={''}>
            <div className={'flex items-center gap-2 my-2 flex-1'}>
                <div className={'flex flex-1 gap-2'}>
                    <ProfileImage size={40} src={feed.feed.user.profileUrl}/>
                    <div className={'flex-col flex gap-1'}>
                        <div>{feed.feed.user.nickname}</div>
                        <div className={'rounded-full py-0.5 px-1 bg-[#FD6F3E] text-white w-12 text-xs text-center '}>팔로우</div>
                    </div>
                </div>
                <div className={'truncate flex-4'}>{feed.feed.contents}</div>
                <div className={'flex flex-1 justify-evenly'}>
                    <div className={'flex items-center justify-between gap-2'}>
                        <MessageSquareIcon/>
                        <span>{feed.commentCount}</span>
                    </div>
                    <div className={'flex items-center justify-between gap-2'}>
                        <HeartIcon/>
                        <span>{feed.likeCount}</span>
                    </div>

                </div>
            </div>
            <hr/>
        </div>
    );
};

export default HotFeedItem;
