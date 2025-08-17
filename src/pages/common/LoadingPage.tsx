import React, {useEffect, useState} from "react";

const LoadingPage = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000); // 2초 대기
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null; // 2초 지나면 아무것도 안 보여줌

    return (
        <div className={'h-screen w-screen flex items-center justify-center bg-uprimary'}>
            <div className={'text-center'}>
                <img src={"/img/loading.gif"} alt="로딩중" className={'h-64 w-64 mb-4'}/>
                <div className={'text-white'}>로딩중</div>
            </div>
        </div>
    );
};

export default LoadingPage;
