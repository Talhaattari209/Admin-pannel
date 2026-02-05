import React from 'react';

interface RemoveConfirmModalProps {
    type: 'member' | 'role';
    onCancel: () => void;
    onConfirm: () => void;
}

const RemoveConfirmModal: React.FC<RemoveConfirmModalProps> = ({ type, onCancel, onConfirm }) => {
    const isMember = type === 'member';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative flex flex-col items-center p-8 gap-8 w-[480px] bg-[#16003F] border border-[#666666]/50 rounded-[32px] shadow-2xl animate-in zoom-in-95 duration-300 backdrop-blur-[12px]">
                {/* Icon */}
                <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-[#FF4E4E] opacity-20 blur-2xl rounded-full"></div>
                    <div className="relative w-full h-full rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
                        <svg viewBox="0 0 56 56" className="w-[56px] h-[56px] text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M28 12L10 44h36L28 12z" /><line x1="28" y1="24" x2="28" y2="34" /><circle cx="28" cy="40" r="1" fill="currentColor" /></svg>
                    </div>
                </div>

                <div className="flex flex-col gap-4 text-center">
                    <h2 className="text-white text-[32px] font-medium not-italic tracking-tight font-['SF_Pro_Text']">{isMember ? 'Remove Team Member?' : 'Delete Role?'}</h2>
                    <p className="text-white/80 text-[16px] leading-relaxed font-['SF_Pro_Text'] not-italic px-4">
                        {isMember
                            ? 'Are you sure you want to deactivate this team member from accessing the admin panel?'
                            : 'Are you sure you want to delete this role? Team members with this role will not be able to access the admin panel until they are assigned to a new role.'
                        }
                    </p>
                </div>

                <div className="flex flex-row gap-6 w-full">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-[56px] border border-white rounded-[52px] text-white font-medium not-italic hover:bg-white/10 transition-all font-['SF_Pro_Text']"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 h-[56px] bg-[#FF4E4E] rounded-[52px] text-white font-medium not-italic shadow-[0px_4px_12px_rgba(255,78,78,0.3)] hover:brightness-110 active:scale-95 transition-all font-['SF_Pro_Text']"
                    >
                        {isMember ? 'Remove' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoveConfirmModal;
