import {
  initiatePayment,
  getPaymentStatus,
} from "../services/payment.service.js";

export const startPayment = async (req, res) => {
  try {
    const { amount, userId, paymentType, referenceId } = req.body;
    const { checkoutUrl, merchantTransactionId } = await initiatePayment(
      userId,
      amount,
      paymentType,
      referenceId
    );

    res.json({ success: true, checkoutUrl, merchantTransactionId });
  } catch (error) {
    console.error("❌ Payment initiation failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const paymentStatus = async (req, res) => {
  try {
    const { txnId } = req.params;
    const result = await getPaymentStatus(txnId);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("❌ Payment status check failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment status",
      error: error.message,
    });
  }
};
