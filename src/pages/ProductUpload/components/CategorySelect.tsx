import { useEffect, useState } from "react";

type Props = {
    selectedCategoryId: number | null; // null 허용으로 수정
    setSelectedCategoryId: (id: number | null) => void; // null 허용
    token: string;
};

export default function CategorySelect({ selectedCategoryId, setSelectedCategoryId, token }: Props) {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://172.27.226.250:8080/api/v1/category", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("카테고리 불러오기 실패");

                const result = await res.json();
                setCategories(result.data);
            } catch (error) {
                console.error("카테고리 가져오기 에러:", error);
            }
        };

        fetchCategories();
    }, [token]);

    return (
        <div className="mb-6">
            <label className="block font-semibold mb-2 text-orange-500">카테고리 선택 *</label>
            <select
                className="w-full border rounded-md px-4 py-2"
                value={selectedCategoryId ?? ""} // ✅ null일 때는 빈 문자열
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCategoryId(value ? Number(value) : null); // ✅ 빈 값이면 null로 설정
                }}
            >
                <option value="">카테고리를 선택해주세요</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
