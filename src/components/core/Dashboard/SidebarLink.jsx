import React from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom'



// {   element data:->

//     id: 1,
//     name: "My Profile",
//     path: "/dashboard/my-profile",
//     icon: "VscAccount",
//   },

const SidebarLink = ({path, icon, name}) => {

    const location = useLocation();
   

    const matchroute =  (route) => {
        return matchPath({path:route}, location.pathname)
    }  



  return (
    <NavLink
        to={path}
        className={`
            ${matchroute(path) ? "scale-95" : "bg-opacity-0"} 
            relative p-3 rounded-lg 
            `}
    >
       
        
        <div 
            className={` ${matchroute(path) ? "bg-yellow-600" : " bg-puregreys-200"}
                        flex flex-row justify-center gap-2 transition-all 
                        duration-200 hover:text-richblack-25 hover:bg-richblack-800
                        rounded-lg py-2 px-3  font-semibold border-2 text-richblack-900
                        hover:scale-[85%]`}>
            {/* <Icon className='text-lg' /> */}
            <span className='text-lg'>{name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink
