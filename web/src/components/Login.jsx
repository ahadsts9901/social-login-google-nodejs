import React, { useEffect, useState } from 'react'
import "../App.css"
import { Apple, Facebook, Google } from 'react-bootstrap-icons'
// import axios from 'axios'
import { baseUrl } from '../core.mjs'

// purple ===> #5B225B
// orange ===> #E6523A
// white ====> #F7F9FB
// blue =====> #232249
// black ====> #0E0E0E

const Login = () => {

    const googleLogin = () => {
        window.open(`${baseUrl}/api/v1/auth/google`, "_self");
    };

    return (
        <div className="login w-[100%] h-[100vh] p-4 flex flex-col justify-center items-center gap-4">
            <h1 className='w-[100%] text-center text-[1.5em] text-[#f7f9fb] font-bold'>
                Social Login With NodeJS
            </h1>
            <div className='w-[100%] flex justify-center items-center gap-4'>
                <button className='text-[1.5em] w-[2em] h-[2em] bg-[#f7f9fb] 
                text-[#444] p-[10px] flex justify-center items-center gap-3 
                rounded-[100%] font-bold'>
                    <Facebook />
                </button>
                <button className='text-[1.5em] w-[2em] h-[2em] bg-[#f7f9fb] 
                text-[#444] p-[10px] flex justify-center items-center gap-3 
                rounded-[100%] font-bold' onClick={googleLogin}>
                    <Google />
                </button>
                <button className='text-[1.5em] w-[2em] h-[2em] bg-[#f7f9fb] 
                text-[#444] p-[10px] flex justify-center items-center gap-3 
                rounded-[100%] font-bold'>
                    <Apple />
                </button>
            </div>
        </div>
    )
}

export default Login