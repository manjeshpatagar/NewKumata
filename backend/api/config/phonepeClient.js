import { StandardCheckoutClient, Env } from "pg-sdk-node";
import { config } from "dotenv";

config();

const clientId = process.env.PHONEPE_MERCHANT_ID;
const clientSecret = process.env.PHONEPE_SALT_KEY;
const clientVersion = process.env.PHONEPE_CLIENT_VERSION; //insert your client version here
const env = Env.SANDBOX; //change to Env.PRODUCTION when you go live

export const client = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);
