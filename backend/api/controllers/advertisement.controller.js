import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createAdvertisement,
  getAdvertisements,
  updateAdvertisement,
  deleteAdvertisement,
} from "../services/advertisement.service.js";
import { initiatePayment } from "../services/payment.service.js";
import { Advertisement } from "../models/advertisement.model.js";
import { Payment } from "../models/payment.model.js";

/* -----------------------------
📢 Create Advertisement (User/Admin unified)
----------------------------- */
export const createOrApproveAd = asyncHandler(async (req, res) => {
  const { title, category, price, description, durationDays, location } =
    req.body;
  const images = req.files?.images?.map((img) => img.url) || [];
  const isAdmin = req.user?.role === "admin";

  // 🧩 ADMIN: directly activate ad without payment
  if (isAdmin) {
    const ad = await createAdvertisement({
      title,
      category,
      price,
      description,
      durationDays,
      image: images,
      location,
      status: "active",
      paymentStatus: "not_required",
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Admin advertisement created and activated.",
      data: ad,
    });
  }

  // 🧩 USER: create pending ad
  const ad = await createAdvertisement({
    title,
    category,
    price,
    description,
    durationDays,
    image: images,
    location,
    user: req.user._id,
    status: "pending",
  });

  res.status(201).json({
    success: true,
    message: "Ad submitted for admin approval.",
    data: ad,
  });
});

/* -----------------------------
✅ PUT: Admin approves OR user updates ad
----------------------------- */
/* -----------------------------
✏️ Unified Update Ad (User/Admin/Payment Activation)
----------------------------- */
export const updateOrApproveAd = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { merchantTransactionId, action, price } = req.body; // 'approve' | 'activate' | normal updates
  const isAdmin = req.user?.role === "admin";
  const user = req.user;

  let ad = await Advertisement.findById(id);
  if (!ad) throw new Error("Advertisement not found");

  /* -----------------------------
  🧑‍💼 Admin Approving Ad → Trigger Payment
  ----------------------------- */
  /* -----------------------------
🧑‍💼 Admin Approving Ad → Trigger Payment
----------------------------- */
  if (isAdmin && action === "approve") {
    ad.status = "approved";
    await ad.save();

    // 💰 Start payment for the ad price
    const { checkoutUrl, merchantTransactionId } = await initiatePayment({
      amount: price || ad.price,
      userId: ad.user,
      paymentType: "advertisement",
      referenceId: ad._id,
    });

    ad.merchantTransactionId = merchantTransactionId;
    ad.paymentStatus = "pending";
    await ad.save();

    return res.status(200).json({
      success: true,
      message: "Ad approved — awaiting payment",
      checkoutUrl, // ✅ Correct key
    });
  }

  /* -----------------------------
  💰 Admin activates ad after verifying payment manually (if needed)
  ----------------------------- */
  if (isAdmin && action === "activate") {
    const adToActivate = await Advertisement.findOne({ merchantTransactionId });
    if (!adToActivate) throw new Error("Ad not found for this transaction");

    adToActivate.status = "active";
    adToActivate.paymentStatus = "paid";
    adToActivate.activatedAt = new Date();
    await adToActivate.save();

    return res.json({
      success: true,
      message: "Ad activated successfully",
      data: adToActivate,
    });
  }

  /* -----------------------------
  ✏️ Normal Update (User/Admin)
  ----------------------------- */
  ad = await updateAdvertisement(id, req.body, user, isAdmin);
  res.json({ success: true, data: ad });
});

/* -----------------------------
🗑️ DELETE: Only admin can delete
----------------------------- */
export const deleteAd = asyncHandler(async (req, res) => {
  if (req.user?.role !== "admin")
    return res.status(403).json({ message: "Only admin can delete ads" });

  await deleteAdvertisement(req.params.id);
  res.json({ success: true, message: "Ad deleted" });
});

/* -----------------------------
📋 GET: Admin gets all, users only active ads
----------------------------- */
export const getAds = asyncHandler(async (req, res) => {
  const role = req.user?.role || "user";
  const ads = await getAdvertisements({}, role);
  res.json({ success: true, count: ads.length, data: ads });
});
