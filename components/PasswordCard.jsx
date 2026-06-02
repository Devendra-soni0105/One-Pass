"use client";

import { Star, Copy, Check, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordCard({ id, title, username, password, isFavorite, url }) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const [isFav, setIsFav] = useState(isFavorite);
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedUser, setCopiedUser] = useState(false);

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "?";

  const getDomain = (urlStr) => {
    if (!urlStr) return "";
    try {
      const urlObj = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
      return urlObj.hostname;
    } catch {
      return urlStr;
    }
  };

  const domain = getDomain(url);
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;

  const toggleFavorite = async () => {
    if (isUpdating || !id) return;
    setIsUpdating(true);
    const newStatus = !isFav;
    setIsFav(newStatus); // Optimistic UI update

    try {
      await fetch(`/api/passwords/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: newStatus })
      });
    } catch (error) {
      console.error("Failed to update favorite status", error);
      setIsFav(!newStatus); // Revert on failure
    } finally {
      setIsUpdating(false);
    }
  };

  const deletePassword = async () => {
    if (isDeleting || !id) return;
    if (!window.confirm("Are you sure you want to delete this vault?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/passwords/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        window.location.reload(); // Quickest way to refresh state
      }
    } catch (error) {
      console.error("Failed to delete password", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyUsername = (e) => {
    if (e) e.stopPropagation();
    if (!username) return;
    navigator.clipboard.writeText(username);
    setCopiedUser(true);
    setTimeout(() => setCopiedUser(false), 2000);
  };

  if (isDeleting) {
    return (
      <div className="flex flex-col p-5 bg-gradient-to-br from-[#1a263d] to-[#0f172a] rounded-2xl border border-white/10 min-w-[200px] h-full items-center justify-center opacity-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-5 bg-gradient-to-br from-[#1a263d] to-[#0f172a] rounded-2xl shadow-xl border border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden">
      {/* Glossy top highlight */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-2xl"></div>

      {/* Top right actions */}
      <div className="absolute top-3 right-3 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-gray-400 transition-all"
          title="Edit"
          onClick={() => router.push(`/edit/${id}`)}
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button 
          onClick={deletePassword}
          className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-all"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start justify-between z-10 pr-16">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {faviconUrl && !imgError ? (
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-200 p-2">
                <img 
                  src={faviconUrl} 
                  alt={title} 
                  className="w-full h-full object-contain" 
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20">
                {getInitials(title)}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight tracking-wide">{title}</span>
            <div 
              className="flex items-center gap-1.5 mt-0.5 text-gray-400 group/user cursor-pointer w-fit"
              onClick={copyUsername}
              title="Copy username"
            >
              <span className="text-sm transition-colors group-hover/user:text-blue-400">
                {username || "username"}
              </span>
              <span className="opacity-0 group-hover/user:opacity-100 transition-opacity">
                {copiedUser ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 hover:text-white" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6 z-10 bg-black/20 rounded-xl p-3 border border-white/5">
        <div className="text-gray-300 font-mono tracking-[0.3em] text-xl px-2">••••••••</div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFavorite}
            disabled={isUpdating}
            className="p-2 rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={`w-5 h-5 transition-all ${isFav ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" : "text-gray-500 hover:text-gray-400"}`} />
          </button>
          <button 
            onClick={copyPassword}
            className={`flex items-center justify-center p-2 rounded-lg transition-all ${copied ? "bg-green-500/20 text-green-400" : "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"}`}
            title="Copy password"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
