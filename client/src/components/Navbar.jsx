import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api"
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";


function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);


    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("token");
            dispatch(setUserData(null));
            setShowCreditPopup(false);
            setShowUserPopup(false);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex justify-center px-4 pt-6' style={{background:'transparent'}}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='w-full max-w-6xl rounded-2xl px-6 py-4 flex justify-between items-center relative'
                style={{
                    background: 'rgba(15,22,41,0.85)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.4)'
                }}>

                {/* Logo */}
                <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
                    <div className='p-2 rounded-xl flex items-center justify-center'
                        style={{background:'linear-gradient(135deg,#10b981,#059669)', boxShadow:'0 4px 14px rgba(16,185,129,0.35)'}}>
                        <BsRobot size={18} color="white"/>
                    </div>
                    <span className='font-bold hidden md:block text-base tracking-tight' style={{color:'#f1f5f9'}}>
                        AceInterview<span style={{color:'#10b981'}}>.AI</span>
                    </span>
                </div>

                <div className='flex items-center gap-3 relative'>
                    {/* Credits */}
                    <div className='relative'>
                        <button onClick={() => {
                            if (!userData) { setShowAuth(true); return; }
                            setShowCreditPopup(!showCreditPopup);
                            setShowUserPopup(false)
                        }} className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all'
                        style={{background:'rgba(16,185,129,0.12)', border:'1px solid rgba(16,185,129,0.25)', color:'#34d399'}}>
                            <BsCoin size={16} />
                            {userData?.credits || 0} credits
                        </button>

                        {showCreditPopup && (
                            <motion.div
                                initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
                                className='absolute right-[-50px] mt-3 w-64 rounded-2xl p-5 z-50'
                                style={{background:'#0f1629', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 20px 60px rgba(0,0,0,0.6)'}}>
                                <p className='text-sm mb-4' style={{color:'#94a3b8'}}>Need more credits to continue interviews?</p>
                                <button onClick={() => navigate("/pricing")} className='w-full py-2.5 rounded-xl text-sm font-semibold transition-all btn-primary'>
                                    Buy more credits
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* User */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) { setShowAuth(true); return; }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }}
                            className='w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all'
                            style={{background:'linear-gradient(135deg,#10b981,#059669)', color:'white', boxShadow:'0 2px 12px rgba(16,185,129,0.3)'}}>
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={15} />}
                        </button>

                        {showUserPopup && (
                            <motion.div
                                initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
                                className='absolute right-0 mt-3 w-52 rounded-2xl p-4 z-50'
                                style={{background:'#0f1629', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 20px 60px rgba(0,0,0,0.6)'}}>
                                <p className='text-sm font-semibold mb-3' style={{color:'#10b981'}}>{userData?.name}</p>
                                <div style={{height:'1px', background:'rgba(255,255,255,0.06)', marginBottom:'12px'}}/>
                                <button onClick={() => navigate("/history")} className='w-full text-left text-sm py-2 transition-colors' style={{color:'#94a3b8'}}>
                                    Interview History
                                </button>
                                <button onClick={handleLogout} className='w-full text-left text-sm py-2 flex items-center gap-2 transition-colors' style={{color:'#f87171'}}>
                                    <HiOutlineLogout size={15} />
                                    Sign out
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navbar
