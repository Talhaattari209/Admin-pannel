
import React, { useState, useRef } from 'react';
import PopCardWrapper from './PopCardWrapper';
import SwitchToggleTable from '../team-roles/SwitchToggleTable';
import { ResourcePermission } from '@/types/api';
import { resourcesToToggles } from '@/utils/permissions';

interface RolePopCardProps {
    onCancel: () => void;
    onSave: (data: { title: string; description: string; permissions: Record<string, Record<string, boolean>> }) => void;
    initialData?: {
        title?: string;
        description?: string;
        resources?: ResourcePermission[];
    };
    mode?: 'add' | 'edit';
    isLoading?: boolean;
}

const RolePopCard: React.FC<RolePopCardProps> = ({
    onCancel,
    onSave,
    initialData,
    mode = 'add',
    isLoading = false
}) => {
    const isEdit = mode === 'edit';
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    // Convert API resources to toggle format, or use empty defaults
    const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>(
        initialData?.resources ? resourcesToToggles(initialData.resources) : {}
    );

    const handleSave = () => {
        const title = titleRef.current?.value || '';
        const description = descriptionRef.current?.value || '';

        if (!title.trim()) {
            alert('Please enter a role title');
            return;
        }

        onSave({
            title,
            description,
            permissions
        });
    };

    return (
        <PopCardWrapper onClose={onCancel}>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[33.33vw] h-[53.64vw] max-h-[85vh]">
                {/* Icon Section */}
                <div className="flex flex-col justify-center items-center p-[0.83vw] gap-[0.83vw] isolation-auto w-[6.25vw] h-[6.25vw] rounded-[1.25vw] flex-none order-0 flex-grow-0 relative">
                    {/* Rotating Border Animation & Glow */}
                    <div className="absolute inset-0 z-[1] rounded-full">
                        {/* Glow Layer */}
                        <div
                            className="absolute -inset-[0.5vw] rounded-full animate-[spin_3s_linear_infinite]"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)',
                                filter: 'blur(0.25vw)',
                                WebkitMask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)',
                                mask: 'radial-gradient(closest-side, transparent 75%, black 80%, black 80%, transparent 85%)'
                            }}
                        />
                        {/* Sharp Border Layer */}
                        <div
                            className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255, 255, 255, 1) 50%, transparent 100%)',
                                WebkitMask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))',
                                mask: 'radial-gradient(closest-side, transparent calc(100% - 0.1vw), black calc(100% - 0.1vw))'
                            }}
                        />
                    </div>
                    {/* Icon BG */}
                    <div className="box-border absolute w-[6.25vw] h-[6.25vw] left-[calc(50%-3.125vw)] top-[calc(50%-3.125vw)] backdrop-blur-[0.31vw] rounded-[6.25vw] bg-white/5 border border-white/10 z-0"></div>
                    {/* Icon Content */}
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
                </div>

                {/* Form Content */}
                <div className="flex flex-col gap-[1.25vw] w-full flex-grow min-h-0">
                    <div className="flex flex-col gap-[0.41vw] w-full">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Title</label>
                        <input
                            ref={titleRef}
                            type="text"
                            defaultValue={initialData?.title || ''}
                            placeholder="Content Manager"
                            className="w-full h-[2.5vw] bg-transparent border-b border-white text-white text-[0.83vw] focus:outline-none not-italic px-[0.42vw] placeholder:text-white/30"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.41vw] w-full">
                        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-wider ml-[0.21vw]">Description</label>
                        <textarea
                            ref={descriptionRef}
                            placeholder="Type here..."
                            defaultValue={initialData?.description || ''}
                            className="w-full bg-transparent border-b border-white text-white text-[0.83vw] focus:outline-none resize-none h-[3.15vw] not-italic placeholder:text-white/40 px-[0.42vw]"
                        />
                    </div>

                    <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar">
                        <SwitchToggleTable
                            initialPermissions={permissions}
                            onChange={setPermissions}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto shrink-0">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 h-[2.92vw] border border-white backdrop-blur-[6px] bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? 'Saving...' : (isEdit ? 'Update' : 'Add Role')}
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default RolePopCard;
