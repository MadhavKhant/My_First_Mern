import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradiant-to-r from- via-#12D8FA to-#A6FFCB'
        style={{
        backgroundImage: 'linear-gradient(to right, #1FA2FF, #12D8FA, #A6FFCB)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
        {" "}
        {text}  
    </span>
  )
}

export default HighlightText
