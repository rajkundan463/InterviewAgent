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
app.use(cors({
        origin: ["https://interviewagent-client-x1nn.onrender.com",
            "https://interview-agent-amber.vercel.app"],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// For Log
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        console.log(
            `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`
        );
    });

    next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 6000;

app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error("Database Connection Error:", error.message);
    }
});