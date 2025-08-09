import React, {FC} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@shared/components/ui/dialog.tsx";
import {Auction, DELIVERY_TYPE} from "@entities/auction/model";
import DirectMapInfo from "@widgets/auction/DirectMapInfo.tsx";

type Props = {
    children: React.ReactNode;
    data:Auction
}
const DeliveryTypeInfoDialog:FC<Props> = ({children,data}) => {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>{data.goods.deliveryType===DELIVERY_TYPE.PARCEL?<div className={'text-usecondary'}>택배 배송</div>:
                    data.goods.deliveryType===DELIVERY_TYPE.DIRECT?<div className={'text-usecondary'}>직거래</div>:<div className={'text-usecondary'}>협의 후 결정</div>
                }</DialogHeader>
                {data.goods.deliveryType===DELIVERY_TYPE.DIRECT &&
                    <>
                    <DirectMapInfo lat={data.tradingArea.latitude} lng={data.tradingArea.longitude} radius={data.tradingArea.radius}>
                    </DirectMapInfo>
                    {data.tradingArea.address} 반경 {data.tradingArea.radius}m
                    </>
                }
                {data.goods.deliveryType===DELIVERY_TYPE.PARCEL &&
                    <>
                        <div>

                            택배비 : {data.deliveryInfo.deliveryFee}p
                        </div>

                    </>
                }
            </DialogContent>
        </Dialog>
    );
};

export default DeliveryTypeInfoDialog;
