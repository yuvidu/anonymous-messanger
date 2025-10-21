import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket";
import Cookies from "js-cookie"

function OnlineUsers() {
    const [userdata,setuserdata] = useState();

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

    useEffect (()=>{
        const userdata = Cookies.get("userdata")
        if(userdata){
            setuserdata(JSON.parse(userdata))
        }

    },[])

    return (
        <div className="bg-[#272525] h-screen w-screen flex flex-col gap-2">
            <div className="bg-[#6a6302a6] h-1/12 w-3/19 ml-[1%] my-2 rounded-3xl text-center flex justify-center items-center">
            <h1 className="text-amber-50">current user - {userdata?.nickname}</h1>
            </div>
            {/* <h1 className="text-amber-50">other online users now  </h1>
            <ul className="text-amber-50">
                {onlineUsers.map((user)=>(
                    <li key={user} className="text-amber-50">{user}</li>
                ))}
            </ul>    */}
            <div className="bg-[#6a6302a6] h-1/12 w-3/19 ml-[1%] my-2 rounded-3xl text-center flex justify-center items-center">
            <h1 className="text-amber-50">online usercount now - {onlineUsers.length}</h1>
            </div>
        </div>  
    )
}
export default OnlineUsers
