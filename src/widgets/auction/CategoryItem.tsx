import React, {act, FC} from "react";

type Props = {
    value: string
    active: boolean
}
const CategoryItem: FC<Props> = ({value, active}) => {
    return (
        <div
            className={`flex items-center justify-center text-center border rounded-full py-3 px-5 text-xl text-black ${active ? 'bg-white text-black' : 'border-none bg-[#F3F4F6]'}`}>
            {value}
        </div>
    )

}
export default CategoryItem;