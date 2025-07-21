import React, {FC, useEffect} from "react";
import Cookies from 'js-cookie';
import {parseJwtPayload} from "@shared/lib/jwtUtils.ts";
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
    return (
        <>
            {children}
        </>
    );
};

export default AuthUser;
