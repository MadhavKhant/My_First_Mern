import React from 'react'

const GradiantCircle = ({margin}) => {
  return (
    <div className={`absolute inset-0 h-[400px] w-[400px] ${margin}`}
            style={{
                        background: `
                        radial-gradient(circle at 50% 50%, #1FA2FF 10%, rgba(31, 162, 255, 0.5) 40%, transparent 70%),
                        radial-gradient(circle at 50% 50%, #12D8FA 10%, rgba(18, 216, 250, 0.5) 40%, transparent 70%),
                        radial-gradient(circle at 50% 50%, #A6FFCB 10%, rgba(166, 255, 203, 0.5) 40%, transparent 70%)
                        `,
                        opacity: 0.3,
                    }}
        >
    </div>
  )
}

export default GradiantCircle
