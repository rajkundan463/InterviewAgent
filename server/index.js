import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();

const app = express();

// Render
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://interviewagent-client-x1nn.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// DEBUG LOGGER
app.use((req, res, next) => {
  console.log("\n========== REQUEST ==========");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Origin:", req.headers.origin);
  console.log("Cookie Header:", req.headers.cookie);
  console.log("Cookies:", req.cookies);
  console.log("=============================\n");
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});