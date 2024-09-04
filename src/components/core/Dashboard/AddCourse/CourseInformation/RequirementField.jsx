import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const RequirementField = ({name, register, label, setValue, getValues, errors}) => {

  const [requirement, setRequirement] = useState("")
  const [requirementlist, setRequirementlist] = useState([])

  useEffect(() => {
    register(name, {reuired:true})

    
  },[])

  useEffect(() => {
    setValue(name, requirementlist);
  }, [requirementlist])

  const handleAddRequirement = () => {
    if(requirement){
      setRequirementlist([...requirementlist, requirement])
      setRequirement("");
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementlist = [...requirementlist];
    updatedRequirementlist.splice(index, 1);
    setRequirementlist(updatedRequirementlist);
  }

  return (
    <div>
        <label className='flex flex-col gap-2'>
          <p className='text-white'>{label}</p>
          <input
            type='text'
            id={name}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='rounded-md bg-richblack-700 py-1 px-2 '
          />

          <button
            type='button'
            onClick={handleAddRequirement}
            className='text-white border-richblack-500 
            hover:scale-[90%] transition-all duration-200 border-[1px] w-fit px-3 py-1 hover:text-black hover:bg-richblack-500 rounded-xl bg-richblack-700'
          >
            Add
          </button>
        </label>

        {
            requirementlist.length > 0 && (
              <ul className='flex flex-col gap-1 pt-3'>
                {
                  requirementlist.map((ele, index) => {
                    return (
                      <li key={index} className='flex gap-2 items-center'>
                        <span className='text-white text-sm '>
                          {ele}
                        </span>
                        <button
                          type='button'
                          name='removebutton'
                          onClick={() => handleRemoveRequirement(index)}
                          className='text-white hover:bg-richblack-400 hover:text-black text-[10px]
                           border-richblack-500 border-[1px] w-fit px-2 py-1 rounded-xl bg-richblack-700'
                        >
                          Remove
                        </button>
                      </li>
                    )
                  })
                }
              </ul>
            )
        }
    </div>
  )
}

export default RequirementField
