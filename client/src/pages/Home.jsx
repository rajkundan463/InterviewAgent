import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';


function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex flex-col' style={{background:'#0a0f1e'}}>
      {/* Ambient background blobs */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        background:'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(16,185,129,0.04) 0%, transparent 60%)'
      }}/>

      <div style={{position:'relative', zIndex:1}}>
        <Navbar />

        <div className='flex-1 px-6 py-20'>
          <div className='max-w-6xl mx-auto'>

            {/* Hero Badge */}
            <div className='flex justify-center mb-8'>
              <motion.div
                initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
                className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium'
                style={{background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', color:'#34d399'}}>
                <HiSparkles size={15} />
                AI-Powered Smart Interview Platform
              </motion.div>
            </div>

            {/* Hero Headline */}
            <div className='text-center mb-28'>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto mb-6'
                style={{color:'#f1f5f9', letterSpacing:'-0.02em'}}>
                Practice Interviews with{' '}
                <span className='text-gradient'>AI Intelligence</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay:0.2 }}
                className='max-w-2xl mx-auto text-lg leading-relaxed'
                style={{color:'#64748b'}}>
                Role-based mock interviews with smart follow-ups,
                adaptive difficulty and real-time performance evaluation.
              </motion.p>

              <motion.div
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.4}}
                className='flex flex-wrap justify-center gap-4 mt-10'>
                <button
                  onClick={() => {
                    if (!userData) { setShowAuth(true); return; }
                    navigate("/interview")
                  }}
                  className='btn-primary px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide'>
                  Start Interview →
                </button>

                <button
                  onClick={() => {
                    if (!userData) { setShowAuth(true); return; }
                    navigate("/history")
                  }}
                  className='btn-ghost px-8 py-3.5 rounded-full font-semibold text-sm'>
                  View History
                </button>
              </motion.div>
            </div>

            {/* Steps Cards */}
            <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-28'>
              {[
                {
                  icon: <BsRobot size={22} />,
                  step: "Step 01",
                  title: "Role & Experience Selection",
                  desc: "AI adjusts difficulty based on your selected job role and experience level."
                },
                {
                  icon: <BsMic size={22} />,
                  step: "Step 02",
                  title: "Smart Voice Interview",
                  desc: "Dynamic follow-up questions that adapt based on your responses in real time."
                },
                {
                  icon: <BsClock size={22} />,
                  step: "Step 03",
                  title: "Timer Based Simulation",
                  desc: "Experience real interview pressure with precise time tracking per question."
                }
              ].map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 + index * 0.15 }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  className={`card-glass relative rounded-3xl p-8 w-80 max-w-[90%] transition-all duration-300
                    ${index === 0 ? "rotate-[-3deg]" : ""}
                    ${index === 1 ? "rotate-[2deg] md:-mt-6" : ""}
                    ${index === 2 ? "rotate-[-2deg]" : ""}
                  `}
                  style={{boxShadow: index === 1 ? '0 0 40px rgba(16,185,129,0.12)' : '0 4px 24px rgba(0,0,0,0.3)'}}>

                  <div className='absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl flex items-center justify-center'
                    style={{background:'linear-gradient(135deg,#10b981,#059669)', boxShadow:'0 8px 24px rgba(16,185,129,0.35)', color:'white'}}>
                    {item.icon}
                  </div>

                  <div className='pt-8 text-center'>
                    <div className='text-xs font-bold mb-2 tracking-widest' style={{color:'#10b981'}}>{item.step}</div>
                    <h3 className='font-bold mb-3 text-base' style={{color:'#f1f5f9'}}>{item.title}</h3>
                    <p className='text-sm leading-relaxed' style={{color:'#64748b'}}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Capabilities Section */}
            <div className='mb-32'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-center mb-16'>
                <div className='text-xs font-bold tracking-widest mb-3' style={{color:'#10b981'}}>CAPABILITIES</div>
                <h2 className='text-4xl font-bold' style={{color:'#f1f5f9', letterSpacing:'-0.02em'}}>
                  Advanced AI <span className='text-gradient'>Features</span>
                </h2>
              </motion.div>

              <div className='grid md:grid-cols-2 gap-6'>
                {[
                  {
                    image: evalImg,
                    icon: <BsBarChart size={18} />,
                    title: "AI Answer Evaluation",
                    desc: "Scores communication, technical accuracy and confidence in real time."
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={18} />,
                    title: "Resume Based Interview",
                    desc: "Project-specific questions generated from your uploaded resume."
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={18} />,
                    title: "Downloadable PDF Report",
                    desc: "Detailed strengths, weaknesses and actionable improvement insights."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={18} />,
                    title: "History & Analytics",
                    desc: "Track progress with performance graphs and topic-level analysis."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className='card-glass rounded-3xl p-8 transition-all duration-300'>
                    <div className='flex flex-col md:flex-row items-center gap-8'>
                      <div className='w-full md:w-1/2 flex justify-center'>
                        <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-56 rounded-xl' style={{opacity:0.9}}/>
                      </div>
                      <div className='w-full md:w-1/2'>
                        <div className='w-10 h-10 rounded-xl flex items-center justify-center mb-5'
                          style={{background:'rgba(16,185,129,0.15)', color:'#10b981'}}>
                          {item.icon}
                        </div>
                        <h3 className='font-bold mb-2 text-lg' style={{color:'#f1f5f9'}}>{item.title}</h3>
                        <p className='text-sm leading-relaxed' style={{color:'#64748b'}}>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interview Modes */}
            <div className='mb-32'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-center mb-16'>
                <div className='text-xs font-bold tracking-widest mb-3' style={{color:'#10b981'}}>MODES</div>
                <h2 className='text-4xl font-bold' style={{color:'#f1f5f9', letterSpacing:'-0.02em'}}>
                  Multiple Interview <span className='text-gradient'>Modes</span>
                </h2>
              </motion.div>

              <div className='grid md:grid-cols-2 gap-6'>
                {[
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Behavioral and communication based evaluation."
                  },
                  {
                    img: techImg,
                    title: "Technical Mode",
                    desc: "Deep technical questioning based on your selected role."
                  },
                  {
                    img: confidenceImg,
                    title: "Confidence Detection",
                    desc: "Basic tone and voice analysis insights."
                  },
                  {
                    img: creditImg,
                    title: "Credits System",
                    desc: "Unlock premium interview sessions with ease."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className='card-glass rounded-3xl p-8 transition-all duration-300'>
                    <div className='flex items-center justify-between gap-6'>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2" style={{color:'#f1f5f9'}}>{mode.title}</h3>
                        <p className="text-sm leading-relaxed" style={{color:'#64748b'}}>{mode.desc}</p>
                      </div>
                      <div className="w-24 flex justify-end flex-shrink-0">
                        <img src={mode.img} alt={mode.title} className="w-20 h-20 object-contain" style={{opacity:0.9}} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        <Footer />
      </div>
    </div>
  )
}

export default Home
