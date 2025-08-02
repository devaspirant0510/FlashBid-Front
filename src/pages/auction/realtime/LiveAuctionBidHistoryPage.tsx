import React from "react";
import {MainLayout} from "@shared/layout";
import {useQueryGetAuctionHistory} from "@/features/auction/lib";
import {DateUtil} from "@/shared/lib/dateUtils.ts"
import {useParams} from "react-router";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useQueryGetAuctionHistoryChart} from "@/features/auction/lib/useQueryGetAuctionHistoryChart.ts";

type Params = {
    id: number
}

const LiveAuctionBidHistoryPage = () => {
    const {id} = useParams<Params>();
    const {isLoading, isError, error, data} = useQueryGetAuctionHistoryChart(id!)
    const chartdata = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>{error}</>
    }
    return (
        <MainLayout>
            <ResponsiveContainer width={"100%"} height={400}>

                <LineChart
                    width={500}
                    height={300}
                    data={data?.data!}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="createdAt"
                           tickFormatter={(value) => DateUtil.convertDateFormat(value, "yy.MM.dd hh:mm")}
                    />
                    <YAxis width={"auto"} tickFormatter={(value) => value.toLocaleString()+"p"}/>
                    <Tooltip
                        formatter={value => value.toLocaleString()+"p"}
                        labelFormatter={value => DateUtil.convertDateFormat(value, "yy-MM-dd hh:mm:ss")}
                    />
                    <Legend/>
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>

        </MainLayout>
    );
};

export default LiveAuctionBidHistoryPage;
