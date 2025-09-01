import { connectDB } from "./db/connection.js";
import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/user.route.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
app.use("/api/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
