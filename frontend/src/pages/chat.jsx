import React, { use, useEffect } from 'react'
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
    <div>
      <h1>Chat Room: {roomId}</h1>
      <h2>Your ID: {userId}</h2>
      <h2>Partner ID: {partnerId}</h2>
      <div>
        {prevmessages.map((prevmessages, index) => (
          <div key={index}>
            <div>
              {prevmessages.senderid === userId ? (
                <p className='text-blue-500'>You : {prevmessages.message}</p>
              ) : (
                <p className='text-green-500'>Partner : {prevmessages.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <hr />
      <h3>Send a message:</h3>
      <form action="submit" onSubmit={handleSendMessage}>
        <input type="text" value={messages} onChange={(e) => setmessages(e.target.value)} className='bg-amber-800'/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default chat
