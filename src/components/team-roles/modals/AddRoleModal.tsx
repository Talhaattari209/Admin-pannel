import React from 'react';
import SwitchToggleTable from '../SwitchToggleTable';
import { BaseCard } from '@/components/PopCards';

interface AddRoleModalProps {
    onCancel: () => void;
    onAdd: () => void;
    initialData?: { role: string, description: string };
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ onCancel, onAdd, initialData }) => {
    const isEdit = !!initialData;

    // Icon: Reverted to 2.92vw
    const icon = (
        <div className="w-[2.92vw] h-[2.92vw] flex items-center justify-center">
            {isEdit ? (
                <img src="/assets/edit-role.svg" alt="Edit Role" className="w-full h-full object-contain" />
            ) : (
                <img src="/assets/user-plus_addRole.svg" alt="Add Role" className="w-full h-full object-contain" />
            )}
        </div>
    );

    const actions = (
        <>
            <button
                onClick={onCancel}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 filter drop-shadow(0px 0.63vw 2.08vw rgba(0, 0, 0, 0.05)) backdrop-blur-[6px]"
            >
                Cancel
            </button>
            <button
                onClick={onAdd}
                className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] h-[2.92vw] rounded-[2.71vw] font-medium not-italic text-[0.83vw] leading-[1.25vw] transition-all cursor-pointer flex-1 bg-[#5F00DB] text-white shadow-[0px_0.42vw_0.63vw_rgba(95,0,219,0.3)] hover:brightness-110 active:scale-95 transition-all"
            >
                {isEdit ? 'Update' : 'Add Role'}
            </button>
        </>
    );

    return (
        <BaseCard
            icon={icon}
            title={isEdit ? 'Edit Role' : 'Add New Role'}
            description={null} // No description
            actions={actions}
            width="33.33vw"
            height="37.56vw"
            glowColor="#5F00DB"
        >
            <div className="flex flex-col gap-[0.63vw] w-full flex-1 min-h-0">
                <div className="flex flex-col gap-[0.21vw] w-full">
                    <label className="text-white text-[0.63vw] font-bold not-italic font-['SF_Pro_Text'] uppercase tracking-wider ml-[0.21vw]">Title</label>
                    <input type="text" defaultValue={initialData?.role || 'Content Manager'} className="w-full h-[2.5vw] bg-transparent border-b border-white text-white text-[0.83vw] focus:outline-none font-['SF_Pro_Text'] not-italic px-[0.42vw]" />
                </div>

                <div className="flex flex-col gap-[0.21vw] w-full">
                    <label className="text-white text-[0.63vw] font-bold not-italic font-['SF_Pro_Text'] uppercase tracking-wider ml-[0.21vw]">Description</label>
                    <textarea placeholder="Type here..." defaultValue={initialData?.description} className="w-full bg-transparent border-b border-white text-white text-[0.83vw] focus:outline-none resize-none h-[3.15vw] font-['SF_Pro_Text'] not-italic placeholder:text-white/40 px-[0.42vw]" />
                </div>

                <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar">
                    <SwitchToggleTable />
                </div>
            </div>
        </BaseCard>
    );
};

export default AddRoleModal;
