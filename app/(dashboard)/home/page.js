"use client";

import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PasswordCard from "../../../components/PasswordCard";

export default function Home() {
  const { data: session } = useSession();
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPasswords = async () => {
      if (!session) return;
      try {
        const res = await fetch("/api/passwords");
        if (res.ok) {
          const data = await res.json();
          setPasswords(data);
        }
      } catch (error) {
        console.error("Failed to fetch passwords:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPasswords();
  }, [session]);

  const filteredPasswords = passwords.filter((pwd) => 
    pwd.websiteName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (pwd.username && pwd.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex justify-between items-center mb-10 relative h-10 w-full">
        <div className="text-xl font-medium text-gray-400 absolute left-1/2 transform -translate-x-1/2">Home</div>
        
        <div className="ml-auto z-10">
          {session && (
            <div className="flex items-center gap-3 bg-[#1e2a47]/50 rounded-full px-4 py-2 border border-white/5 shadow-[0_0_15px_rgba(0,180,255,0.1)]">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-300">Welcome, <span className="font-bold text-white">{session.user?.name?.split(" ")[0] || "User"}</span></div>
              </div>
              {session.user?.image ? (
                <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-blue-500/50" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto mb-12 gap-6">
        <div className="flex items-center w-full md:w-[60%] border-b border-gray-400 pb-2">
          <input 
            type="text" 
            placeholder="Search here" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-300 placeholder-gray-500"
          />
          <Search className="text-gray-400 w-5 h-5 ml-2 cursor-pointer" />
        </div>
        
        <div className="flex flex-col items-center bg-[#1e2a47] rounded-xl px-6 py-2 shadow-lg border border-white/5">
          <span className="text-gray-300 text-sm">Total vaults</span>
          <span className="text-green-500 font-bold text-xl">{passwords.length}</span>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">All passwords</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : passwords.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white/5 rounded-xl border border-white/10">
            You haven't added any passwords yet. Go to the Add tab to create your first vault!
          </div>
        ) : filteredPasswords.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white/5 rounded-xl border border-white/10">
            No passwords found matching "{searchQuery}"
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPasswords.map((pwd) => (
              <PasswordCard 
                key={pwd._id} 
                id={pwd._id}
                title={pwd.websiteName} 
                username={pwd.username} 
                password={pwd.password}
                isFavorite={pwd.isFavorite}
                url={pwd.url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
