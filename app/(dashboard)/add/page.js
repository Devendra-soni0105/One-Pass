"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Add() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    websiteName: "",
    username: "",
    password: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.websiteName || !formData.username || !formData.password) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ websiteName: "", username: "", password: "", url: "" });
        setMessage("Password saved successfully!");
        router.push("/home");
      } else {
        const error = await res.json();
        setMessage(error.error || "Failed to save password");
      }
    } catch (error) {
      setMessage("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ websiteName: "", username: "", password: "", url: "" });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full text-white items-center">
      <div className="text-center text-xl font-medium text-gray-400 mb-8">Add Vault</div>
      
      <div className="w-full max-w-md p-8 rounded-2xl border border-blue-400/30 bg-[#061427]/50 shadow-[0_0_25px_5px_rgba(0,180,255,0.15)] backdrop-blur-md">
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center ${message.includes("success") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
            {message}
          </div>
        )}
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">Website/App Name *</label>
            <input 
              type="text" 
              name="websiteName"
              value={formData.websiteName}
              onChange={handleChange}
              className="bg-transparent border border-blue-400/50 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-400 focus:shadow-[0_0_10px_2px_rgba(0,180,255,0.3)] transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">Username/Email *</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-transparent border border-blue-400/50 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-400 focus:shadow-[0_0_10px_2px_rgba(0,180,255,0.3)] transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">Password *</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent border border-blue-400/50 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-400 focus:shadow-[0_0_10px_2px_rgba(0,180,255,0.3)] transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-medium">URL</label>
            <input 
              type="text" 
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="bg-transparent border border-blue-400/50 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-400 focus:shadow-[0_0_10px_2px_rgba(0,180,255,0.3)] transition-all"
            />
          </div>
          
          <div className="flex gap-4 mt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-[#00a8ff] hover:bg-[#0097e6] text-white font-medium py-2.5 rounded-full shadow-[0_0_15px_rgba(0,168,255,0.4)] transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className="flex-1 bg-[#e84118] hover:bg-[#c23616] text-white font-medium py-2.5 rounded-full shadow-[0_0_15px_rgba(232,65,24,0.4)] transition-all"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
