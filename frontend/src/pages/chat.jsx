import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { socket } from '../socket'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'


const chat = () => {
  const { roomId } = useParams();
  const [messages, setmessages] = useState([])
  const [prevmessages, setprevmessages] = useState([])
  const [input, setinput] = useState("")
  const location = useLocation();
  const userId = location.state?.userId || null;
  const partnerId = location.state?.partnerId || null;


  useEffect(() => {
    if (!roomId) return;
  })

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messages.trim() === "") return;

    socket.emit("send-message", {
      roomId: roomId,
      message: messages,
      senderid: userId,
      receiverid: partnerId
    })
    setmessages("");
  }


  useEffect(() => {
    if (!roomId) return;
 
    socket.emit("join-room", roomId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/api/message/get2`, {
          params: {
            receiverId: partnerId,
            senderId: userId,
            roomId: roomId
          },
          withCredentials: true
        });
        setprevmessages(response.data.messages);
      } catch (error) {
        console.log("Error fetching messages:", error);
        toast.error("Error fetching messages");
      }
    }
    fetchMessages();

    socket.on("newmessage", (data) => {
      setprevmessages((prev) => [...prev, data]);
    });
    
    return () => {
      socket.off("newmessage");
    };

  }, [roomId,userId, partnerId]);

  return (
    <div className='bg-[#f9cbcb] h-screen w-screen flex flex-col gap-2 p-2'>
      {/* <h1>Chat Room: {roomId}</h1>
      <h2>Your ID: {userId}</h2>
      <h2>Partner ID: {partnerId}</h2> */}
      <div className='flex flex-col gap-2 w-1/5'>
        {prevmessages.map((prevmessages, index) => (
          <div key={index}>
            <div >
              {prevmessages.senderid === userId ? (
                <p className='text-blue-500 text-end bg-blue-100 rounded-3xl p-2'>You : {prevmessages.message}</p>
              ) : (
                <p className='text-green-500 text-start bg-green-100 rounded-3xl p-2'>Partner : {prevmessages.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <hr />
      {/* <h3>Send a message:</h3> */}
      <form action="submit" onSubmit={handleSendMessage}>
        <input type="text" value={messages} onChange={(e) => setmessages(e.target.value)} className='bg-amber-300 rounded-3xl p-2 w-1/5 mr-2'/>
        <button type='submit' className='bg-red-300 rounded-3xl p-2 hover:bg-blue-300 active:bg-blue-100'>send</button>
      </form>
    </div>
  )
}

export default chat
