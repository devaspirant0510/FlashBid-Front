// components/TitleInput.tsx
const TitleInput = ({
    title,
    onChange,
}: {
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <div className='mb-6 pb-6 border-b border-orange-500 relative'>
        <label className='block font-semibold mb-2 text-orange-500'>
            제목 <span className='text-red-500'>*</span>
        </label>
        <input
            type='text'
            placeholder='상품 제목을 입력해주세요.'
            className='w-full border rounded-md px-4 py-2'
            value={title}
            onChange={onChange}
            maxLength={30}
        />
        <div className='absolute top-8 right-4 text-sm text-gray-400 select-none'>
            {title.length} / 30
        </div>
    </div>
);

export default TitleInput;
