import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {
    const percentage = (timeLeft/totalTime)*100
    const isLow = timeLeft <= 15;
  return (
    <div className='w-20 h-20'>
        <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "28px",
          pathColor: isLow ? "#ef4444" : "#10b981",
          textColor: isLow ? "#ef4444" : "#f1f5f9",
          trailColor: "rgba(255,255,255,0.06)",
        })}
        />
    </div>
  )
}

export default Timer
