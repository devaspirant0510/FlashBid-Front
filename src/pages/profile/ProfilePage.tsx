import {MainLayout} from "@shared/layout";

function ProfilePage() {
    return (
        <MainLayout>
            <div className="max-w-screen-xl mx-auto px-4">
                <section className="grid grid-cols-12 gap-6">
                    <aside className="col-span-3 space-y-4 mt-10">
                        <h2 className="font-semibold">MY 프로필</h2>
                        <div className="bg-white p-4 rounded-xl shadow border text-center space-y-2">
                            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full"/>
                            <div className="font-semibold">TI Gumayusi</div>
                            <div className="text-sm text-muted-foreground">smashghost2@gmail.com</div>
                            <button className="w-full rounded bg-orange-100 py-1">본인인증</button>
                            <div className="space-y-1">
                                <button className="w-full border rounded py-1">프로필 수정</button>
                                <button className="w-full border rounded py-1">프로필 공유</button>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow border space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>나의 캐시</span>
                                <span>5,500</span>
                            </div>
                            <div className="flex justify-between">
                                <span>관심 상품</span>
                                <span>3</span>
                            </div>
                            <div className="flex justify-between">
                                <span>입찰 상품</span>
                                <span>7</span>
                            </div>
                            <div className="pt-2 text-center text-xs text-muted-foreground">회원등급</div>
                        </div>

                        <div
                            className="w-full h-24 bg-gray-100 rounded-xl text-center flex items-center justify-center text-sm text-gray-400">
                            배너 자리
                        </div>
                    </aside>

                    {/* 오른쪽 콘텐츠 */}
                    <section className="col-span-9 space-y-6 mt-10">
                        {/* MY 지갑 */}
                        <h2 className="font-semibold">MY 지갑</h2>
                        <div className="bg-white p-6 rounded-xl shadow border flex justify-between items-center">
                            <div>
                                <div className="text-sm text-muted-foreground">보유 캐시</div>
                                <div className="text-3xl font-bold">5,500</div>
                            </div>
                            <div className="space-x-2">
                                <button className="px-4 py-1 border rounded">충전하기</button>
                                <button className="px-4 py-1 border rounded">이용내역</button>
                            </div>
                        </div>

                        {/* MY 활동 */}
                        <div className="bg-white p-6 rounded-xl shadow border grid grid-cols-3 text-center">
                            <div>
                                <div className="text-sm text-muted-foreground">게시물</div>
                                <div className="text-xl font-semibold">3</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">팔로워</div>
                                <div className="text-xl font-semibold">10</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">팔로잉</div>
                                <div className="text-xl font-semibold">11</div>
                            </div>
                        </div>

                        {/* MY 게시글 */}
                        <section>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold">MY 게시글</h2>
                                <span className="text-sm text-muted-foreground">최신순</span>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-200 aspect-square rounded-xl flex items-center justify-center text-sm text-gray-500"
                                    >
                                        [피규어] 한정판
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* MY 판매 목록 */}
                        <section>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold">MY 판매 목록</h2>
                                <span className="text-sm text-muted-foreground">업로드 3</span>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-200 aspect-square rounded-xl flex items-center justify-center text-sm text-gray-500"
                                    >
                                        [피규어] 한정판
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* MY 구매 목록 */}
                        <section>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold">MY 구매 목록</h2>
                                <span className="text-sm text-muted-foreground">구매 0</span>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-100 aspect-square rounded-xl border border-dashed flex items-center justify-center text-sm text-gray-400"
                                    >
                                        이미지 없음
                                    </div>
                                ))}
                            </div>
                        </section>
                    </section>
                </section>
            </div>
        </MainLayout>
    );
}

export default ProfilePage;
