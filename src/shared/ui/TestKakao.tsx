import React, {useEffect} from "react";
import {useLocation} from "react-router";
import axios from "axios";

const TestKakao = () => {
    const location = useLocation();
    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        console.log(code)
        if(code){
            axios.get("http://172.27.226.250:8080/auth/callback/kakao?code="+code).then(r=>{
                console.log(r)
                console.log(r.headers);
            })
        }

    },[location])
    return (
        <img src={"/img/kakao_login_medium_narrow.png"} onClick={()=>{
            window.location.href ="https://kauth.kakao.com/oauth/authorize?client_id=6dd9ea5522b7f44e998e97e22ded8997&redirect_uri=http://localhost:5173&response_type=code";
        }}>


        </img>
    );
};

export default TestKakao;
