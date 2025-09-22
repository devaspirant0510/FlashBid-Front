// filepath: /Users/kotlinandnode/seungho/capstone/FlashBid-Front/src/widgets/user/UserPointSummaryCards.tsx
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {TrendingUp, TrendingDown, Coins} from "lucide-react";

type Props = {
  totalEarned: number;
  totalSpent: number;
};

const UserPointSummaryCards: React.FC<Props> = ({ totalEarned, totalSpent }) => {
  const net = totalEarned - totalSpent;
  return (
    <div className="flex gap-4 w-full">
      <Card className="flex-1 border-green-200 bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            총 적립
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">+{totalEarned.toLocaleString()}P</div>
        </CardContent>
      </Card>

      <Card className="flex-1 border-red-200 bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-700 flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            총 사용
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">-{totalSpent.toLocaleString()}P</div>
        </CardContent>
      </Card>

      <Card className="flex-1 border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
            <Coins className="w-4 h-4" />
            순 포인트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{net.toLocaleString()}P</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPointSummaryCards;

