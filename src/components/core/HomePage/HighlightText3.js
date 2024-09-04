import React from 'react'

const HighlightText3 = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]' // Tailwind CSS classes for custom gradient
        style={{
        backgroundImage: 'linear-gradient(to right, #833AB4, #FD1D1D, #FCB045)', // Inline styles for custom gradient
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
        {" "}
        {text}  
    </span>
  )
}

export default HighlightText3
