import React from 'react'
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { TitleContext } from '../../TitleContext';
import { Credentials_favContext } from '../Credentials_favContext';

import Cards from '../Card/Cards';



const Content = () => {
  const { title } = useContext(TitleContext);
  const { credentials, setCredentials } = useContext(Credentials_favContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetcheddata = window.localStorage.getItem("credentials");
    if (fetcheddata) {
      setCredentials(JSON.parse(fetcheddata));
    }
    else
      setCredentials([])

  }, [])

  const filteredCredentials = credentials.filter(cred => 
    cred.appname?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cred.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );




  return (<>
    <div className='self-center w-full h-full flex items-center justify-center '>
      <div className="relative gap-y-7 w-[95%] h-[95%] flex flex-col items-center backdrop-blur-2xl z-30 shadow-[0_0_20px_4px_rgba(0,180,255,0.35)] border border-white/20 rounded-3xl p-6 ">

        <TitleContext.Provider value={{ title }}>
          <div><h3 className='text-[#848388] text-3xl'>{title}</h3></div>
        </TitleContext.Provider>

        <div className=' text-white flex gap-x-7 justify-between items-center  p-2'>
          <div className='relative flex items-center '>
            <input 
              className="text-2xl text-white border-b-2 border-white w-3xl outline-0 px-2" 
              type="text" 
              name="text" 
              id="text" 
              placeholder='Search here' 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img className='absolute right-0 -top-2 w-9 h-9' src="/search.svg" alt="Search" />
          </div>
          <div className='select-none text-2xl rounded-3xl  hover:shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]  bg-[#273d6c69]  border-black  flex items-center flex-col right-0 box p-3'>Total vaults <span className='text-3xl text-green-500 bold'>{credentials.length}</span> </div>
        </div>

        <div className='flex flex-col items-start justify-start w-full h-full gap-y-5 p-5 '>
          <div className='text-white text-4xl'>All passwords</div>
          <div className='flex flex-wrap gap-6 p-2.5 cards'  >
            <Credentials_favContext.Provider value={{ credentials, setCredentials }}>
              {filteredCredentials.map((credential) => (
                <Cards key={credential.id} credential={credential} />
              ))}
            </Credentials_favContext.Provider>

          </div>
        </div>
      </div>
    </div>


  </>
  )
}

export default Content