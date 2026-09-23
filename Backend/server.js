import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRouter from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRouter);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch (err) {
        console.log("Failed to connect with Database:", err);
    }
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});