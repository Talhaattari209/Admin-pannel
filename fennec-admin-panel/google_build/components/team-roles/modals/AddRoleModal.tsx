
import React from 'react';
import SwitchToggleTable from '../SwitchToggleTable';

interface AddRoleModalProps {
  onCancel: () => void;
  onAdd: () => void;
  initialData?: { role: string, description: string };
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ onCancel, onAdd, initialData }) => {
  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center p-8 gap-8 w-[640px] max-h-[90vh] bg-[#16003F] border border-[#666666]/50 rounded-[32px] shadow-2xl overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-300">
        {/* Icon */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-[#5F00DB] opacity-50 blur-2xl rounded-full"></div>
          <div className="relative w-full h-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
            {isEdit ? (
              <svg viewBox="0 0 56 56" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            ) : (
              <svg viewBox="0 0 56 56" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M28 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0zM16 21c-4.418 0-8 3.582-8 8v2h16v-2c0-4.418-3.582-8-8-8z"/><line x1="42" y1="18" x2="42" y2="30"/><line x1="36" y1="24" x2="48" y2="24"/></svg>
            )}
          </div>
        </div>

        <h2 className="text-white text-[32px] font-medium tracking-tight text-center font-inter">{isEdit ? 'Edit Role' : 'Add New Role'}</h2>

        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-1 border-b border-white py-2">
            <label className="text-white text-[12px] font-bold uppercase tracking-wider font-inter">Title</label>
            <input type="text" defaultValue={initialData?.role || 'Content Manager'} className="bg-transparent border-none text-white text-[16px] focus:outline-none font-inter" />
          </div>

          <div className="flex flex-col gap-1 border-b border-white py-2">
            <label className="text-white text-[12px] font-bold uppercase tracking-wider font-inter">Description</label>
            <textarea placeholder="Type here..." defaultValue={initialData?.description} className="bg-transparent border-none text-white text-[16px] focus:outline-none resize-none h-24 font-inter placeholder:text-white/40" />
          </div>

          <SwitchToggleTable />
        </div>

        <button 
          onClick={onAdd}
          className="w-full h-[56px] bg-[#5F00DB] rounded-[52px] text-white font-medium shadow-[0px_4px_12px_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all font-inter shrink-0"
        >
          {isEdit ? 'Update' : 'Add Role'}
        </button>
      </div>
    </div>
  );
};

export default AddRoleModal;
