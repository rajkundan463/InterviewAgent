import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../utils/api"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await api.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    return (
        <div className='min-h-screen py-10 px-6' style={{background:'#0a0f1e'}}>
            <div style={{
                position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
                background:'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)'
            }}/>
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto' style={{position:'relative', zIndex:1}}>

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button onClick={() => navigate("/")} className='mt-1 p-3 rounded-full btn-ghost transition'>
                        <FaArrowLeft style={{color:'#94a3b8'}} />
                    </button>
                    <div>
                        <div className='text-xs font-bold tracking-widest mb-2' style={{color:'#10b981'}}>HISTORY</div>
                        <h1 className='text-3xl font-bold' style={{color:'#f1f5f9', letterSpacing:'-0.01em'}}>
                            Interview History
                        </h1>
                        <p className='mt-2 text-sm' style={{color:'#64748b'}}>
                            Track your past interviews and performance reports
                        </p>
                    </div>
                </div>

                {interviews.length === 0 ? (
                    <div className='rounded-2xl p-12 text-center'
                        style={{background:'rgba(15,22,41,0.8)', border:'1px solid rgba(255,255,255,0.07)'}}>
                        <p style={{color:'#64748b'}}>No interviews found. Start your first interview.</p>
                    </div>
                ) : (
                    <div className='grid gap-4'>
                        {interviews.map((item, index) => (
                            <div key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='p-6 rounded-2xl transition-all duration-300 cursor-pointer card-glass'
                                style={{boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div>
                                        <h3 className="text-base font-bold" style={{color:'#f1f5f9'}}>{item.role}</h3>
                                        <p className="text-sm mt-1" style={{color:'#64748b'}}>{item.experience} · {item.mode}</p>
                                        <p className="text-xs mt-2" style={{color:'#475569'}}>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6'>
                                        <div className="text-right">
                                            <p className="text-2xl font-extrabold text-gradient">
                                                {item.finalScore || 0}<span className='text-base font-medium' style={{color:'#475569'}}>/10</span>
                                            </p>
                                            <p className="text-xs mt-0.5" style={{color:'#64748b'}}>Overall Score</p>
                                        </div>

                                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold`}
                                            style={item.status === "completed"
                                                ? {background:'rgba(16,185,129,0.12)', color:'#34d399', border:'1px solid rgba(16,185,129,0.25)'}
                                                : {background:'rgba(234,179,8,0.1)', color:'#fbbf24', border:'1px solid rgba(234,179,8,0.2)'}
                                            }>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterviewHistory
