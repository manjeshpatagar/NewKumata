// services/payment.service.js
import { StandardCheckoutPayRequest } from "pg-sdk-node";
import { client } from "../config/phonepeClient.js";
import { v4 as uuidv4 } from "uuid";
import { Payment } from "../models/payment.model.js";

/**
 * 🔹 Initiate Payment using PhonePe SDK
 */
export const initiatePayment = async ({
  userId,
  amount,
  paymentType,
  referenceId,
}) => {
  const merchantTransactionId = `TXN_${uuidv4()}`;
  const totalAmount = Math.round(amount * 100); // Convert ₹ to paise

  const payRequest = StandardCheckoutPayRequest.builder()
    .merchantOrderId(merchantTransactionId)
    .amount(totalAmount)
    .redirectUrl(
      `${process.env.FRONTEND_REDIRECT_URL}?txnId=${merchantTransactionId}`
    )
    .build();

  const response = await client.pay(payRequest);

  // Save transaction
  await Payment.create({
    merchantTransactionId,
    merchantUserId: userId,
    amount,
    status: "pending",
    paymentType,
    paymentTypeRef: paymentType,
    referenceId,
  });

  return { checkoutUrl: response.redirectUrl, merchantTransactionId };
};

/**
 * 🔹 Check Payment Status
 */
export const getPaymentStatus = async (merchantTransactionId) => {
  const result = await client.getOrderStatus(merchantTransactionId);

  const payment = await Payment.findOneAndUpdate(
    { merchantTransactionId },
    {
      status: result.code === "PAYMENT_SUCCESS" ? "success" : "failed",
      rawResponse: result,
    },
    { new: true }
  );

  return payment;
};
