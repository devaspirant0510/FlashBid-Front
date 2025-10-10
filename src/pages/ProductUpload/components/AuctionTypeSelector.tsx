// components/AuctionTypeSelector.tsx
const AuctionTypeSelector = ({
    auctionType,
    setAuctionType,
}: {
    auctionType: 'realtime' | 'blind' | null;
    setAuctionType: (type: 'realtime' | 'blind') => void;
}) => (
    <div className='mb-6 pb-6 border-b border-orange-500'>
        <label className='block font-semibold mb-2 text-orange-500'>경매 유형 *</label>
        <div className='flex gap-4'>
            {['live', 'blind'].map((type) => (
                <button
                    key={type}
                    type='button'
                    onClick={() => setAuctionType(type as 'realtime' | 'blind')}
                    className={`border px-4 py-2 rounded-md text-gray-700 hover:bg-orange-100 ${
                        auctionType === type ? 'bg-orange-500 text-white' : ''
                    }`}
                >
                    {type === 'live' ? '실시간 경매' : '블라인드 경매'}
                </button>
            ))}
        </div>
    </div>
);
export default AuctionTypeSelector;
