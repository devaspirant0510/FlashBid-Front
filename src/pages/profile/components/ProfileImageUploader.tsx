import { useRef, forwardRef, useImperativeHandle } from "react";

interface Props {
    image: { file: File; previewUrl: string } | null;
    setImage: React.Dispatch<React.SetStateAction<{ file: File; previewUrl: string } | null>>;
}

// forwardRef 사용
const ProfileImageUploader = forwardRef((props: Props, ref) => {
    const { image, setImage } = props;
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ file, previewUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    // 부모에서 fileInputRef.current.click() 가능하도록
    useImperativeHandle(ref, () => ({
        openFileDialog: () => fileInputRef.current?.click()
    }));

    return (
        <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-2">
                <img
                    src={image?.previewUrl || "/default-profile.png"}
                    alt="프로필 미리보기"
                    className="object-cover w-full h-full"
                />
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
            />
        </div>
    );
});

export { ProfileImageUploader };
