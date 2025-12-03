import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/index.js";
import dns from "dns";
dns.lookup("api-preprod.phonepe.com", (err, address, family) => {
  console.log(address, family);
});

connectDB();
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
