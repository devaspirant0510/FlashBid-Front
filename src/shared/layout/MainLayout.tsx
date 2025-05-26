import React, {FC} from "react";
import {Header} from "@widgets/ui";

type Props = {
    children: React.ReactNode;
}
const MainLayout:FC<Props> = ({children}) => {
    return (
        <>
            <Header/>
            <div>
                {children}
            </div>
        </>
    )
}
export default MainLayout;