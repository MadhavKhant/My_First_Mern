import React from 'react'

const GradiantCirclePink = ({ margin }) => {
  return (
    <div className={`absolute inset-0 h-[400px] w-[400px] ${margin}`}
      style={{
        background: `
          radial-gradient(circle at 50% 50%, #FF69B4 10%, rgba(255, 105, 180, 0.5) 40%, transparent 70%),
          radial-gradient(circle at 50% 50%, #FF1493 10%, rgba(255, 20, 147, 0.5) 40%, transparent 70%),
          radial-gradient(circle at 50% 50%, #FFB6C1 10%, rgba(255, 182, 193, 0.5) 40%, transparent 70%)
        `,
        opacity: 0.3,
      }}
    >
    </div>
  )
}

export default GradiantCirclePink
