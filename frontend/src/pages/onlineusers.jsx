import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket";



function OnlineUsers() {
    const location = useLocation();
    const userID = location.state?.userID || {};
    const [onlineUsers,setonlineUsers] = useState([])

    useEffect(()=>{
        socket.emit("user-online",userID)
        socket.on("online-users",(users)=>{
            setonlineUsers(users);
        })
        return () => {
            socket.off("online-users");
        }
    },[userID])

    
    return (
        <div>
            <h1>current user  {userID}</h1>
            <h1>other online users now  </h1>
            <ul>
                {onlineUsers.map((user)=>(
                    <li key={user}>{user}</li>
                ))}
            </ul>   
        </div>  
    )




}
export default OnlineUsers
