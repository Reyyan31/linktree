"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()
  
  // Only show navbar on these routes
  const showNavbar = pathname === "/" || pathname === "/generate"

  if (!showNavbar) return null

  return (
    <nav className='bg-white w-[80vw] flex justify-between fixed top-10 right-[10vw] rounded-full p-3'>
      <div className="logo flex gap-14 items-center">
        <Link href={"/"}>
          <span className='flex gap-2 mx-4 items-center text-2xl font-bold'>
            LinkTree
            <svg className='h-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlSpace="preserve">
              <path d="m13.511 5.853 4.005-4.117 2.325 2.381-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2V8.122h5.909L3.708 4.117l2.325-2.381 4.005 4.117V0h3.473v5.853zM10.038 16.16h3.473v7.842h-3.473V16.16z"></path>
            </svg>
          </span> 
        </Link>
        <ul className='flex gap-8'>
          <li className='cursor-pointer'>Templates</li>
          <li className='cursor-pointer'>MarketPlace</li>
          <li className='cursor-pointer'>Discover</li>
          <li className='cursor-pointer'>Pricing</li>
          <li className='cursor-pointer'>Learn</li>
        </ul>
      </div>

      <div className='flex gap-4 mx-8'>
        <button className="login font-bold bg-gray-500 p-4 rounded-lg cursor-pointer">
          Log in
        </button>
        <button className="signup bg-gray-900 p-4 text-white rounded-full cursor-pointer">
          Signup Free
        </button>
      </div>
    </nav>
  )
}

export default Navbar