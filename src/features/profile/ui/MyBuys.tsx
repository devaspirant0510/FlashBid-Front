import MyBuysList from "@/features/profile/ui/MyBuysList.tsx";

const MyBuys = () => {
    return (
        <section className="rounded-xl shadow border text-center px-8 py-5">
            <div className="flex justify-between items-center mb-5">
                <span className="font-semibold "
                      style={{fontSize: 24, color: '#ED6C37', fontWeight: 'bold'}}>
                    MY 구매 목록
                </span>
                <div>
                    <span className="text-sm text-muted-foreground mr-1"
                          style={{color: '#ED6C37'}}>
                        구매
                    </span>
                    <span className="text-sm text-muted-foreground mr-1"
                          style={{color: '#ED6C37'}}>
                        5
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {[1, 5].map(id => (
                    <MyBuysList key={id} id={id} />
                ))}
            </div>
        </section>
    )
}

export default MyBuys;