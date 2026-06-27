import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import api from "../utils/api"
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const name = user.displayName;
            const email = user.email;

            const result = await api.post(
                ServerUrl + "/api/auth/google",
                { name, email }
            );

            localStorage.setItem("token", result.data.token);
            dispatch(setUserData(result.data.user));

        } catch (error) {
            console.log(error);
            localStorage.removeItem("token");
            dispatch(setUserData(null));
        }
    };

    return (
        <div className={`w-full ${isModel ? "py-4" : "min-h-screen flex items-center justify-center px-6 py-20"}`}
            style={!isModel ? {background:'#0a0f1e'} : {}}>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-md p-10 rounded-3xl"}`}
                style={{
                    background: 'rgba(15,22,41,0.95)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(16,185,129,0.06)'
                }}>

                {/* Logo */}
                <div className='flex items-center justify-center gap-3 mb-8'>
                    <div className='p-2.5 rounded-xl' style={{background:'linear-gradient(135deg,#10b981,#059669)', boxShadow:'0 4px 14px rgba(16,185,129,0.4)'}}>
                        <BsRobot size={18} color="white" />
                    </div>
                    <span className='font-bold text-lg' style={{color:'#f1f5f9'}}>
                        InterviewIQ<span style={{color:'#10b981'}}>.AI</span>
                    </span>
                </div>

                <h1 className='text-2xl font-bold text-center leading-snug mb-3' style={{color:'#f1f5f9', letterSpacing:'-0.01em'}}>
                    Continue with{' '}
                    <span className='text-gradient'>AI Interview</span>
                </h1>

                <p className='text-center text-sm leading-relaxed mb-8' style={{color:'#64748b'}}>
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>

                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-semibold text-sm transition-all'
                    style={{
                        background:'rgba(255,255,255,0.05)',
                        border:'1px solid rgba(255,255,255,0.1)',
                        color:'#f1f5f9'
                    }}>
                    <FcGoogle size={20} />
                    Continue with Google
                </motion.button>

                <p className='text-center text-xs mt-6' style={{color:'#475569'}}>
                    By signing in, you agree to our terms of service.
                </p>
            </motion.div>
        </div>
    )
}

export default Auth
