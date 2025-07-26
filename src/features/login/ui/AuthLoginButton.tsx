import React, {FC, useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";
import Cookies from "js-cookie";


const redirectUrl = import.meta.env.MODE === "development" ? "http://localhost:5173" : "http://172.27.226.250:5173";
const authInfo = {
    kakao: `https://kauth.kakao.com/oauth/authorize?client_id=6dd9ea5522b7f44e998e97e22ded8997&redirect_uri=${redirectUrl}/login&response_type=code`,
    google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=457079463805-msvl2bh4v77e8odtf924sbc2trrn8338.apps.googleusercontent.com&redirect_uri=${redirectUrl}/login&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`,
    naver: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=e9ePxNUxjz6dgFiyrxta&redirect_uri=${redirectUrl}/login&state=1234`,
}

type Props = {
    auth: 'kakao' | 'google' | 'naver' | 'apple'
}
const AuthLoginButton: FC<Props> = ({auth}) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        console.log(code)
        if (code) {
            axios.get(`http://172.27.226.250:8080/auth/callback/${auth}?code=${code}&redirect=${redirectUrl}`,{withCredentials:true} as any).then(r => {
                console.log(r.data)
                console.log(r.headers)
                Cookies.set("access_token", r.headers.authorization.split(' ')[1]);

                window.history.replaceState(null, "", "/login");
                navigate("/")
            }).catch(e=>{
                console.log(e)
             //   Cookies.set("access_token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTIyOTU0NzA5ODA0MzQyOTI0OTUiLCJpYXQiOjE3NDk1NzEzODEsImV4cCI6MTc4MTEwNzM4MSwiaWQiOjUsIm5pY2tuYW1lIjoiVDEg64-E656AIiwidWlkIjoiMTEyMjk1NDcwOTgwNDM0MjkyNDk1IiwiZW1haWwiOiJzZXVuZ2hvMDIwNTEwQGdtYWlsLmNvbSIsInJvbGUiOiJ0b3AgZ2FwIn0.x55zMfmgd57LRZZC-0yzcGNfwM7AxWid9bAYQ2D0MD4");
            })
        }

    }, [location,auth])
    const onClickAuth = useCallback(() => {
        window.location.href = authInfo[auth];
    }, [])
    if (auth === 'google') {
        return <img src={"/img/google_logo.svg"} className={"rounded-full w-12 h-12"} alt={"구글 로그인"}
                    onClick={onClickAuth}/>
    } else if (auth === "naver") {
        return <img src={"/img/naver_icon.png"} className={"rounded-full w-12 h-12"} alt={"네이버 로그인"}
                    onClick={onClickAuth}/>
    } else if(auth === 'kakao') {
        return <img src={"/img/kakao_logo.png"} className={"rounded-full w-12 h-12"} alt={"카카오 로그인"}
                    onClick={onClickAuth}/>
    }else{
        return <img src={"/img/apple_logo.png"} className={"rounded-full w-12 h-12"} alt={"카카오 로그인"}/>
    }
};

export default AuthLoginButton;
