import React, {FC} from "react";
import clsx from "clsx";

type Props ={
    vertical?:boolean,
    className?:string,
}
const Divider:FC<Props> = ({vertical,className }) => {
    return (
        <div
            className={clsx(
                vertical
                    ? "w-px h-full bg-gray-300 mx-2"
                    : "h-px w-full bg-gray-300 my-2",
                className
            )}
        />
    );
};

export default Divider;
