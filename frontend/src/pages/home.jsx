import React from 'react'
import storeuser from '../store/storeuser'

const Home = () => {
  const user = storeuser((state) => state.user);
  
  return (
    <div className='bg-[#272525] h-screen w-screen flex flex-col'>
      <h3 className="text-start my-7 mx-[5%] text-amber-50 text-4xl">Anonymous Messanger</h3>
      <div className='flex-1 flex align-middle justify-center'>
        <div className='w-9/10 h-3/4 bg-[#FFA5A5] rounded-3xl'>
          <h3 className='text-start my-10 mx-[1%] text-black text-2xl'>Enter your preference</h3>
          
          <button className='text-2xl mt-8 ml-2 bg-[#B4B985] px-10 py-2 rounded-3xl hover:bg-amber-300 active:bg-blue-500'>START CHAT</button>
        </div>
      </div>
    </div>
  )
}

export default Home
