"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Star, PlusCircle, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center text-white px-4 md:px-13 py-4 md:py-5 gap-y-4 md:gap-y-0 backdrop-blur-3xl z-30 shadow-[0_0_20px_4px_rgba(0,180,255,0.35)] border border-white/20 bg-[#0a334459] w-full shrink-0">
      <Link href="/home" className="text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        OnePass
      </Link>
      <div className="w-full md:w-auto flex justify-center">
        <ul className="flex flex-row gap-x-2 sm:gap-x-5 w-full justify-between sm:justify-center px-2 sm:px-0">
          <li className="flex justify-center items-center">
            <Link
              href="/home"
              className={
                pathname === "/home"
                  ? "flex items-center justify-center gap-2 text-white bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] rounded-xl px-5 py-2.5 font-medium transition-all"
                  : "flex items-center justify-center gap-2 text-gray-400 bg-transparent hover:bg-white/10 hover:text-white rounded-xl px-5 py-2.5 font-medium transition-all"
              }
            >
              <Home className="w-5 h-5" />
              <div className="hidden sm:block text-sm md:text-base">Home</div>
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              href="/favorites"
              className={
                pathname === "/favorites"
                  ? "flex items-center justify-center gap-2 text-white bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] rounded-xl px-5 py-2.5 font-medium transition-all"
                  : "flex items-center justify-center gap-2 text-gray-400 bg-transparent hover:bg-white/10 hover:text-white rounded-xl px-5 py-2.5 font-medium transition-all"
              }
            >
              <Star className="w-5 h-5" />
              <div className="hidden sm:block text-sm md:text-base">Favorites</div>
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link
              href="/add"
              className={
                pathname === "/add"
                  ? "flex items-center justify-center gap-2 text-white bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] rounded-xl px-5 py-2.5 font-medium transition-all"
                  : "flex items-center justify-center gap-2 text-gray-400 bg-transparent hover:bg-white/10 hover:text-white rounded-xl px-5 py-2.5 font-medium transition-all"
              }
            >
              <PlusCircle className="w-5 h-5" />
              <div className="hidden sm:block text-sm md:text-base">Add</div>
            </Link>
          </li>
          {session ? (
            <li className="flex justify-center items-center">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center justify-center gap-2 text-gray-400 bg-transparent hover:bg-red-500/20 hover:text-red-400 rounded-xl px-5 py-2.5 font-medium transition-all"
              >
                <LogOut className="w-5 h-5" />
                <div className="hidden sm:block text-sm md:text-base">Logout</div>
              </button>
            </li>
          ) : (
            <li className="flex justify-center items-center">
              <Link
                href="/login"
                className={
                  pathname === "/login"
                    ? "flex items-center justify-center gap-2 text-white bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] rounded-xl px-5 py-2.5 font-medium transition-all"
                    : "flex items-center justify-center gap-2 text-gray-400 bg-transparent hover:bg-white/10 hover:text-white rounded-xl px-5 py-2.5 font-medium transition-all"
                }
              >
                <LogOut className="w-5 h-5" />
                <div className="hidden sm:block text-sm md:text-base">Login</div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
