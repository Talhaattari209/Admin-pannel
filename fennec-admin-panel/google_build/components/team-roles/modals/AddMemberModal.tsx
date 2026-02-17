
import React from 'react';

interface AddMemberModalProps {
  onCancel: () => void;
  onInvite: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ onCancel, onInvite }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center p-8 gap-8 w-[480px] max-h-[90vh] bg-[#16003F] border border-[#666666]/50 rounded-[32px] shadow-2xl overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-300">
        {/* Icon */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-[#5F00DB] opacity-50 blur-2xl rounded-full"></div>
          <div className="relative w-full h-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
            <svg viewBox="0 0 56 56" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v2M16 23c-4.418 0-8 3.582-8 8v2h16v-2c0-4.418-3.582-8-8-8zM36 23c4.418 0 8 3.582 8 8v2H28v-2c0-4.418 3.582-8 8-8zM28 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0zM41 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/></svg>
          </div>
        </div>

        <h2 className="text-white text-[32px] font-medium tracking-tight text-center font-inter">Add Team Member</h2>

        {/* Form */}
        <div className="flex flex-col gap-6 w-full">
          {[
            { label: 'Name', placeholder: 'John Doe', type: 'text' },
            { label: 'Email', placeholder: 'john@fennec.com', type: 'email' }
          ].map(field => (
            <div key={field.label} className="flex flex-col gap-1 border-b border-white py-2">
              <label className="text-white text-[12px] font-bold uppercase tracking-wider opacity-100 font-inter">{field.label}</label>
              <input type={field.type} placeholder={field.placeholder} className="bg-transparent border-none text-white text-[16px] focus:outline-none placeholder:text-white/40 font-inter" />
            </div>
          ))}

          <div className="flex flex-col gap-1 border-b border-white py-2 relative group">
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

          {[
            { label: 'Password', placeholder: '················' },
            { label: 'Confirm Password', placeholder: '················' }
          ].map(field => (
            <div key={field.label} className="flex flex-col gap-1 border-b border-white py-2 relative">
              <label className="text-white text-[12px] font-bold uppercase tracking-wider font-inter">{field.label}</label>
              <div className="flex items-center justify-between">
                <input type="password" placeholder={field.placeholder} className="bg-transparent border-none text-white text-[16px] focus:outline-none placeholder:text-white/40 font-inter flex-grow" />
                <button className="text-white/40 hover:text-white transition-colors"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onInvite}
          className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all font-inter"
        >
          Invite Team Member
        </button>
      </div>
    </div>
  );
};

export default AddMemberModal;
