import React from 'react'
import Content from './Home/Content'
import { NavLink } from 'react-router-dom'
import Navbar_top from './Navbar_top'


const Landing = () => {
  return (<>
  <div className="flex flex-col w-screen h-screen relative">
    <Navbar_top />
    <video src="/bg.mp4" autoPlay loop muted className='w-full h-full object-cover absolute'></video>
    
    <div className='w-screen h-screen flex items-center justify-center'>
      
    </div>
    </div>
    </>
  )
}

export default Landing