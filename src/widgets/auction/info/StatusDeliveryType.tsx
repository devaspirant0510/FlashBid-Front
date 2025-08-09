import React, {FC} from "react";
import {DELIVERY_TYPE} from "@entities/auction/model";

type Props = {
    deliveryType: DELIVERY_TYPE
}
const StatusDeliveryType: FC<Props> = ({deliveryType}) => {
    if (deliveryType.valueOf() === DELIVERY_TYPE.DIRECT.toString()) {
        return (
            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>거래</div>
                <div className={'text-uprimary px-3'}>직거래</div>
            </div>
        )
    }
    else if(deliveryType === DELIVERY_TYPE.PARCEL){
        return (
            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>거래</div>
                <div className={'text-uprimary px-3'}>택배배송</div>
            </div>
        )
    }else{
        return (
            <div className={'bg-ubackground2 rounded-full flex items-center'}>
                <div className={'bg-usecondary rounded-full text-white py-1 px-3'}>거래</div>
                <div className={'text-uprimary px-3'}>협의 후 결정</div>
            </div>
        )

    }

};

export default StatusDeliveryType;
