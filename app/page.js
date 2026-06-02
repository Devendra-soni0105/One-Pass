import Link from "next/link";
import { Shield, Key, Lock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-[#0f041f] via-[#081423] to-[#001724] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:px-12 backdrop-blur-md border-b border-white/10 z-10 sticky top-0 bg-[#081423]/60">
        <div className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          OnePass
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2 rounded-full font-medium text-blue-300 hover:text-white hover:bg-white/10 transition-all">
            Log in
          </Link>
          <Link href="/login" className="px-6 py-2 rounded-full font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 rounded-full"></div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 relative z-10 leading-tight max-w-4xl">
            The only password manager you'll ever need.
          </h1>
        </div>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl">
          Securely store, manage, and autofill your passwords across all your devices. Never forget a password again with OnePass.
        </p>
        
        <Link href="/login" className="px-8 py-4 rounded-full text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all transform hover:scale-105">
          Start for free
        </Link>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-5xl mx-auto w-full px-4">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Bank-level Security</h3>
            <p className="text-gray-400">Your data is encrypted locally with AES-256 before it ever leaves your device.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
              <Key size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">One Master Key</h3>
            <p className="text-gray-400">Remember just one password. OnePass takes care of all the rest automatically.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
              <Lock size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Zero-Knowledge</h3>
            <p className="text-gray-400">We can't see your data, even if we wanted to. Your privacy is mathematically guaranteed.</p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 bg-[#050b14]">
        <p>© 2026 OnePass Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
