import React, {FC} from "react";
import {useQueryGetUserById} from "@/features/user/lib/useQueryGetUserById.ts";
import {Card} from "@shared/components/ui/card.tsx";
import {Badge} from "@shared/components/ui/badge.tsx";
import {Account} from "@entities/user/model";

type Props = {
    userId:number,
    children: (user: Account) => React.ReactNode;
}

const UserProfile:FC<Props> = ({userId,children}) => {
    const {isLoading,isError,data,error} = useQueryGetUserById(userId);
    if(isLoading){
        return <>loading</>
    }
    if(isError){
        return <>{error}</>
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
