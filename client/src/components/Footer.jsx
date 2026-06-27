import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <div className='flex justify-center px-4 pb-10 pt-6'>
      <div className='w-full max-w-6xl rounded-2xl py-8 px-6 text-center'
        style={{background:'rgba(15,22,41,0.6)', border:'1px solid rgba(255,255,255,0.06)'}}>
        <div className='flex justify-center items-center gap-3 mb-3'>
          <div className='p-2 rounded-xl' style={{background:'linear-gradient(135deg,#10b981,#059669)'}}>
            <BsRobot size={15} color="white"/>
          </div>
          <span className='font-bold text-sm' style={{color:'#f1f5f9'}}>
            AceInterview<span style={{color:'#10b981'}}>.AI</span>
          </span>
        </div>
        <p className='text-sm max-w-xl mx-auto' style={{color:'#64748b'}}>
          AI-powered interview preparation platform designed to improve
          communication skills, technical depth and professional confidence.
        </p>
      </div>
    </div>
  )
}

export default Footer
