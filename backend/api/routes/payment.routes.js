// routes/payment.routes.js
import express from "express";
import {
  startPayment,
  paymentStatus,
} from "../controllers/payment.controller.js";
import { Payment } from "../models/payment.model.js";
import { Advertisement } from "../models/advertisement.model.js";

const router = express.Router();

router.post("/", startPayment);
router.get("/status/:txnId", paymentStatus);

// ✅ Webhook (callback from PhonePe)
router.post("/webhook", async (req, res) => {
  try {
    const { merchantTransactionId, code } = req.body;

    const payment = await Payment.findOneAndUpdate(
      { merchantTransactionId },
      {
        status: code === "PAYMENT_SUCCESS" ? "success" : "failed",
        rawResponse: req.body,
      },
      { new: true }
    );

    // 🎯 If payment belongs to an advertisement, update it
    if (payment?.paymentType === "advertisement") {
      const ad = await Advertisement.findById(payment.referenceId);
      if (ad) {
        if (code === "PAYMENT_SUCCESS") {
          ad.paymentStatus = "paid";
          ad.status = "active";
          ad.activatedAt = new Date();
        } else {
          ad.paymentStatus = "failed";
        }
        await ad.save();
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.sendStatus(500);
  }
});

export default router;
