import {Route,Routes,Navigate} from 'react-router-dom'
import Landing from './pages/landing'
import Register from './pages/register'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/home'
import Login from './pages/login'
import { useEffect } from 'react';
import { socket } from './socket';
import OnlineUsers from './pages/onlineusers';



function App() {
  useEffect(()=>{
    socket.on("connect",()=>{
    console.log("Connected to server", socket.id);
  })
    socket.on("welcome",(message)=>{
    console.log("server says : ",message);
  })
  return (()=>{
    socket.off("connect")
  })
  },[])



  return (
    <div className='font-display'>
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/landing' element={<Landing/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/onlineusers' element={<OnlineUsers/>}></Route>
        <Route path='*' element={<Navigate to='/'/>}></Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000}/>
    </div>
  )
}

export default App
