import express from "express";
import dotenv from "dotenv";
import transactionRouter from "./routes/transactionRoute.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { initDB } from "./config/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions/", transactionRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the Backend Wallet Service!");
});

initDB().then(() => {
  app.listen(PORT, async () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
  });
});

export default app;
