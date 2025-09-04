import React, { use, useEffect } from 'react'
import { useState } from 'react'

const colors = ["#F3AAAB","#8C85B9","#B4B985","#FFFFFF"]

const landing = () => {
  const [changingColor, setChangingColor] = useState(0)

  useEffect(()=>{
    const interval = setInterval(()=>{
      setChangingColor((prev)=> (prev+1)%colors.length)
    },600)
    return () => clearInterval(interval)
  } ,[])


  return (
    <div class="h-screen w-screen flex justify-center items-center bg-[#272525] flex-col gap-20">
        <h1 
        className="text-6xl text-center font-bold duration-1000"
        style={{ color: colors[changingColor]}} >
          Anonymous Messanger
        </h1>
        <button class="text-amber-900 bg-amber-100 rounded-2xl py-2 px-4 text-3xl hover:bg-[#8C85B9] hover:text-blue-950 active:bg-green-900 active:text-amber-300">Start</button>
    </div>
  )
}

export default landing
