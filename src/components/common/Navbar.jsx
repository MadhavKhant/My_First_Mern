import React from 'react'
import Image from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { RiArrowDownSLine } from "react-icons/ri";
import {AiOutlineShoppingCart} from "react-icons/ai"
import { useSelector } from 'react-redux';
import ProfileDropDown from '../core/Auth/ProfileDropDown'

const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "web dev",
        link:"/catalog/web-development"
    },
];


const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const location = useLocation();
    const data = NavbarLinks;
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='w-full flex justify-center items-start bg-richblack-800 border-b-2 border-richblack-700'>
        <div className='w-[70%] flex items-center justify-between mt-1 mb-1 p-1'>

            {/* Image */}
            <Link to="/">
                <img src={Image} alt='Studynotionimage' className='w-[180px] h-[40px]' />
            </Link>

            {/* middle section */}
            <div className='flex gap-5'>
                {
                    data.map((ele, index) => {
                        return (
                            <div key={index}>
                                {
                                    ele.title === "Catalog" ? 
                                    (
                                        <div className='flex group items-center gap-x-1'>

                                            <p className='text-richblack-5'>{ele.title}</p>
                                            <RiArrowDownSLine className=' text-white'/>

                                            <div className='invisible absolute left-[50%]
                                                    translate-x-[-62%] 
                                                top-[10%]
                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                                opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[300px] gap-3 item-center justify-center'>

                                                <div className='absolute left-[50%] top-0
                                                translate-x-[80%] 
                                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                </div>

                                                    {
                                                        subLinks.length ? (
                                                                subLinks.map( (subLink, index) => (
                                                                    <Link to={`${subLink.link}`} key={index}
                                                                    className=' text-center text-[24px] rounded-full bg-richblack-500 p-1 scale-95 mt-1 font-bold gap-3'>
                                                                        <p>{subLink.title}</p>
                                                                    </Link>
                                                                ) )
                                                        ) : (<div></div>)
                                                    }
                                                </div>

                                        </div>
                                    )
                                    : (
                                        <Link to={ele.path}>
                                            <p className={`${matchRoute(ele?.path) ? "text-yellow-50" : "text-richblack-5"}`}>
                                                {ele.title}
                                            </p>
                                        </Link>
                                    ) 
                                }
                            </div>   
                        )
                    })
                }
            </div>


            {/* login/signup/dashboard */}

                {/* Case: Not logged in  */}
                {
                    token === null && (
                        
                        <div className='flex gap-x-3  w-fit'>
                            <Link className='text-richblack-5 text-[16px] p-2 px-4 border-2 
                            border-richblack-700 rounded-full bg-richblack-800 hover:scale-[90%] hover:bg-richblack-700' 
                            to={"/login"}>
                                <p>Login</p>
                            </Link>

                            <Link className='text-richblack-5 text-[16px] p-2 px-3 border-2 
                            border-richblack-700 rounded-full bg-richblack-800 hover:scale-[90%] hover:bg-richblack-700'
                            to={"/signup"}>
                                <p>Signup</p>
                            </Link>
                        </div>
                    )
                }

                <div className='flex gap-x-3 items-center text-white'>

                    {/* student login show cart and profiledropdown */}
                    
                    {
                        user && user?.AccountType === "Student" && (
                            <Link to="dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }

                            </Link>
                        )
                    }

                    {/* ProfileDropDown */}
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>

                
        </div>
    </div>
  )
}

export default Navbar
