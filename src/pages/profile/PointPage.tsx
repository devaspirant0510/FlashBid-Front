import React, {useState} from "react";
import FetchMyPointHistory from "@/features/profile/ui/FetchMyPointHistory.tsx";
import {MainLayout} from "@shared/layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {Badge} from "@/shared/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {Input} from "@/shared/components/ui/input";
import {
    Search,
    TrendingUp,
    TrendingDown,
    Gift,
    CreditCard,
    ShoppingCart,
    Calendar,
    Coins
} from "lucide-react";

const PointPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");

    const getChargeTypeInfo = (chargeType: string) => {
        switch (chargeType) {
            case "CHARGE":
                return {
                    label: "충전",
                    icon: <CreditCard className="w-3 h-3"/>,
                    className: "bg-blue-500 hover:bg-blue-600",
                    textColor: "text-blue-600"
                };
            case "GIFT":
                return {
                    label: "선물",
                    icon: <Gift className="w-3 h-3"/>,
                    className: "bg-purple-500 hover:bg-purple-600",
                    textColor: "text-purple-600"
                };
            case "PURCHASE":
                return {
                    label: "사용",
                    icon: <ShoppingCart className="w-3 h-3"/>,
                    className: "bg-gray-500 hover:bg-gray-600",
                    textColor: "text-gray-600"
                };
            default:
                return {
                    label: "기타",
                    icon: <Coins className="w-3 h-3"/>,
                    className: "bg-gray-400 hover:bg-gray-500",
                    textColor: "text-gray-500"
                };
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "오늘";
        if (diffDays === 1) return "어제";
        if (diffDays < 7) return `${diffDays}일 전`;

        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const filterData = (data: any[]) => {
        let filtered = data;

        if (selectedFilter !== "all") {
            filtered = filtered.filter(item => item.chargeType === selectedFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.contents.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    const calculateSummary = (data: any[]) => {
        const totalEarned = data
            .filter(item => item.chargeType === "CHARGE" || item.chargeType === "GIFT")
            .reduce((sum, item) => sum + item.earnedPoint, 0);

        const totalSpent = data
            .filter(item => item.chargeType === "PURCHASE")
            .reduce((sum, item) => sum + item.earnedPoint, 0);

        return {totalEarned, totalSpent};
    };

    return (
        <MainLayout>
            <FetchMyPointHistory>
                {(data) => {
                    const {totalEarned, totalSpent} = calculateSummary(data);
                    const filteredData = filterData(data);

                    return (
                        <div className="w-full p-6 space-y-6">
                            {/* 헤더 */}
                            <div className="text-center space-y-2">
                                <h1 className="text-4xl font-bold text-udark">
                                    포인트 내역
                                </h1>
                                <p className="text-gray-600">
                                    나의 포인트 사용 및 충전 내역을 확인해보세요
                                </p>
                            </div>

                            {/* 요약 카드 */}
                            <div className="flex gap-4 w-full">
                                <Card className="flex-1 border-green-200 bg-green-50">
                                    <CardHeader className="pb-2">
                                        <CardTitle
                                            className="text-sm font-medium text-green-700 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4"/>
                                            총 적립
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-green-600">
                                            +{totalEarned.toLocaleString()}P
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="flex-1 border-red-200 bg-red-50">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-red-700 flex items-center gap-2">
                                            <TrendingDown className="w-4 h-4"/>
                                            총 사용
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-red-600">
                                            -{totalSpent.toLocaleString()}P
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="flex-1 border-blue-200 bg-blue-50">
                                    <CardHeader className="pb-2">
                                        <CardTitle
                                            className="text-sm font-medium text-blue-700 flex items-center gap-2">
                                            <Coins className="w-4 h-4"/>
                                            순 포인트
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {(totalEarned - totalSpent).toLocaleString()}P
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* 필터 및 검색 */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                        <div className="relative flex-1 max-w-md">
                                            <Search
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                                            <Input
                                                placeholder="내역 검색..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>

                                        <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
                                            <TabsList>
                                                <TabsTrigger value="all">전체</TabsTrigger>
                                                <TabsTrigger value="CHARGE">충전</TabsTrigger>
                                                <TabsTrigger value="GIFT">선물</TabsTrigger>
                                                <TabsTrigger value="PURCHASE">사용</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 테이블 */}
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gradient-to-r from-uprimary to-uprimary/90">
                                            <TableHead className="text-white font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4"/>
                                                    날짜
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-white font-semibold">
                                                내용
                                            </TableHead>
                                            <TableHead className="text-white font-semibold text-right">
                                                포인트
                                            </TableHead>
                                            <TableHead className="text-white font-semibold text-center">
                                                구분
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((pointRecord, index) => {
                                                const isPositive =
                                                    pointRecord.chargeType === "CHARGE" ||
                                                    pointRecord.chargeType === "GIFT";
                                                const sign = isPositive ? "+" : "-";
                                                const typeInfo = getChargeTypeInfo(pointRecord.chargeType);

                                                return (
                                                    <TableRow
                                                        key={index}
                                                        className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                                                    >
                                                        <TableCell className="font-medium text-gray-700">
                                                            <div className="space-y-1">
                                                                <div className="text-sm">
                                                                    {formatDate(pointRecord.createdAt)}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {new Date(pointRecord.createdAt).toLocaleTimeString("ko-KR", {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit"
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="text-sm text-gray-800 font-medium">
                                                                {pointRecord.contents}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                  <span
                                      className={`text-lg font-bold ${
                                          isPositive ? "text-green-600" : "text-red-600"
                                      }`}
                                  >
                                    {sign}{pointRecord.earnedPoint.toLocaleString()}P
                                  </span>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge
                                                                className={`${typeInfo.className} text-white flex items-center gap-1 justify-center w-fit mx-auto`}>
                                                                {typeInfo.icon}
                                                                {typeInfo.label}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        ) : data.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="text-center py-16"
                                                >
                                                    <div className="space-y-3">
                                                        <div className="text-6xl">🥹</div>
                                                        <div className="text-lg font-medium text-gray-600">
                                                            아직 포인트 내역이 없어요
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            포인트를 충전하거나 선물받으면 내역이 표시됩니다
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="text-center py-16"
                                                >
                                                    <div className="space-y-3">
                                                        <div className="text-4xl">🔍</div>
                                                        <div className="text-lg font-medium text-gray-600">
                                                            검색 결과가 없어요
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            다른 검색어나 필터를 사용해보세요
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* 데이터 개수 표시 */}
                            {data.length > 0 && (
                                <div className="text-center text-sm text-gray-500">
                                    총 {data.length}개의 내역 중 {filteredData.length}개 표시
                                </div>
                            )}
                        </div>
                    );
                }}
            </FetchMyPointHistory>
        </MainLayout>
    );
};

export default PointPage;
