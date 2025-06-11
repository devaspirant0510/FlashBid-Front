import React,{useEffect, useState} from "react";
import Cookies from "js-cookie";
import {parseJwtPayload} from "@shared/lib/jwtUtils.ts";

export const useAuthUser = ()=>{
    const accessToken = Cookies.get("access_token");
    const [userInfo,setUser] = useState(null);
    useEffect(()=>{
        if(accessToken){
            console.log(accessToken)
            const user = parseJwtPayload(accessToken)
            setUser({...user});
        }

    },[accessToken])
    if(userInfo==null){
        return [null,null]
    }
    return [userInfo.nickname,userInfo.id]
}