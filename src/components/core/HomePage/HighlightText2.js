import React from 'react'

const HighlightText2 = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' // Adjusted Tailwind CSS classes for yellow gradient
        style={{
        backgroundImage: 'linear-gradient(to right, #FDE68A, #FCD34D, #F59E0B)', // Adjusted inline styles for yellow gradient
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
        {" "}
        {text}  
    </span>
  )
}

export default HighlightText2
