import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
    
      <Link to={linkto}>
            <div className={`font-extrabold rounded-full  shadow-button-shadow text-center px-6 py-3 text-sm h-full w-full
                                hover:scale-95 transition-all duration-200 
                    ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}
                    `}>
                {children}
            </div>
      </Link>
    
  );
}

export default Button
