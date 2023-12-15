import React, { useEffect, useContext } from 'react'
import "../App.css"
import axios from "axios"
import { baseUrl } from '../core.mjs'
import { GlobalContext } from "../context/context";
const Home = () => {

  // context api ( user data )
  const { state, dispatch } = useContext(GlobalContext)

  // logout function
  const logout = async () => {
    try {
      const resp = await axios.post(`${baseUrl}/api/v1/auth/logout`)
      // console.log(resp);
      window.location.reload()
    } catch (error) {
      console.log(error);
      window.location.reload()
    }
  }

  return (
    <div className='text-[#F7F7FB] w-[100cw] h-[100vh] flex flex-col justify-center items-center gap-4'>
      <h1 className='font-bold text-[2em] text-center'>Home</h1>
      <img src={state.user.profilePhoto} className='rounded-[30%] object-cover p-[5px] bg-[#f7f9fb]' alt="profile picture" />
      <h1 className='text-[1.5em] font-bold'>{state.user.firstName} {state.user.lastName}</h1>
      <h1 className='font-bold text-center'>{state.user.email}</h1>
      <h1 className='font-bold text-center capitalize'>Provider : {state.user.provider}</h1>
      <button onClick={logout} className='text-[1em] text-[#444] bg-[#F7F9FB] font-bold py-[0.5em] px-[1em] rounded-[8px]'>Logout</button>
    </div>
  )
}

export default Home