// filepath: /Users/kotlinandnode/seungho/capstone/FlashBid-Front/src/features/shop/lib/getPaymentConfig.ts
export type PaymentConfig = { pg: string; method: string };

export function getPaymentConfig(methodLabel: string): PaymentConfig {
    switch (methodLabel) {
        case '간편결제':
            return { pg: '토스', method: '간편' };
        case '신용카드':
            return { pg: '토스', method: '카드' };
        case '휴대폰결제':
            return { pg: '다날', method: '휴대폰' };
        case '무통장입금':
            return { pg: '토스', method: '가상계좌' };
        default:
            return { pg: '토스', method: '카드' };
    }
}
