import React, {act, FC} from "react";

type Props = {
    value:string
    active:boolean
}
const CategoryItem:FC<Props> = ({value,active}) => {
    return (
        <div className={`flex items-center justify-center text-center border rounded-full w-24 h-24 text-black ${active ? 'bg-orange-400 text-white' : 'bg-white'}`}>
            {value}
        </div>
    )

}
export default CategoryItem;