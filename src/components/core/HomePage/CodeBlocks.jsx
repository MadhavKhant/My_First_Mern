import React from 'react'
import CTAButton from './Button'
import { FaLongArrowAltRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, bgGradiant, codeblock, codecolor}) => {
  return (
    <div className={`flex ${position} gap-[30px] max-h-[522px] justify-evenly`}>

        {/* Section 1 */}
        <div className='w-5/12 h-[284px] flex flex-col gap-[1px] justify-between '>
            {heading}
            <div className='text-richblack-300 font-bold '>
                {subheading}
            </div>

            <div className='flex flex-row justify-between max-w-[300px]'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex flex-row justify-between text-center items-center gap-2'>
                        {ctabtn1.Text}
                        <FaLongArrowAltRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.Text}
                </CTAButton>
            </div>
        </div>

        {/* Section 2 */}
        <div className='w-5/12 relative flex p-[32px] gap-2 border-2 border-orange-200'
            style={{
                border: '1px solid',
                borderImageSource: 'linear-gradient(121.74deg, rgba(255, 255, 255, 0.22) -7.75%, rgba(255, 255, 255, 0) 37.38%)',
                borderImageSlice: 1,
            }}>
            <div className='flex flex-col text-richblack-400 font-bold ml-[10px]'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>

            {/* Typing Automatically code */}
            <div className={`flex flex-col w-[800px] gap-2 font-bold font-mono ${codecolor} z-50 `}>
                <TypeAnimation
                    sequence={[codeblock, 1000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={{
                        display: 'block',
                        whiteSpace: "pre-line",
                    }}
                />
            </div>

            <div className='absolute  rounded-full z-30 opacity-20 w-[400px] h-[400px] bottom-[6px] left-[-50px]'
                style={{
                    background: `
                        radial-gradient(circle at 50% 50%, #1FA2FF 0%, rgba(31, 162, 255, 0.5) 40%, transparent 70%),
                        radial-gradient(circle at 50% 50%, #12D8FA 0%, rgba(18, 216, 250, 0.5) 40%, transparent 70%),
                        radial-gradient(circle at 50% 50%, #A6FFCB 0%, rgba(166, 255, 203, 0.5) 40%, transparent 70%)
                    `,
                    opacity: '0.2',
                }}

            >
            </div>

        </div>
    </div>
  )
}

export default CodeBlocks
