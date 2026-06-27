import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import api from "../utils/api"
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)
      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      const result = await api.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,
        handler: async function (response) {
          const verifypay = await api.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
          dispatch(setUserData(verifypay.data.user))
          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")
        },
        theme: { color: "#10b981" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      setLoadingPlan(null);
    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }

  return (
    <div className='min-h-screen py-16 px-6' style={{background:'#0a0f1e'}}>
      {/* Ambient */}
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        background:'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)'
      }}/>

      <div style={{position:'relative', zIndex:1}}>
        <div className='max-w-6xl mx-auto mb-16 flex items-start gap-4'>
          <button onClick={() => navigate("/")} className='mt-2 p-3 rounded-full transition-all btn-ghost'>
            <FaArrowLeft style={{color:'#94a3b8'}} />
          </button>
          <div className="text-center w-full">
            <div className='text-xs font-bold tracking-widest mb-3' style={{color:'#10b981'}}>PRICING</div>
            <h1 className="text-4xl font-bold" style={{color:'#f1f5f9', letterSpacing:'-0.02em'}}>
              Choose Your <span className='text-gradient'>Plan</span>
            </h1>
            <p className="mt-3 text-lg" style={{color:'#64748b'}}>
              Flexible pricing to match your interview preparation goals.
            </p>
          </div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            return (
              <motion.div key={plan.id}
                whileHover={!plan.default && { scale: 1.03 }}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${plan.default ? "cursor-default" : "cursor-pointer"}`}
                style={{
                  background: isSelected ? 'rgba(16,185,129,0.06)' : 'rgba(15,22,41,0.9)',
                  border: isSelected ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isSelected ? '0 0 40px rgba(16,185,129,0.12)' : '0 4px 24px rgba(0,0,0,0.3)'
                }}>

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full font-semibold"
                    style={{background:'linear-gradient(135deg,#10b981,#059669)', color:'white'}}>
                    {plan.badge}
                  </div>
                )}

                {plan.default && (
                  <div className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full font-medium"
                    style={{background:'rgba(255,255,255,0.06)', color:'#64748b', border:'1px solid rgba(255,255,255,0.08)'}}>
                    Default
                  </div>
                )}

                <h3 className="text-xl font-bold mb-4" style={{color:'#f1f5f9'}}>{plan.name}</h3>

                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-gradient">{plan.price}</span>
                  <p className="text-sm mt-1" style={{color:'#64748b'}}>{plan.credits} Credits included</p>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{color:'#64748b'}}>{plan.description}</p>

                <div style={{height:'1px', background:'rgba(255,255,255,0.06)', marginBottom:'20px'}}/>

                <div className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheckCircle style={{color:'#10b981', fontSize:'13px', flexShrink:0}} />
                      <span className="text-sm" style={{color:'#94a3b8'}}>{feature}</span>
                    </div>
                  ))}
                </div>

                {!plan.default && (
                  <button
                    disabled={loadingPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSelected) { setSelectedPlan(plan.id) }
                      else { handlePayment(plan) }
                    }}
                    className={`w-full mt-8 py-3 rounded-xl font-semibold text-sm transition-all ${
                      isSelected ? 'btn-primary' : 'btn-ghost'
                    }`}>
                    {loadingPlan === plan.id ? "Processing..." : isSelected ? "Proceed to Pay" : "Select Plan"}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Pricing
