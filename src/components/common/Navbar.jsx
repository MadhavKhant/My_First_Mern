import React from 'react'
import Image from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { RiArrowDownSLine } from "react-icons/ri";
import {AiOutlineShoppingCart} from "react-icons/ai"
import { useSelector } from 'react-redux';
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { useEffect } from 'react';
import { categories } from '../../services/apis';
import {BsChevronDown} from 'react-icons/bs'


const Navbar = () => {

    const [subLinks, setSubLinks] = useState([])
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    
    const location = useLocation();
    const data = NavbarLinks;
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    useEffect(() => {
        const FetchingAndSettingCategories = async () => {
            setLoading(true)
    
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API)
                setSubLinks(res.data.data)
            } catch (error) {
                console.log("Could not fetch Categories.", error)
            }
    
            setLoading(false)
        }
        FetchingAndSettingCategories();
      }, [])


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
                                        <>
                                            <div
                                            className={`group relative flex cursor-pointer items-center gap-1 ${
                                                matchRoute("/Catalog/:CatalogName")
                                                ? "text-yellow-25"
                                                : "text-richblack-25"
                                            }`}
                                            >
                                                <p>{ele.title}</p>
                                                <BsChevronDown />
                                                <div className="invisible bg-richblack-5  absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg  p-4  opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                    {
                                                        loading ? 
                                                        (
                                                            <p className="text-center">Loading...</p>
                                                        ) 
                                                        : 
                                                        subLinks.length ? 
                                                        (
                                                            <>
                                                            {
                                                                subLinks.map((subLink, i) => 
                                                                (
                                                                    <Link   
                                                                        to={`/Catalog/${subLink.Name}`}
                                                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 text-black"
                                                                        key={i}
                                                                    >
                                                                    <p>{subLink.Name}</p>
                                                                    </Link>
                                                                )
                                                            )}
                                                            </>
                                                        ) 
                                                        : 
                                                        (
                                                            <p className="text-center">No Courses Found</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                    : 
                                    (
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
