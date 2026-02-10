
import React from 'react';
import PopCardWrapper from './PopCardWrapper';
import SwitchToggleTable from '../team-roles/SwitchToggleTable';

interface RolePopCardProps {
    onCancel: () => void;
    onSave: () => void;
    initialRole?: string;
    initialDescription?: string;
    mode?: 'add' | 'edit';
}

const RolePopCard: React.FC<RolePopCardProps> = ({ onCancel, onSave, initialRole = '', initialDescription = '', mode = 'add' }) => {
    const isEdit = mode === 'edit';

    return (
        <PopCardWrapper>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[33.33vw] h-[53.64vw] max-h-[85vh]">
                {/* Icon Section */}
                <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-auto">
                    <div
                        className="absolute -inset-[3.125vw] opacity-50 blur-2xl pointer-events-none rounded-full"
                        style={{ background: `linear-gradient(180deg, #5F00DB 30%, transparent 70%)` }}
                    ></div>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
                    <div className="relative z-10 flex items-center justify-center">
                        <div className="w-[2.92vw] h-[2.92vw] flex items-center justify-center">
                            {isEdit ? (
                                <img src="/assets/edit-role.svg" alt="Edit Role" className="w-full h-full object-contain" />
                            ) : (
                                <img src="/assets/user-plus_addRole.svg" alt="Add Role" className="w-full h-full object-contain" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Header Section */}
                <div className="flex flex-col gap-[0.83vw] text-center self-stretch shrink-0">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter">
                        {isEdit ? 'Edit Role' : 'Add New Role'}
                    </h2>
                    {/* No Description matching existing AddRoleModal */}
                </div>

                {/* Form Content */}
                <div className="flex flex-col gap-[1.25vw] w-full flex-grow min-h-0">
                    <div className="flex flex-col gap-[0.41vw] w-full">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Title</label>
                        <input type="text" defaultValue={initialRole || 'Content Manager'} className="w-full h-[2.5vw] bg-transparent border-b border-white text-white text-[0.83vw] focus:outline-none not-italic px-[0.42vw]" />
                    </div>

                    <div className="flex flex-col gap-[0.41vw] w-full">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Description</label>
                        <textarea placeholder="Type here..." defaultValue={initialDescription} className="w-full bg-transparent border-b border-white text-white text-[0.83vw] focus:outline-none resize-none h-[3.15vw] not-italic placeholder:text-white/40 px-[0.42vw]" />
                    </div>

                    <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar">
                        <SwitchToggleTable />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto shrink-0">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-[2.92vw] border border-white backdrop-blur-[6px] bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] hover:bg-white/10 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="flex-1 h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all"
                    >
                        {isEdit ? 'Update' : 'Add Role'}
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default RolePopCard;
