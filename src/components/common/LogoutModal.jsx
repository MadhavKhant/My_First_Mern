import React from 'react'
import { useEffect } from 'react';




const LogoutModal = ({modalData}) => {

  const { text1, text2, btnT1, btnT2, btnH1, btnH2 } = modalData;

  // Scroll to the top of the page when the modal appears
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='h-full w-full min-w-[1400px] min-h-[500px] border-2 border-richblack-25 mx-auto p-2 z-50 inset-0
        absolute top-[0%] left-[0%] right-[0%] bottom-[0%] flex items-center bg-richblack-700 bg-opacity-[95%]'>

        <div className='flex flex-col w-fit h-fit rounded-3xl mx-auto gap-4 border-2 
          translate-y-[-80px] border-yellow-100 p-7 bg-richblack-900'>
          <div className='flex flex-col gap-3 text-pink-50 text-lg'>
            <p>
              {text1}
            </p>
            <p>
              {text2}
            </p>
          </div>

          <div className='text-white  flex flex-row justify-evenly items-center '>
            <button onClick={btnH1} className='text-white p-2 rounded-3xl px-5 hover:scale-[90%]
               bg-brown-800 hover:bg-richblack-700 transition-all duration-200 '>
              {btnT1}
            </button>
            <button onClick={btnH2} 
              className='text-white p-2 rounded-3xl px-5 hover:scale-[90%]
               bg-brown-800 hover:bg-richblack-700 transition-all duration-200 '
            >
              {btnT2}
            </button>
          </div>
        </div>

    </div>
  )
}

export default LogoutModal
