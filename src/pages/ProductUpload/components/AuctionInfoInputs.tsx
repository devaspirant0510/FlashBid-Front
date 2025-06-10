const AuctionInfoInputs = ({
                               startPrice,
                               setStartPrice,
                               bidUnit,
                               setBidUnit,
                               auctionDate,
                               setAuctionDate,
                               auctionHour,
                               setAuctionHour,
                               auctionMinute,
                               setAuctionMinute,
                               auctionPeriod,
                               setAuctionPeriod,
                           }: {
    startPrice: string;
    setStartPrice: (val: string) => void;
    bidUnit: string;
    setBidUnit: (val: string) => void;
    auctionDate: string;
    setAuctionDate: (val: string) => void;
    auctionHour: string;
    setAuctionHour: (val: string) => void;
    auctionMinute: string;
    setAuctionMinute: (val: string) => void;
    auctionPeriod: string;
    setAuctionPeriod: (val: string) => void;
}) => (
    <div className="mb-6 pb-6 border-b border-orange-500 grid grid-cols-2 gap-6">
        {/* 시작 가격 */}
        <div>
            <label className="block font-semibold mb-2 text-orange-500">시작 가격*</label>
            <div className="relative">
                <input
                    type="text"
                    inputMode="numeric"
                    className="w-full border rounded-md px-4 py-2 pr-10"
                    placeholder="EX) 102,000"
                    value={
                        startPrice === "" ? "" : Number(startPrice).toLocaleString("ko-KR")
                    }
                    onChange={(e) => {
                        const value = e.target.value.replace(/,/g, ""); // 쉼표 제거
                        if (/^\d*$/.test(value)) {
                            setStartPrice(value);
                        }
                    }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
            </div>
        </div>

        {/* 입찰 단위 */}
        <div>
            <label className="block font-semibold mb-2 text-orange-500">입찰 단위*</label>
            <div className="relative">
                <input
                    type="text"
                    inputMode="numeric"
                    className="w-full border rounded-md px-4 py-2 pr-10"
                    placeholder="EX) 1,000"
                    value={
                        bidUnit === "" ? "" : Number(bidUnit).toLocaleString("ko-KR")
                    }
                    onChange={(e) => {
                        const value = e.target.value.replace(/,/g, "");
                        if (/^\d*$/.test(value)) {
                            setBidUnit(value);
                        }
                    }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">원</span>
            </div>
        </div>


        {/* 경매 날짜 */}
        <div>
            <label className="block font-semibold mb-2 text-orange-500">경매 날짜*</label>
            <input
                type="date"
                className="w-full border rounded-md px-4 py-2"
                value={auctionDate}
                onChange={(e) => setAuctionDate(e.target.value)}
            />
        </div>

        {/* 경매 시간 */}
        <div className="grid grid-cols-2 gap-2">
            <div>
                <label className="block font-semibold mb-2 text-orange-500">경매 시간*</label>
                <select
                    className="w-full border rounded-md px-4 py-2"
                    value={auctionHour}
                    onChange={(e) => setAuctionHour(e.target.value)}
                >
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}시
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block font-semibold mb-2 text-orange-500 invisible">분</label>
                <select
                    className="w-full border rounded-md px-4 py-2"
                    value={auctionMinute}
                    onChange={(e) => setAuctionMinute(e.target.value)}
                >
                    {["00", "10", "20", "30", "40", "50"].map((min) => (
                        <option key={min} value={min}>
                            {min}분
                        </option>
                    ))}
                </select>
            </div>
        </div>


        {/* 경매 기간 */}
        <div>
            <label className="block font-semibold mb-2 text-orange-500">경매 기간*</label>
            <select
                className="w-full border rounded-md px-4 py-2"
                value={auctionPeriod}
                onChange={(e) => setAuctionPeriod(e.target.value)}
            >
                {Array.from({ length: 14 }, (_, i) => (
                    <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                        {(i + 1).toString().padStart(2, "0")}일
                    </option>
                ))}
            </select>
        </div>
        <p className="text-sm text-orange-400 ml-4 mt-8">경매가 진행 가능한 기간은 최대 2주(14일)입니다.</p>
    </div>
);

export default AuctionInfoInputs;
