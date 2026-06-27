import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background:'#0a0f1e'}}>
        <p className="text-lg" style={{color:'#64748b'}}>Loading Report...</p>
      </div>
    );
  }
  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, { align: "center" });

    currentY += 5;
    doc.setDrawColor(34, 197, 94);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
    currentY += 15;

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, { align: "center" });
    currentY += 30;

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");
    doc.setFontSize(12);
    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);
    currentY += 45;

    let advice = "";
    if (finalScore >= 8) {
      advice = "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice = "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice = "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);
    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);
    currentY += 50;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`, q.question, `${q.score}/10`, q.feedback,
      ]),
      styles: { fontSize: 9, cellPadding: 5, valign: "top" },
      headStyles: { fillColor: [34, 197, 94], textColor: 255, halign: "center" },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 55 },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: "auto" },
      },
      alternateRowStyles: { fillColor: [249, 250, 251] },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  const cardStyle = {
    background: 'rgba(15,22,41,0.9)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
  };

  return (
    <div className='min-h-screen px-4 sm:px-6 lg:px-10 py-8' style={{background:'#0a0f1e'}}>
      <div style={{
        position:'fixed', top:0, left:0, right:0, bottom:0, pointerEvents:'none', zIndex:0,
        background:'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)'
      }}/>

      <div style={{position:'relative', zIndex:1}}>
        <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='flex items-start gap-4 flex-wrap'>
            <button onClick={() => navigate("/history")}
              className='mt-1 p-3 rounded-full btn-ghost transition'>
              <FaArrowLeft style={{color:'#94a3b8'}} />
            </button>
            <div>
              <div className='text-xs font-bold tracking-widest mb-2' style={{color:'#10b981'}}>REPORT</div>
              <h1 className='text-3xl font-bold' style={{color:'#f1f5f9', letterSpacing:'-0.01em'}}>
                Interview Analytics
              </h1>
              <p className='mt-1 text-sm' style={{color:'#64748b'}}>AI-powered performance insights</p>
            </div>
          </div>

          <button onClick={downloadPDF}
            className='btn-primary px-6 py-3 rounded-xl font-semibold text-sm text-nowrap'>
            Download PDF
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
          {/* Left column */}
          <div className='space-y-6'>
            {/* Score Circle */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center" style={cardStyle}>
              <p className="mb-4 text-sm font-medium" style={{color:'#64748b'}}>Overall Performance</p>
              <div className='relative w-28 h-28 mx-auto'>
                <CircularProgressbar
                  value={percentage}
                  text={`${score}/10`}
                  styles={buildStyles({
                    textSize: "18px",
                    pathColor: "#10b981",
                    textColor: "#f1f5f9",
                    trailColor: "rgba(255,255,255,0.06)",
                  })}
                />
              </div>
              <p className="mt-3 text-xs" style={{color:'#475569'}}>Out of 10</p>
              <div className="mt-4">
                <p className="font-bold text-sm" style={{color:'#f1f5f9'}}>{performanceText}</p>
                <p className="text-xs mt-1" style={{color:'#64748b'}}>{shortTagline}</p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className='rounded-2xl sm:rounded-3xl p-6 sm:p-8' style={cardStyle}>
              <h3 className="font-bold mb-6 text-base" style={{color:'#f1f5f9'}}>Skill Evaluation</h3>
              <div className='space-y-5'>
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className='flex justify-between mb-2 text-sm'>
                      <span style={{color:'#94a3b8'}}>{s.label}</span>
                      <span className='font-bold' style={{color:'#10b981'}}>{s.value}</span>
                    </div>
                    <div className='h-2 rounded-full' style={{background:'rgba(255,255,255,0.06)'}}>
                      <div className='h-full rounded-full transition-all duration-700'
                        style={{width:`${s.value * 10}%`, background:'linear-gradient(90deg,#10b981,#34d399)'}} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Chart */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className='rounded-2xl sm:rounded-3xl p-5 sm:p-8' style={cardStyle}>
              <h3 className="font-bold mb-6 text-base" style={{color:'#f1f5f9'}}>Performance Trend</h3>
              <div className='h-64 sm:h-72'>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData}>
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" tick={{fill:'#64748b', fontSize:12}} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{fill:'#64748b', fontSize:12}} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{background:'#0f1629', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', color:'#f1f5f9'}}
                      labelStyle={{color:'#94a3b8'}}
                    />
                    <Area type="monotone" dataKey="score" stroke="#10b981" fill="url(#scoreGrad)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Question Breakdown */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className='rounded-2xl sm:rounded-3xl p-5 sm:p-8' style={cardStyle}>
              <h3 className="font-bold mb-6 text-base" style={{color:'#f1f5f9'}}>Question Breakdown</h3>
              <div className='space-y-5'>
                {questionWiseScore.map((q, i) => (
                  <div key={i} className='p-4 sm:p-5 rounded-xl sm:rounded-2xl'
                    style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3'>
                      <div>
                        <p className="text-xs font-medium mb-1" style={{color:'#475569'}}>Question {i + 1}</p>
                        <p className="font-semibold text-sm leading-relaxed" style={{color:'#f1f5f9'}}>
                          {q.question || "Question not available"}
                        </p>
                      </div>
                      <div className='px-3 py-1 rounded-full font-bold text-xs w-fit flex-shrink-0'
                        style={{background:'rgba(16,185,129,0.12)', color:'#34d399', border:'1px solid rgba(16,185,129,0.25)'}}>
                        {q.score ?? 0}/10
                      </div>
                    </div>

                    <div className='p-3 rounded-lg' style={{background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.15)'}}>
                      <p className='text-xs font-bold mb-1' style={{color:'#10b981'}}>AI Feedback</p>
                      <p className='text-sm leading-relaxed' style={{color:'#94a3b8'}}>
                        {q.feedback && q.feedback.trim() !== ""
                          ? q.feedback
                          : "No feedback available for this question."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Report
