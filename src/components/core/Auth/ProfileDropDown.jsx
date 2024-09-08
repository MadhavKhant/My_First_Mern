import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { SlRocket } from "react-icons/sl";
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"
import LogoutModal from "../../common/LogoutModal"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //const [open, setOpen] = useState(false)
  //const ref = useRef(null)
  //useOnClickOutside(ref, () => setOpen(false))
  const [modalData, setModalData] = useState(null);
 



  if (!user) return null

  return (
    <div onClick={(e) => e.stopPropagation()}
      className="flex gap-4"
    >
      <button
      className="flex items-center gap-4 border-[1.4px] border-richblack-500 
      rounded-2xl py-3 px-5 hover:scale-[90%] transition-all duration-300 hover:bg-richblack-600
      bg-black text-yellow-100 font-bold"

      onClick={() => {
        navigate("/dashboard/my-profile")
      }}
      >
        <img
          src={user?.Image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />

        <div className="flex gap-2 items-center">
          <SlRocket/>
          <p>Dashboard</p>
        </div>
      </button>

      <button 
        className="py-1 px-3 rounded-xl hover:font-semibold hover:bg-black hover:text-richblack-50 bg-richblack-800 hover:scale-[90%] transition-all duration-300
         text-richblack-300 font-bold border-[1.2px] border-richblack-500"
        
        onClick={() => {
          setModalData({
            text1:"Are You Sure?",
            text2: "You will be logged out of your Account",
            btnT1: "LogOut",
            btnT2: "Cancle",
            btnH1: () => dispatch(logout(navigate)),
            btnH2: () => setModalData(null)

          })
        }}
      >
        Logout
      </button>

      {modalData && <LogoutModal modalData={modalData}/>}
    </div>
  )

  // return (
  //   <button className="relative" onClick={() => setOpen(true)}>
  //     <div className="flex items-center gap-x-1">
  //       <img
  //         src={user?.Image}
  //         alt={`profile-${user?.firstName}`}
  //         className="aspect-square w-[30px] rounded-full object-cover"
  //       />
  //       <AiOutlineCaretDown className="text-sm text-richblack-100" />
  //     </div>
  //     {open && (
  //       <div
  //         onClick={(e) => e.stopPropagation()}
  //         className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
  //         ref={ref}
  //       >

  //         <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
  //           <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
  //             <VscDashboard className="text-lg" />
  //             Dashboard
  //           </div>
  //         </Link>

  //         <div
  //           onClick={() => {
  //             dispatch(logout(navigate))
  //             setOpen(false)
  //           }}
  //           className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
  //         >
  //           <VscSignOut className="text-lg" />
  //           Logout
  //         </div>

  //       </div>
  //     )}
  //   </button>
  // )
}