import React from "react";
import {
    CalendarDaysIcon,
    DotIcon,
    EllipsisIcon,
    GavelIcon,
    ListCheck,
    ListCheckIcon,
    MenuIcon,
    TriangleAlertIcon
} from "lucide-react";

const AuctionChatMenu = () => {
    return (
        <div className={"flex flex-col rounded-2xl bg-[#FFD1BE] pt-8 h-full mt-8"}>
            <div
                className={"bg-white border-[#FFD1BE] border-solid border-1 flex justify-center items-center flex-col py-3 px-2"}>
                <div className={'w-10 h-10 bg-[#FFD1BE] rounded-full flex justify-center items-center '}>
                    <EllipsisIcon className={'text-[#FEFDFD] border-0.5 border-[#DADADA]'}/>
                </div>
                <span className={'text-xs mt-1'}>
                    더보기
                </span>
            </div>
            <div
                className={"bg-white border-[#FFD1BE] border-solid border-1 flex justify-center items-center flex-col py-3 px-2"}>
                <div className={'w-10 h-10 bg-[#FFD1BE] rounded-full flex justify-center items-center '}>
                    <ListCheckIcon className={'text-[#FEFDFD] border-0.5 border-[#DADADA]'}/>
                </div>
                <span className={'text-xs mt-1'}>
                    입찰내역
                </span>
            </div>
            <div
                className={"bg-white border-[#FFD1BE] border-solid border-1 flex justify-center items-center flex-col py-3 px-2"}>
                <div className={'w-10 h-10 bg-[#FFD1BE] rounded-full flex justify-center items-center '}>
                    <CalendarDaysIcon className={'text-[#FEFDFD] border-0.5 border-[#DADADA]'}/>
                </div>
                <span className={'text-xs mt-1'}>
                    경매일정
                </span>
            </div>
            <div
                className={"bg-white border-[#FFD1BE] border-solid border-1 flex justify-center items-center flex-col py-3 px-2"}>
                <div className={'w-10 h-10 bg-[#FFD1BE] rounded-full flex justify-center items-center '}>
                    <TriangleAlertIcon className={'text-[#FEFDFD] border-0.5 border-[#DADADA]'}/>
                </div>
                <span className={'text-xs mt-1'}>
                    신고하기
                </span>
            </div>
            <div
                className={"bg-white border-[#FFD1BE] border-solid border-1 flex justify-center items-center flex-col py-3 px-2 rounded-b-2xl"}>
                <div className={'w-10 h-10 bg-[#FFD1BE] rounded-full flex justify-center items-center '}>
                    <GavelIcon className={'text-[#FEFDFD] border-0.5 border-[#DADADA]'}/>
                </div>
                <span className={'text-xs mt-1'}>
                입찰하기
                </span>
            </div>
        </div>
    );
};

export default AuctionChatMenu;
