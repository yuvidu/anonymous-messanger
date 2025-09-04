import { connectDB } from "./db/connection.js";
import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ 
    origin: "http://localhost:5173", // your frontend URL
    credentials: true}
));
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
