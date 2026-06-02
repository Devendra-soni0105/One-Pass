"use client";

import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PasswordCard from "../../../components/PasswordCard";

export default function Favorites() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session) return;
      try {
        const res = await fetch("/api/passwords");
        if (res.ok) {
          const data = await res.json();
          setFavorites(data.filter(pwd => pwd.isFavorite));
        }
      } catch (error) {
        console.error("Failed to fetch passwords:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, [session]);

  return (
    <div className="flex flex-col h-full text-white">
      <div className="text-center text-xl font-medium text-gray-400 mb-8">Favorites</div>
      
      <div className="flex flex-col mb-10 gap-2">
        <div className="flex items-center gap-3">
          <Star className="text-yellow-400 fill-yellow-400 w-8 h-8" />
          <h2 className="text-3xl font-bold">All favorites</h2>
        </div>
        <p className="text-gray-400 text-sm">Your starred passwords are shown here for quick access.</p>
      </div>

      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white/5 rounded-xl border border-white/10">
            You don't have any favorite passwords yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((pwd) => (
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
