import React, {FC, useEffect} from "react";
import Cookies from 'js-cookie';
import {parseJwtPayload} from "@shared/lib/jwtUtils.ts";
import {Navigate} from "react-router";
type Props= {
    children:React.ReactNode,

}
const AuthUser:FC<Props> = ({children}) => {
    const accessToken = Cookies.get('access_token'); //
    useEffect(()=>{
        if(accessToken){
            const data = parseJwtPayload(accessToken);
            console.log(data)
        }

    },[accessToken])
    if(!accessToken){

        return <Navigate to={"/login"}/>
    }
    return (
        <>
            {children}
        </>
    );
};

export default AuthUser;
