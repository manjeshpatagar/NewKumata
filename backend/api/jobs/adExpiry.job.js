import cron from "node-cron";
import { Advertisement } from "../models/advertisement.model.js";

// Runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  const now = new Date();

  const expiredAds = await Advertisement.updateMany(
    {
      status: "active",
      activatedAt: { $exists: true },
      $expr: {
        $lt: [
          {
            $add: [
              "$activatedAt",
              { $multiply: ["$durationDays", 24 * 60 * 60 * 1000] },
            ],
          },
          now,
        ],
      },
    },
    { $set: { status: "expired" } }
  );

  console.log(`🕓 Ad Expiry Job: ${expiredAds.modifiedCount} ads expired.`);
});
