import React from "react";
import {useQuery} from "@tanstack/react-query";
import {useQueryHotFeed} from "@/features/feed/lib/useQueryHotFeed.ts";
import HotFeedItem from "@widgets/feed/HotFeedItem.tsx";

const HotFeedList = () => {
    const {isLoading, isError, data,} = useQueryHotFeed();
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>error</>
    }
    if (!data || !data.data) {
        return <>no data</>
    }
    return (
        <div>
            <div className={'text-5xl font-bold text-[#B2B2B2] text-center '}>지금 가장 <span
                className={'text-uprimary'}>HOT 커뮤니티</span></div>
            <div className={'text-xl text-center text-[#F7A17E] mt-4 mb-20'}>HOT COMMUNITY</div>
            <div className={'text-end text-uprimary mb-2 mr-2'}>+더보기</div>
            <div className={'border-uprimary border-1'}/>
            {data.data.map((v, index) => {
                return <div key={index}><HotFeedItem feed={v}/></div>
            })}
        </div>
    );
};

export default HotFeedList;
