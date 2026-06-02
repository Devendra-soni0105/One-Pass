import Navbar from "../../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="relative flex flex-col w-full min-h-screen bg-gradient-to-br from-[#1a0532] via-[#081423] to-[#002233]">
      <Navbar />
      <div className="flex flex-col flex-1 w-full p-4 md:p-6">
        <div className="w-full flex flex-col flex-1 shadow-[0_0_15px_3px_rgba(0,180,255,0.15)] rounded-2xl border border-white/10 bg-[#0a233480] p-6 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
}
