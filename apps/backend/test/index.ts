import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import leadRoute from "./routes/leadRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));

app.use((err:any, req:any, res:any, next:any) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Lead route
app.use("/api/v1/leads", leadRoute);

// User Route
app.use("/api/v1/auth", userRoute);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(PORT);
});
