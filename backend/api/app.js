import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import "./jobs/adExpiry.job.js"; // start cron scheduler

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/api", router);
app.use(errorHandler);

export default app;
