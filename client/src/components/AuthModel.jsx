import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({onClose}) {
    const {userData} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(userData){ onClose() }
    },[userData, onClose])

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center px-4'
        style={{background:'rgba(0,0,0,0.7)', backdropFilter:'blur(16px)'}}>
        <div className='relative w-full max-w-md'>
            <button onClick={onClose}
                className='absolute top-10 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all'
                style={{background:'rgba(255,255,255,0.08)', color:'#94a3b8'}}>
                <FaTimes size={14}/>
            </button>
            <Auth isModel={true}/>
        </div>
    </div>
  )
}

export default AuthModel
