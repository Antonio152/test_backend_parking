//imported packages
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import parkingRouter from "./routes/parkings";

//initializations
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT ?? 5000;

//Settings
app.set("port", PORT);
app.use(express.json());

//Cors configuration
app.use(cors());

// ! Routes
app.use("/api/auth", authRoutes);
app.use("/api/parking", parkingRouter);

app.listen(PORT, () => {
  console.log(`⚡ Server running on port ${PORT} ⚡`);
});
