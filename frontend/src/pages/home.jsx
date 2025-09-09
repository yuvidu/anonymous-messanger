import { useState } from 'react'
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

const Home = () => {
  const [preference, setpreference] = useState()

  //states need for chat room
  const [user, setuser] = useState()
  const Navigate = useNavigate()
  const [waiting, setwaiting] = useState(false)

  const handlepreference = (e) => {
    setpreference(e.target.value)
  }


  const userid = user?.id || null;

  useEffect(() => {
    const userdata = Cookies.get('userdata')
    if (userdata) {
      setuser(JSON.parse(userdata))
    }
  }, []);

  //handling online users
  useEffect(() => {
    if (!userid) return;

    socket.emit("user-online", userid);

    return () => {
      socket.emit("offline-users", userid);
    };
  }, [userid]);


  const handlenavigationonlinepage = () => {
    Navigate('/onlineusers', { state: { userID: user.id } })
  }


  //function to handle user joining the matchmaking queue
  const handejoinqueue = () => {
    socket.emit("joinqueue", user.id)
    setwaiting(true)
  }


  //handling socket event when matched with another user
  useEffect(() => {
    if (!user) return;

    const handlematchmaking = ({ roomId, partnerId }) => {
      setwaiting(false)
      Navigate(`/chat/${roomId}`, { state: { userId: user.id, partnerId } })

    }

    socket.on("matched", handlematchmaking);


    return () => {
      socket.off("matched", handlematchmaking);
    };
  }, [Navigate, user]);


  return (
    <div className='bg-[#272525] h-screen w-screen flex flex-col'>
      <h3 className="text-start my-7 mx-[5%] text-amber-50 text-4xl">Anonymous Messanger</h3>
      <div className='flex-1 flex align-middle justify-center'>
        <div className='w-9/10 h-3/4 bg-[#FFA5A5] rounded-3xl'>
          <div className='m-8 h-1/10 w-1/8 bg-[#D9D9D9] rounded-3xl flex items-center'>
            <h2 className='text-2xl ml-6 my-8' >{user ? (`welcome ${user.codename}`) : ("no user logged")}</h2>
          </div>
          <h3 className='text-start my-10 mx-[1%] text-black text-2xl'>Enter your preference</h3>
          <div className='flex flex-col'>
            <select className='mt-5 w-1/5 h-12 rounded-3xl text-2xl bg-[#D9D9D9] px-3' value={preference} onChange={handlepreference}>
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <button onClick={handejoinqueue} className='w-1/5 text-2xl mt-8 ml-2 bg-[#B4B985] px-10 py-2 rounded-3xl hover:bg-amber-300 active:bg-blue-500'>START CHAT</button>
            <p>{waiting ? "waiting for a partner" : ""}</p>
            <button disabled={!user} className='w-1/5 text-2xl mt-8 ml-2 bg-[#B4B985] px-10 py-2 rounded-3xl hover:bg-amber-300 active:bg-blue-500' onClick={handlenavigationonlinepage}>See who is online</button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
