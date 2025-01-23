import { BriefcaseBusinessIcon, User } from 'lucide-react';
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
  const isConnected:boolean = false;
  return (
    <div className='container mx-auto'>
      <nav className='w-full max-w-[98%] mx-auto p-3 navbar items-baseline flex justify-between'>
        <span className="navbar-brand inline-flex gap-2"><BriefcaseBusinessIcon />Job Portal</span>
          <ul className='inline-flex items-baseline gap-10'>
            <li><Link className='hover:text-[#309689] font-semibold' href={""}>Home</Link></li>
            <li><Link className='hover:text-[#309689] font-semibold' href={"/jobs"}>Jobs</Link></li>
            <li><Link className='hover:text-[#309689] font-semibold' href={""}>About Us</Link></li>
            <li><Link className='hover:text-[#309689] font-semibold' href={""}>Contact Us</Link></li>
          </ul>
          <div className="btn-group inline-flex items-baseline gap-4 ">
            {isConnected? 
          <ul className='inline-flex items-baseline gap-5'>
            <li><User/></li>
            <li><Link href={""}>Entreprises / Publier une offre d&apos;emploi</Link></li>
          </ul>
          :
          <>
            <Link href={''}>Login</Link>
            <button className='rounded-md p-1 bg-[#309689] px-3 font-semibold'>Register</button>
          </>
          }
          </div>
      </nav>
    </div>
  )
}

export default Navbar