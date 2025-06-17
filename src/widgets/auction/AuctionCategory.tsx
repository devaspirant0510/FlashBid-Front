import React, {FC, useCallback, useEffect, useState,ReactNode} from "react";
import {Card, CardContent, CardHeader} from "@shared/components/ui/card.tsx";
import {Button} from "@shared/components/ui/button.tsx";
import CategoryItem from "@widgets/auction/CategoryItem.tsx";
import {Category} from "@entities/auction/model";
import {useSearchParams} from "react-router-dom";
import {FilterIcon} from "lucide-react";

type Props = {
    category: Category[]
}



const AuctionCategory: FC<Props> = ({category}) => {
    const [selected, setSelected] = useState<boolean[]>(new Array(category.length).fill(false))
    const [current,setCurrent] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentCategory = searchParams.get("category");
    useEffect(()=>{
        console.log(current)
        const copySelected = structuredClone(selected);
        setSelected(copySelected.map((v,i)=>{
            return i===current
        }));

    },[current])
    const onClickItem = useCallback((index: number) => {
        setCurrent(index);
        setSearchParams({category:category[index].name})

    }, [selected]);
    return (
        <div className={'flex flex-col w-full items-center rounded-b-4xl border-1'}>
            <div className={'text-[#ED6C37] text-2xl font-bold  mt-8'}>
                실시간 경매
            </div>
            <div className={'text-[#FFBB9F] text-sm'}>
                생동감 넘치는 실시간 채팅을 통해 경매 참가자들 속에서 상품을 낙찰받을 수 있어요!
            </div>
            <div className="flex items-center gap-2 my-4 w-full">
                <div className="flex-grow h-px bg-[#CC7451]"/>
                <span className="text-sm text-[#CC7451] whitespace-nowrap">카테고리</span>
                <div className="flex-grow h-px bg-[#CC7451]"/>
            </div>
            <div className={'flex bg-[#F3F4F6] rounded-full gap-4 py-2 px-4' }>
                {category.map((value, index) => {
                    return (
                        <div key={index} onClick={() => onClickItem(index)}>
                            <CategoryItem value={value.name} active={selected[index]}/>
                        </div>
                    )
                })}

            </div>
            <div className={'flex justify-between items-center w-full px-4 mb-4'}>
                <div>
                    카테고리 > {category[current].name}
                </div>
                <div className={'border-1 flex justify-between p-2 rounded-full text-sm items-center'}>
                    필터
                    <FilterIcon size={16}/>
                </div>
            </div>
        </div>
    );
}
export default AuctionCategory;