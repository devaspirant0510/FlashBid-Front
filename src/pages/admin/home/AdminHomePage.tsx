import React from 'react';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    Line,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { httpFetcher } from '@shared/lib';
import AdminLayout from '@shared/layout/AdminLayout.tsx';

const colors = [
    '#8dd3c7',
    '#bebada',
    '#f6d93d',
    '#fb8072',
    '#80b1d3',
    '#f79442',
    '#b3de69',
    '#fccde5',
    '#d9d9d9',
    '#bc80bd',
    '#ccebc5',
];

// ✨ 임시 데이터 (API 나오기 전)
const mockData = {
    totalUsers: 13,
    totalAuctions: 20,
    activeAuctions: 8,
    revenue: 1230130201,
    categories: [
        { name: '전자제품', count: 120 },
        { name: '의류', count: 90 },
        { name: '도서', count: 45 },
        { name: '가구', count: 75 },
        { name: '기타', count: 30 },
    ],
    recentAuctions: [
        { name: '러브라이브 피규어', start: 1000000, end: 1450000 },
        { name: '쵸단 친필 싸인', start: 1200000, end: 1500000 },
        { name: '2025 월즈 티켓', start: 200000, end: 500000 },
        { name: '에어팟 프로', start: 250000, end: 310000 },
        { name: '베토벤이썻던 피아노', start: 150000, end: 210000 },
    ],
};

const AdminHomePage = () => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['api', 'v1', 'admin', 'chart', 'auction', 'category', 'count'],
        queryFn: httpFetcher,
        enabled: false, // 일단 API 끔
    });

    const chartData = data?.data || mockData.categories;

    if (isError) return <>{error}</>;

    // 📈 최근 낙찰된 상품 그래프용 데이터 가공
    const recentAuctionData = mockData.recentAuctions.map((item) => {
        const percentage = ((item.end - item.start) / item.start) * 100;
        return {
            ...item,
            percentage: Math.round(percentage),
        };
    });

    return (
        <AdminLayout>
            <div className='p-6 space-y-6'>
                <div className='text-3xl font-bold'>📊 관리자 페이지</div>

                {/* KPI 박스 */}
                <div className='grid grid-cols-4 gap-4'>
                    <div className='bg-white shadow rounded p-4 text-center'>
                        <div className='text-lg font-semibold'>총 회원 수</div>
                        <div className='text-2xl font-bold text-blue-600'>
                            {mockData.totalUsers.toLocaleString()}명
                        </div>
                    </div>
                    <div className='bg-white shadow rounded p-4 text-center'>
                        <div className='text-lg font-semibold'>총 경매 수</div>
                        <div className='text-2xl font-bold text-green-600'>
                            {mockData.totalAuctions.toLocaleString()}개
                        </div>
                    </div>
                    <div className='bg-white shadow rounded p-4 text-center'>
                        <div className='text-lg font-semibold'>진행 중 경매</div>
                        <div className='text-2xl font-bold text-orange-500'>
                            {mockData.activeAuctions.toLocaleString()}개
                        </div>
                    </div>
                    <div className='bg-white shadow rounded p-4 text-center'>
                        <div className='text-lg font-semibold'>총 매출</div>
                        <div className='text-2xl font-bold text-purple-600'>
                            {mockData.revenue.toLocaleString()}p
                        </div>
                    </div>
                </div>

                {/* 카테고리 통계 */}
                <div className='bg-[#faf3e0] rounded shadow p-6 flex gap-6 justify-around'>
                    {/* 왼쪽: 기존 카테고리별 PieChart */}
                    <div>
                        <div className='text-xl font-semibold mb-4'>카테고리별 상품 수</div>
                        <PieChart width={400} height={350}>
                            <Pie
                                fill='#8884d8'
                                nameKey='name'
                                dataKey='count'
                                data={chartData}
                                cx='50%'
                                cy='50%'
                                outerRadius={120}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend layout='vertical' verticalAlign='middle' align='right' />
                        </PieChart>
                    </div>

                    {/* 오른쪽: 카테고리별 수익 BarChart */}
                    <div>
                        <div className='text-xl font-semibold mb-4'>카테고리별 수익</div>
                        <ResponsiveContainer width={400} height={350}>
                            <ComposedChart
                                data={chartData.map((item) => ({
                                    name: item.name,
                                    revenue: item.count * 10000, // 임시 계산: 상품 수 * 10,000원
                                }))}
                                margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                            >
                                <XAxis dataKey='name' />
                                <YAxis tickFormatter={(v) => `${v.toLocaleString()}p`} />
                                <Tooltip formatter={(value) => `${value.toLocaleString()}p`} />
                                <Bar dataKey='revenue' fill='#82ca9d' name='수익' />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 최근 낙찰된 상품 그래프 */}
                <div className='bg-white rounded shadow p-6'>
                    <div className='text-xl font-semibold mb-4'>최근 낙찰된 상품</div>
                    <ResponsiveContainer width='100%' height={350}>
                        <ComposedChart
                            data={recentAuctionData}
                            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                        >
                            <XAxis dataKey='name' />
                            <YAxis
                                yAxisId='left'
                                orientation='left'
                                tickFormatter={(v) => `${v.toLocaleString()}p`}
                                domain={[0, 2000000]}
                            />
                            <YAxis
                                yAxisId='right'
                                orientation='right'
                                tickFormatter={(v) => `${v}%`}
                                domain={['auto', 'auto']}
                            />
                            <Tooltip
                                formatter={(value, name) =>
                                    name === 'percentage'
                                        ? `${value}%`
                                        : `${value.toLocaleString()}`
                                }
                            />
                            <Legend />
                            <Bar yAxisId='left' dataKey='start' fill='#80b1d3' name='시작가' />
                            <Bar yAxisId='left' dataKey='end' fill='#fb8072' name='낙찰가' />
                            <Line
                                yAxisId='right'
                                type='monotone'
                                dataKey='percentage'
                                stroke='#82ca9d'
                                strokeWidth={2}
                                name='상승률(%)'
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminHomePage;
