"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Edit() {
  const router = useRouter();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    websiteName: "",
    username: "",
    password: "",
    url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const res = await fetch(`/api/passwords/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            websiteName: data.websiteName || "",
            username: data.username || "",
            password: data.password || "",
            url: data.url || "",
          });
        } else {
          setMessage("Failed to load vault details.");
        }
      } catch (error) {
        console.error("Error fetching password:", error);
        setMessage("Error loading vault.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchPassword();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.websiteName || !formData.username || !formData.password) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`/api/passwords/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Password updated successfully!");
        setTimeout(() => router.push("/home"), 1000);
      } else {
        const error = await res.json();
        setMessage(error.error || "Failed to update password");
      }
    } catch (error) {
      setMessage("An error occurred while updating.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full text-white items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full text-white items-center">
      <div className="text-center text-xl font-medium text-gray-400 mb-8">Edit Vault</div>
      
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
              type="text" 
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
              disabled={saving}
              className="flex-1 bg-[#00a8ff] hover:bg-[#0097e6] text-white font-medium py-2.5 rounded-full shadow-[0_0_15px_rgba(0,168,255,0.4)] transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button 
              type="button" 
              onClick={() => router.back()}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2.5 rounded-full transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
