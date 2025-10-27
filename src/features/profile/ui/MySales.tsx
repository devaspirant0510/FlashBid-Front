import MySalesList from './MySalesList';
import { useQueryGetMySales } from '../lib/useQueryGetMySales';
import { Link } from 'react-router-dom';
import { Button } from '@shared/components/ui/button.tsx';

const MySales = () => {
    const { data, isLoading, isError } = useQueryGetMySales();

    const renderContent = () => {
        if (isLoading) {
            return <div className='py-10 text-gray-500'>판매 목록을 불러오는 중...</div>;
        }
        if (isError) {
            return <div className='py-10 text-red-500'>판매 목록을 불러오는데 실패했습니다.</div>;
        }
        if (!data?.data || data.data.length === 0) {
            return <div className='py-10 text-gray-500'>등록한 상품이 없습니다.</div>;
        }

        const visibleSales = data.data.slice(0, 8);
        const hasMore = data.data.length > 8;

        return (
            <>
                <div className='grid grid-cols-4 gap-4'>
                    {visibleSales.map((sale) => (
                        <MySalesList key={sale.auction.id} item={sale} />
                    ))}
                </div>

                {hasMore && (
                    <div className='mt-6 text-center'>
                        <Link to='/profile/sales-view'>
                            <Button
                                variant='outline'
                                className='px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                            >
                                더보기
                            </Button>
                        </Link>
                    </div>
                )}
            </>
        );
    };

    return (
        <section className='rounded-xl shadow border text-center px-8 py-5'>
            <div className='flex justify-between items-center mb-5'>
                <span
                    className='font-semibold '
                    style={{ fontSize: 24, color: '#ED6C37', fontWeight: 'bold' }}
                >
                    MY 판매 상품
                </span>
                <div>
                    <span
                        className='text-sm text-muted-foreground mr-1'
                        style={{ color: '#ED6C37' }}
                    >
                        등록 상품
                    </span>
                    <span
                        className='text-sm text-muted-foreground mr-1'
                        style={{ color: '#ED6C37' }}
                    >
                        {data?.data?.length || 0}
                    </span>
                </div>
            </div>
            {renderContent()}
        </section>
    );
};

export default MySales;
