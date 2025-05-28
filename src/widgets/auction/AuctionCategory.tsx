import React, {FC, useCallback, useEffect, useState,ReactNode} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import CategoryItem from "@widgets/auction/CategoryItem.tsx";

type Props = {
    category: string[]
}



const AuctionCategory: FC<Props> = ({category}) => {
    const [selected, setSelected] = useState<boolean[]>(new Array(category.length).fill(false))
    const [current,setCurrent] = useState(0);
    useEffect(()=>{
        console.log(current)
        const copySelected = structuredClone(selected);
        setSelected(copySelected.map((v,i)=>{
            return i===current
        }));

    },[current])
    const onClickItem = useCallback((index: number) => {
        setCurrent(index);

    }, [selected]);
    return (
        <Card title={"카테고리"} className={'w-full'}>
            <CardHeader>
                카테고리
            </CardHeader>
            <CardContent>
                <div className={'flex overflow-x-auto gap-10'}>
                    {category.map((value, index) => {
                        return(
                            <div key={index} onClick={() => onClickItem(index)}>
                                <CategoryItem value={value} active={selected[index]}/>
                            </div>
                        )
                    })}

                </div>
            </CardContent>
        </Card>
    );
}
export default AuctionCategory;