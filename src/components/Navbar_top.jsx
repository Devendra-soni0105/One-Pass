import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar_top = () => {
  return (<>
    
      <div className="  backdrop-blur-lg- bg-white/10 border border-white/20 p-2  z-10 flex justify-between items-center">
        <div className="flex flex-col"><span className='text-5xl font-extrabold tracking-wide bg-linear-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text'>OnePass</span>
          <span className="text-xl text-[#848388] capitalize">password manager web app</span>
        </div>
        <NavLink to="/home"><button className='text-2xl p-3 px-4 rounded-xl bg-[#218DE2] hover:bg-[#218de278] text-white '>Get Started</button></NavLink>
      </div>

    <h1 className='text-[#ffeb3b] w-4xl absolute text-justify top-[25%] left-[10%] z-40 text-7xl  font-bold'>"Protect Your Digital Life with Ease.
      <br />Access your passwords anytime,anywhere,on any device"
    </h1>
  
  </>
  )
}

export default Navbar_top