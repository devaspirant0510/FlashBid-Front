import { useState } from "react";
import Header from "@/widgets/ui/Header"; // Header 경로 맞게 수정해줘

const ChargePage = () => {
    const [selectedAmount, setSelectedAmount] = useState(100000);
    const [selectedMethod, setSelectedMethod] = useState("간편결제");

    const pointOptions = [
        { point: 5000, price: 5100 },
        { point: 10000, price: 10200 },
        { point: 50000, price: 51000 },
        { point: 100000, price: 102000 },
        { point: 500000, price: 510000 },
        { point: 1000000, price: 1020000 },
    ];

    const paymentMethods = ["간편결제", "신용카드", "휴대폰결제", "무통장입금"];

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* 공통 Header */}
            <Header />

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-10 py-12">
                {/* 타이틀 */}
                <h2 className="text-gray-400 text-xl mb-1">Auction Point</h2>
                <h1 className="text-3xl font-bold text-[#ED6C37] mb-10">포인트 충전하기</h1>

                {/* 포인트 내역 & 결제 옵션 */}
                <div className="grid grid-cols-2 gap-8">
                    {/* 포인트 내역 */}
                    <div className="rounded-lg shadow text-white p-6 space-y-3"
                         style={{ background: "linear-gradient(180deg, #ED6C37 0%, #E05D2F 100%)" }}>
                        <div className="flex justify-between">
                            <span className="text-lg">총 보유 포인트</span>
                            <span className="text-2xl font-bold">100,000 p</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg">+ 충전 포인트</span>
                            <span className="text-2xl font-bold">{selectedAmount.toLocaleString()} p</span>
                        </div>
                        <div className="flex justify-between mt-4 border-t pt-4">
                            <span className="text-lg font-semibold">충전 후 포인트</span>
                            <span className="text-3xl font-bold">{(100000 + selectedAmount).toLocaleString()} p</span>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button className="text-gray-200 text-sm underline">이용내역</button>
                        </div>
                    </div>

                    {/* 결제금액 선택 */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-gray-500 font-medium">결제금액</h3>
                            <div className="border rounded-lg overflow-hidden">
                                {pointOptions.map((opt) => (
                                    <label key={opt.point} className="flex justify-between items-center px-4 py-3 hover:bg-gray-50">
                                        <span>{opt.point.toLocaleString()} 포인트</span>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-gray-500">{opt.price.toLocaleString()} 원</span>
                                            <input
                                                type="radio"
                                                checked={selectedAmount === opt.point}
                                                onChange={() => setSelectedAmount(opt.point)}
                                                className="accent-orange-500"
                                            />
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 결제수단 선택 */}
                        <div className="space-y-2">
                            <h3 className="text-gray-500 font-medium">결제수단</h3>
                            <div className="flex border rounded-lg overflow-hidden">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setSelectedMethod(method)}
                                        className={`flex-1 py-2 text-center text-sm ${
                                            selectedMethod === method
                                                ? "bg-[#ED6C37] text-white"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 간편결제 아이콘 */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <div className="w-10 h-10 bg-yellow-300 rounded-full"></div>
                            <div className="w-10 h-10 bg-green-300 rounded-full"></div>
                            <div className="w-10 h-10 bg-blue-300 rounded-full"></div>
                            <div className="w-10 h-10 bg-red-300 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* 정책 동의 */}
                <div className="mt-10 text-sm text-gray-500">
                    <p>정책동의/주의사항</p>
                    <p className="mt-1">결제 시 동의가 필요합니다.</p>
                </div>

                {/* 결제 버튼 */}
                <div className="flex justify-center mt-6">
                    <button
                        className="px-10 py-3 bg-[#ED6C37] text-white text-lg rounded hover:bg-[#D6572C] transition"
                    >
                        결제하기
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ChargePage;
