import { connectDB } from "./db/connection.js";
import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import http from "http";
import {Server} from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
const server = http.createServer(app);


const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173", // your frontend URL
        methods: ["GET","POST"],
        credentials: true
    }
})
const onlineUsers = new Map(); // userId => socketId

io.on("connection",(Socket)=>{
    console.log('User connected: ', Socket.id);
    Socket.emit("welcome","to socket server backend")

    Socket.on("user-online",(userId)=>{
        onlineUsers.set(userId, Socket.id);
        console.log("Online users:", Array.from(onlineUsers.entries()));
        io.emit("online-users",Array.from(onlineUsers.keys()))
    })
    Socket.emit("online-users",Array.from(onlineUsers.keys()))

    Socket.on("disconnect",()=>{
        for (let [userId,sId] of onlineUsers.entries()){
            if(sId === Socket.id){
                onlineUsers.delete(userId);
            }
        }
        io.emit("online-users",Array.from(onlineUsers.keys()))
        console.log("User disconnected", Socket.id);
    })
    Socket.on("offline-users",(userId) =>{
        onlineUsers.delete(userId);
        io.emit("online-users",Array.from(onlineUsers.keys()))
    })
})






app.use(cors({ 
    origin: "http://localhost:5173", // your frontend URL
    credentials: true}
));

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use(cookieParser());

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
