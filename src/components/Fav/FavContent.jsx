import React, { useContext } from 'react';
import { TitleContext } from '../../TitleContext';
import { Credentials_favContext } from '../Credentials_favContext';

import Cards from '../Card/Cards';
import FavIcon from "../../icons/star.svg?react";

const FavContent = () => {

  const { title } = useContext(TitleContext);
  const { credentials } = useContext(Credentials_favContext);

  // Filter favorite credentials only once
  const favCredentials = credentials.filter(item => item.isFav);

  return (
    <div className='self-center w-full h-full flex items-center justify-center'>
      <div className='relative gap-5 w-[95%] h-[95%] flex flex-col items-center backdrop-blur-2xl z-30 shadow-[0_0_20px_4px_rgba(0,180,255,0.35)] border border-white/20 rounded-3xl p-6'>

        {/* Title */}
        <div className="flex items-center">
          <h3 className='text-[#848388] text-3xl'>{title}</h3>
        </div>

        {/* Favorites Section */}
        <div className='flex flex-col gap-7 self-start mt-4'>

          <div className='flex flex-col gap-3 text-white text-5xl'>
            <div className='flex gap-2'>
              <FavIcon className="w-12 h-12 fill-amber-400" />
              <div>All favorites</div>
            </div>
            <div className='text-xl'>Your starred passwords are shown here for quick access.</div>
          </div>

          {/* Favorites Cards */}
          <div className='text-white text-4xl flex flex-wrap p-5 gap-5'>
            {favCredentials.map(item => (
              <Cards key={item.id} credential={item} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default FavContent;