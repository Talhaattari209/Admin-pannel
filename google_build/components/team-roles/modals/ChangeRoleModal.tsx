
import React from 'react';

interface ChangeRoleModalProps {
  onCancel: () => void;
  onUpdate: () => void;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({ onCancel, onUpdate }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center p-8 gap-8 w-[480px] bg-[#16003F] border border-[#666666]/50 rounded-[32px] shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Icon */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-[#5F00DB] opacity-50 blur-2xl rounded-full"></div>
          <div className="relative w-full h-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
            <svg viewBox="0 0 56 56" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="28" cy="18" r="5"/><path d="M18 32c0-4.418 3.582-8 8-8h4c4.418 0 8 3.582 8 8v2H18v-2z"/><polyline points="38 18 42 22 48 16" /></svg>
          </div>
        </div>

        <h2 className="text-white text-[32px] font-medium tracking-tight text-center font-inter">Change Role</h2>

        <div className="flex flex-col gap-1 border-b border-white py-2 relative group w-full">
          <label className="text-white text-[12px] font-bold uppercase tracking-wider font-inter">Role</label>
          <select className="w-full bg-transparent text-white text-[18px] appearance-none focus:outline-none cursor-pointer font-inter">
            <option className="bg-[#222222]">Moderator</option>
            <option className="bg-[#222222]">Admin</option>
            <option className="bg-[#222222]">Viewer</option>
          </select>
          <div className="absolute right-0 bottom-2 pointer-events-none text-white/40 group-hover:text-white transition-colors">
             <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>

        <button 
          onClick={onUpdate}
          className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all font-inter"
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default ChangeRoleModal;
