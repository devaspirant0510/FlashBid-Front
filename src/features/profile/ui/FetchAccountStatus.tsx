import React, {FC} from "react";
import {useQueryGetAllAuctionChat} from "@/features/profile/lib/useQueryGetAccountStatus.ts";
import {UserStats} from "@entities/user/model";

type Props = {
    accountId:number,
    children: (data: UserStats) => React.ReactNode,
}
const FetchAccountStatus:FC<Props> = ({accountId,children}) => {
    const {isLoading,data,isError,error}  = useQueryGetAllAuctionChat(accountId);
    if(isLoading){
        return <>loading</>
    }
    if(isError){
        return <>{error}</>
    }
    if(!data || !data?.data){
        return <>no data</>
    }
    return (
        <>
            {children(data?.data!)}
        </>
    );
};

export default FetchAccountStatus;
