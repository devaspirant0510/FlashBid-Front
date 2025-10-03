// components/DescriptionInput.tsx
const DescriptionInput = ({
    description,
    onChange,
}: {
    description: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
    <div className='mb-6 pb-6 border-b border-orange-500 relative'>
        <label className='block font-semibold mb-2 text-orange-500'>설명 *</label>
        <textarea
            placeholder='상품 설명을 입력해주세요. (10자 이상)'
            className='w-full border rounded-md px-4 py-2 min-h-[120px]'
            value={description}
            onChange={onChange}
            maxLength={1000}
        />
        <div className='absolute top-8 right-4 text-sm text-gray-400 select-none'>
            {description.length} / 1000
        </div>
    </div>
);
export default DescriptionInput;
