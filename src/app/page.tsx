import SideNavigation from "@/components/SideNavigation";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen bg-[#111111] text-white font-sans">
      <SideNavigation />
      <main className="ml-[16.67vw] flex-1 p-[1.67vw]">
        <div className="flex flex-col gap-[1.25vw]">
          <h1 className="text-[1.67vw] font-bold font-['Michroma']">Users Management</h1>
          <div className="p-[1.25vw] bg-[#222222] rounded-2xl border border-[rgba(102,102,102,0.5)] h-[26.04vw]">
            <p className="text-[#AAAAAA]">Content goes here...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
