import React, {useCallback} from "react";
import {ArrowLeftIcon, BackpackIcon} from "lucide-react";
import {useNavigate} from "react-router";

const BackButton = () => {
    const navigate = useNavigate();
    const onClickBackButton = useCallback(() => {
        navigate(-1)

    },[]);
    return (
        <ArrowLeftIcon onClick={onClickBackButton} className={'text-uprimary '} size={25}>
        </ArrowLeftIcon>
    );
};

export default BackButton;
