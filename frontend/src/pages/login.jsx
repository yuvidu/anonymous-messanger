import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const Register = () => {
  const Navigate = useNavigate();
  const [formdata,setformdata] = useState({
    nickname:"",
    codename:""
  })


  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formdata in login page",formdata)
      const result = await axios.post("http://localhost:5050/api/user/login",formdata,{withCredentials: true})
      console.log("result after submitting formdata in login page",result)
      toast.success("login successfull")

      setformdata({
        nickname:"",
        codename:""
      })

      Navigate('/home')
      
      
    } catch (error) {
      console.log("error in submit function in login page",error)
      toast.error(error.response.data.message)
    }
  }
  const gotoRegister = () => {
    Navigate('register')
  }






  return (
    <div className='bg-[#272525] h-screen w-screen flex flex-col justify-center items-center'>
      <h3 className="text-center my-7 text-amber-50 text-4xl">Anonymous Messanger</h3>
      <div className='bg-[#C3E7D9] w-3/7 h-3/4 rounded-3xl'>
      <form onSubmit={handlesubmit}>
        <span className="block text-3xl mt-10 ml-10 text-[#2D050A]">LOGIN</span>
        <label className="block text-2xl mt-15 ml-10 text-[#2D050A]">nick name</label>
        <input
        name='nickname' 
        type="text" 
        className="block bg-[#F3AAAB] rounded-3xl w-5/6 h-12 mt-3 ml-10 text-2xl px-3"
        value={formdata.nickname}
        onChange={(e=> setformdata({...formdata,nickname:e.target.value}))}
        />
        <label className="block text-2xl mt-5 ml-10 text-[#2D050A]">code name</label>
        <input 
        name='codename' 
        type="text" 
        className="block bg-[#8C85B9] rounded-3xl w-5/6 h-12 mt-3 ml-10 text-2xl px-3"
        value={formdata.codename}
        onChange={(e=> setformdata({...formdata,codename:e.target.value}))}
        />
        <button type="submit" className='text-2xl mt-10 ml-10 bg-[#B4B985] px-20 py-2 rounded-3xl hover:bg-amber-300 active:bg-blue-500'>LOGIN</button>
        <button onClick={gotoRegister} className='text-2xl mt-10 ml-10 bg-[#85B992] px-15 py-2 rounded-3xl hover:bg-amber-300 active:bg-blue-500'>GO TO REGISTER</button>

        </form>
      </div>
    </div>
  )
}

export default Register
