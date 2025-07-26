import { useState } from "react";
import KakaoMap from "./KakaoMap";

const DeliveryOptions = ({
                             deliveryMethod,
                             setDeliveryMethod,
                             deliveryFee,
                             setDeliveryFee,
                             setSelectedLocation,
                         }: {
    deliveryMethod: string;
    setDeliveryMethod: (val: string) => void;
    deliveryFee: string;
    setDeliveryFee: (val: string) => void;
    setSelectedLocation: (coords: { lat: number; lng: number }) => void;
}) => {
    const [warning, setWarning] = useState("");

    const handleDeliveryFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]/g, "");
        const limitedValue = rawValue.slice(0, 5);

        if (Number(limitedValue) > 20000) {
            setWarning("배송비는 최대 2만원까지 입력 가능합니다.");
        } else {
            setWarning("");
        }

        setDeliveryFee(limitedValue);
    };

    return (
        <div className="mb-10 pb-6 border-b border-orange-500">
            <label className="block font-semibold mb-2 text-orange-500">배송 *</label>
            <div className="flex gap-6 mb-4">
                {["택배", "직거래", "협의 후 결정"].map((method) => (
                    <label key={method}>
                        <input
                            type="radio"
                            name="delivery"
                            className="mr-2"
                            value={method}
                            checked={deliveryMethod === method}
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                        />
                        {method}
                    </label>
                ))}
            </div>

            {deliveryMethod === "택배" && (
                <>
                    <div className="mb-2">
                        <label className="block font-semibold text-gray-600 mb-1">배송비</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="ex) 3,000원"
                                className="w-full border rounded-md px-4 py-2 pr-10"
                                value={deliveryFee ? Number(deliveryFee).toLocaleString() : ""}
                                onChange={handleDeliveryFeeChange}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                        </div>
                        {warning && <p className="text-red-500 text-sm mt-1">{warning}</p>}
                    </div>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                        보상 시점 금액: 300,000 포인트 (경매 시작 가격) + 3,300 포인트 (배송비) <br />
                        배송비는 최대 2만원으로 입력해주세요. 배송 설정 및 배송 책임은 판매자에게 있습니다.
                    </p>
                </>
            )}

            {deliveryMethod === "직거래" && (
                <div className="mt-6 p-4 rounded-lg bg-[#FAFAFA] border border-orange-200">
                    <KakaoMap setSelectedLocation={setSelectedLocation} />
                    <p className="mt-2 text-sm text-orange-400">🟠 가능한 범위</p>
                </div>
            )}

            {deliveryMethod === "협의 후 결정" && (
                <div>
                    <p className="mt-2 text-sm opacity-50">*구매자와 메시지를 통해 협의 후 결정하시면 됩니다.</p>
                </div>
            )}
        </div>
    );
};

export default DeliveryOptions;