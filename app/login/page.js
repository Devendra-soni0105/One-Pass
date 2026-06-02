"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/home" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a0532] via-[#081423] to-[#002233] text-white items-center justify-center p-4">
      <div className="absolute top-6 left-6 md:top-10 md:left-12">
        <Link href="/" className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
          OnePass
        </Link>
      </div>
      
      <div className="w-full max-w-md p-8 md:p-10 rounded-3xl border border-blue-400/20 bg-[#0a1930]/80 shadow-[0_0_40px_10px_rgba(0,180,255,0.1)] backdrop-blur-xl relative overflow-hidden">
        {/* Glow effect behind the form */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
            <Lock size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-center">Welcome back</h2>
          <p className="text-gray-400 text-center">Sign in to access your vaults</p>
        </div>

        <form className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="bg-[#0f2342] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="bg-[#0f2342] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
            />
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              router.push("/home");
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all mt-2"
          >
            Sign In
          </button>
          
          <div className="relative flex items-center justify-center mt-4 mb-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative px-4 bg-[#0a1930] text-sm text-gray-500">Or continue with</div>
          </div>
          
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 rounded-xl transition-all"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Sign in with Google
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign up</a>
        </p>
      </div>
    </div>
  );
}
