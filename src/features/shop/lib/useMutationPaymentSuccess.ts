// filepath: /Users/kotlinandnode/seungho/capstone/FlashBid-Front/src/features/shop/lib/useMutationPaymentSuccess.ts
import {useMutation} from "@tanstack/react-query";
import {axiosClient} from "@shared/lib/axiosClient.ts";
import Cookies from "js-cookie";

export interface PaymentSuccessPayload {
  paymentKey: string;
  orderId: string;
  receiptId: string;
  receiptUrl: string;
  status: string;
  userId: string;
  pointAmount: number;
  paymentAmount: number;
  method: string;
  purchaseAt: string; // ISO string
}

async function postPaymentSuccess(payload: PaymentSuccessPayload) {
  const token = Cookies.get('access_token') || '';
  return axiosClient.post(
    "/api/v1/payment/success",
    payload,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      }
    } as any
  );
}

export function useMutationPaymentSuccess() {
  return useMutation({
    mutationFn: (payload: PaymentSuccessPayload) => postPaymentSuccess(payload),
  });
}

