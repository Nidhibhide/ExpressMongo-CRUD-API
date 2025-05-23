import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/MongoConfig";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();
connectDB();
const app = express();
const port: number = 5000;

app.use(helmet());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
