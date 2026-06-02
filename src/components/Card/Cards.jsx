import React, { useContext, useState } from 'react';
import FavIcon from "../../icons/star.svg?react";
import Copy from "../../icons/copy.svg?react";
import { Credentials_favContext } from '../Credentials_favContext';

const Cards = ({ credential }) => {
  const { setCredentials } = useContext(Credentials_favContext);
  const [copied, setCopied] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  if (!credential) return null;

  const toggleFavorite = (id) => {
    setCredentials(prev => {
      const updated = prev.map(cred =>
        cred.id === id ? { ...cred, isFav: !cred.isFav } : cred
      );

      localStorage.setItem("credentials", JSON.stringify(updated));
      return updated;
    });
  };

  // -------------------------------
  // FIXED ICON LOGIC WITH FALLBACK
  // -------------------------------
  const getIcon = () => {
    const checkUrl = credential.url?.trim().replace(/\/$/, "");

    if (checkUrl && !showFallback) {
      return (
        <img
          className="object-contain w-10 h-10 rounded-full"
          src={`${checkUrl}/favicon.ico`}
          onError={() => setShowFallback(true)}
          alt="icon"
        />
      );
    }

    // fallback circle with first letter
    return (
      <div className="rounded-full bg-blue-500 text-white text-2xl flex items-center justify-center w-full h-full">
        {credential.appname?.charAt(0)?.toUpperCase() ?? "?"}
      </div>
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${credential.username}\n${credential.password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col px-3 py-4 border-black rounded-xl bg-[#273d6c69]">

      <div className="flex p-6 gap-x-5 items-center py-8">
        <div className="flex bg-white justify-center items-center rounded-full overflow-hidden w-12 h-12">
          {getIcon()}
        </div>

        <div className="flex flex-col gap-1 px-3 items-start rounded-lg">
          <div className="text-white text-2xl font-semibold">{credential.appname}</div>
          <div className="text-white text-lg opacity-80">{credential.username}</div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-x-3 px-6 pb-3">
        <div className="text-white text-xl"><input type="password" value={credential.password} readOnly /></div>
        <div className=" relative flex gap-x-3 items-center">
          <FavIcon
            onClick={() => toggleFavorite(credential.id)}
            className={`w-7 h-7 cursor-pointer transition-all duration-200 
            ${credential.isFav ? "fill-yellow-400" : "fill-white"}`}
          />

          <Copy
            onClick={handleCopy}
            className="w-7 h-7 cursor-pointer fill-white"
          />

          {copied && (
            <span className="absolute z-20 -bottom-6  flex gap-2 items-center justify-center font-bold text-xl text-green-500">
              <img src="/copy.png" alt="Copied" className="w-6 h-6" />
              <span>copied</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;