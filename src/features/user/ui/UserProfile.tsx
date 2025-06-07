import React, {FC} from "react";
import {useQueryGetUserById} from "@/features/user/lib/useQueryGetUserById.ts";
import {Card} from "@shared/components/ui/card.tsx";
import {Badge} from "@shared/components/ui/badge.tsx";
import {Account, AccountDto} from "@entities/user/model";

type Props = {
    userId:number,
    children: (user: AccountDto) => React.ReactNode;
}

const UserProfile:FC<Props> = ({userId,children}) => {
    const {isLoading,isError,data,error} = useQueryGetUserById(userId);
    if(isLoading){
        return <>loading</>
    }
    if(isError){
        return <>{error as string}</>
    }
    if(!data || !data.data){
        return <>no data</>
    }
    return (
        <>
            {children(data.data)}
        </>
    );
};



export default UserProfile;
