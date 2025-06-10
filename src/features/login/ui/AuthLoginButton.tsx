import React, {FC, useCallback, useEffect} from "react";
import {useLocation} from "react-router";
import axios from "axios";

const authInfo = {
    kakao: "https://kauth.kakao.com/oauth/authorize?client_id=6dd9ea5522b7f44e998e97e22ded8997&redirect_uri=http://localhost:5173/login&response_type=code",
    google: "https://accounts.google.com/o/oauth2/v2/auth?client_id=457079463805-msvl2bh4v77e8odtf924sbc2trrn8338.apps.googleusercontent.com&redirect_uri=http://localhost:5173/login&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    naver: "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=e9ePxNUxjz6dgFiyrxta&redirect_uri=http://localhost:5173/login&state=1234",
}

type Props = {
    auth: 'kakao' | 'google' | 'naver'
}
const AuthLoginButton: FC<Props> = ({auth}) => {
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        console.log(code)
        if (code) {
            axios.get(`http://localhost:8080/auth/callback/${auth}?code=${code}`).then(r => {
                console.log(r)
                console.log(r.headers);
                window.history.replaceState(null, "", "/login");
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
    } else {
        return <img src={"/img/kakao_logo.png"} className={"rounded-full w-12 h-12"} alt={"카카오 로그인"}
                    onClick={onClickAuth}/>
    }
};

export default AuthLoginButton;
