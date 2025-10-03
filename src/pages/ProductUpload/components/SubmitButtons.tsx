const SubmitButtons = ({ onSubmit }: { onSubmit: () => void }) => {
    return (
        <div className='flex justify-center gap-6'>
            <button className='bg-gray-300 text-gray-800 px-8 py-3 rounded-md'>취소하기</button>
            <button
                onClick={onSubmit}
                className='bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600'
            >
                등록하기
            </button>
        </div>
    );
};

export default SubmitButtons;
