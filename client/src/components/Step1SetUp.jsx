import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import api from "../utils/api"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const {userData} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        color: '#f1f5f9',
        outline: 'none',
        fontSize: '14px',
        transition: 'border-color 0.2s'
    };

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)
        const formdata = new FormData()
        formdata.append("resume", resumeFile)
        try {
            const result = await api.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })
            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
            setAnalyzing(false);
        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
           const result = await api.post(ServerUrl + "/api/interview/generate-questions",
               {role, experience, mode, resumeText, projects, skills},
               {withCredentials: true})
           if (userData) {
               dispatch(setUserData({...userData, credits: result.data.creditsLeft}))
           }
           setLoading(false)
           onStart(result.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center px-4 py-10'
            style={{background:'#0a0f1e'}}>

            <div className='w-full max-w-5xl rounded-3xl overflow-hidden grid md:grid-cols-2'
                style={{background:'rgba(15,22,41,0.9)', border:'1px solid rgba(255,255,255,0.07)', boxShadow:'0 24px 80px rgba(0,0,0,0.6)'}}>

                {/* Left panel */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className='p-10 flex flex-col justify-center'
                    style={{background:'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(5,150,105,0.04) 100%)', borderRight:'1px solid rgba(255,255,255,0.06)'}}>

                    <div className='text-xs font-bold tracking-widest mb-4' style={{color:'#10b981'}}>AI INTERVIEW</div>
                    <h2 className="text-3xl font-bold mb-4" style={{color:'#f1f5f9', letterSpacing:'-0.01em'}}>
                        Start Your AI Interview
                    </h2>
                    <p className="text-sm leading-relaxed mb-10" style={{color:'#64748b'}}>
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className='space-y-3'>
                        {[
                            { icon: <FaUserTie />, text: "Choose Role & Experience" },
                            { icon: <FaMicrophoneAlt />, text: "Smart Voice Interview" },
                            { icon: <FaChartLine />, text: "Performance Analytics" },
                        ].map((item, index) => (
                            <motion.div key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.12 }}
                                className='flex items-center gap-4 p-4 rounded-xl'
                                style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)'}}>
                                <span style={{color:'#10b981'}}>{item.icon}</span>
                                <span className='text-sm font-medium' style={{color:'#94a3b8'}}>{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right panel */}
                <motion.div
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="p-10">

                    <h2 className='text-2xl font-bold mb-8' style={{color:'#f1f5f9', letterSpacing:'-0.01em'}}>
                        Interview Setup
                    </h2>

                    <div className='space-y-5'>
                        <div className='relative'>
                            <FaUserTie className='absolute top-[14px] left-4 text-sm' style={{color:'#475569'}} />
                            <input type='text' placeholder='Enter role (e.g. Frontend Developer)'
                                style={{...inputStyle, paddingLeft:'40px'}}
                                onChange={(e) => setRole(e.target.value)} value={role}
                                onFocus={e => e.target.style.borderColor='rgba(16,185,129,0.5)'}
                                onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.08)'}
                            />
                        </div>

                        <div className='relative'>
                            <FaBriefcase className='absolute top-[14px] left-4 text-sm' style={{color:'#475569'}} />
                            <input type='text' placeholder='Experience (e.g. 2 years)'
                                style={{...inputStyle, paddingLeft:'40px'}}
                                onChange={(e) => setExperience(e.target.value)} value={experience}
                                onFocus={e => e.target.style.borderColor='rgba(16,185,129,0.5)'}
                                onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.08)'}
                            />
                        </div>

                        <select value={mode} onChange={(e) => setMode(e.target.value)} style={inputStyle}>
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='rounded-xl p-6 text-center cursor-pointer transition-all'
                                style={{border:'2px dashed rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.02)'}}>
                                <FaFileUpload className='mx-auto mb-3 text-2xl' style={{color:'#10b981'}} />
                                <input type="file" accept="application/pdf" id="resumeUpload" className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])} />
                                <p className='text-sm' style={{color:'#64748b'}}>
                                    {resumeFile ? resumeFile.name : "Upload resume (Optional)"}
                                </p>
                                {resumeFile && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleUploadResume() }}
                                        className='mt-4 px-5 py-2 rounded-lg text-sm font-semibold btn-primary'>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='rounded-xl p-5 space-y-4'
                                style={{background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.15)'}}>
                                <h3 className='font-bold text-sm' style={{color:'#10b981'}}>Resume Analysis ✓</h3>
                                {projects.length > 0 && (
                                    <div>
                                        <p className='text-xs font-semibold mb-2' style={{color:'#64748b'}}>PROJECTS</p>
                                        <ul className='space-y-1'>
                                            {projects.map((p, i) => (
                                                <li key={i} className='text-sm' style={{color:'#94a3b8'}}>• {p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {skills.length > 0 && (
                                    <div>
                                        <p className='text-xs font-semibold mb-2' style={{color:'#64748b'}}>SKILLS</p>
                                        <div className='flex flex-wrap gap-2'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='px-3 py-1 rounded-full text-xs font-medium'
                                                    style={{background:'rgba(16,185,129,0.12)', color:'#34d399', border:'1px solid rgba(16,185,129,0.2)'}}>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className='w-full py-3.5 rounded-xl text-base font-bold transition-all btn-primary'
                            style={(!role || !experience || loading) ? {opacity:0.5, cursor:'not-allowed'} : {}}>
                            {loading ? "Generating questions..." : "Start Interview →"}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp
