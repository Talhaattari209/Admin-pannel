
import React, { useRef, useState } from 'react';
import PopCardWrapper from './PopCardWrapper';
import { Role } from '@/types/api';

interface MemberPopCardProps {
    onCancel: () => void;
    onInvite: (data: { name: string; email: string; role: string; password: string }) => void;
    roles: Role[];
    isLoading?: boolean;
}

const MemberPopCard: React.FC<MemberPopCardProps> = ({ onCancel, onInvite, roles, isLoading = false }) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleInvite = () => {
        const name = nameRef.current?.value.trim() || '';
        const email = emailRef.current?.value.trim() || '';
        const password = passwordRef.current?.value || '';
        const confirm = confirmRef.current?.value || '';

        // Validation
        if (!name) {
            setError('Please enter a name');
            return;
        }
        if (!email) {
            setError('Please enter an email');
            return;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }
        if (!selectedRole) {
            setError('Please select a role');
            return;
        }
        if (!password) {
            setError('Please enter a password');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        onInvite({ name, email, role: selectedRole, password });
    };

    return (
        <PopCardWrapper>
            <div className="relative flex flex-col items-center p-[1.66vw] gap-[1.66vw] bg-[#16003F] border border-[#666666]/50 backdrop-blur-[12px] rounded-[1.66vw] box-border shadow-2xl overflow-hidden w-[25vw] min-w-[320px]">
                {/* Icon Section */}
                <div className="relative flex flex-col justify-center items-center w-[6.25vw] h-[6.25vw] shrink-0 isolation-auto">
                    <div
                        className="absolute -inset-[3.125vw] opacity-50 blur-2xl pointer-events-none rounded-full"
                        style={{ background: `linear-gradient(180deg, #5F00DB 30%, transparent 70%)` }}
                    ></div>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] rounded-full border border-white/10 z-0"></div>
                    <div className="relative z-10 flex items-center justify-center">
                        <svg viewBox="0 0 56 56" className="w-[2.92vw] h-[2.92vw] text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v2M16 23c-4.418 0-8 3.582-8 8v2h16v-2c0-4.418-3.582-8-8-8zM36 23c4.418 0 8 3.582 8 8v2H28v-2c0-4.418 3. 582-8 8-8zM28 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0zM41 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" /></svg>
                    </div>
                </div>

                {/* Header Section */}
                <div className="flex flex-col gap-[0.83vw] text-center self-stretch shrink-0">
                    <h2 className="text-[1.66vw] font-medium not-italic leading-[1.98vw] tracking-[-0.02em] text-white font-inter">
                        Add Team Member
                    </h2>
                    <p className="text-[0.94vw] font-normal not-italic leading-[1.67vw] text-[#DDDDDD] font-inter">
                        Invite a new member to the admin panel.
                    </p>
                </div>

                {/* Form Content */}
                <div className="flex flex-col gap-[0.63vw] w-full flex-1 min-h-0">
                    {/* Name */}
                    <div className="flex flex-col gap-[0.21vw] w-full">
                        <label className="text-white text-[0.63vw] font-bold not-italic font-inter uppercase tracking-wider ml-[0.21vw]">Name</label>
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="John Doe"
                            className="w-full h-[2.5vw] px-[0.83vw] bg-transparent border-b border-white text-white text-[0.83vw] font-normal not-italic font-inter focus:outline-none placeholder:text-white/30"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-[0.21vw] w-full">
                        <label className="text-white text-[0.63vw] font-bold not-italic font-inter uppercase tracking-wider ml-[0.21vw]">Email</label>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="john@fennec.com"
                            className="w-full h-[2.5vw] px-[0.83vw] bg-transparent border-b border-white text-white text-[0.83vw] font-normal not-italic font-inter focus:outline-none placeholder:text-white/30"
                        />
                    </div>

                    {/* Role Select */}
                    <div className="flex flex-col gap-[0.21vw] w-full relative group">
                        <label className="text-white text-[0.63vw] font-bold not-italic font-inter uppercase tracking-wider ml-[0.21vw]">Role</label>
                        <div className="relative">
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full h-[2.5vw] bg-transparent border-b border-white text-white text-[0.83vw] appearance-none focus:outline-none cursor-pointer not-italic font-inter pl-[0.83vw]"
                            >
                                <option value="" className="bg-[#222222] text-white/40">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id} className="bg-[#222222]">
                                        {role.title}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-0 bottom-[0.83vw] pointer-events-none text-white/40 group-hover:text-white transition-colors">
                                <svg viewBox="0 0 24 24" className="w-[1.04vw] h-[1.04vw]" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-[0.21vw] w-full relative">
                        <label className="text-white text-[0.63vw] font-bold not-italic font-inter uppercase tracking-wider ml-[0.21vw]">Password</label>
                        <div className="relative flex items-center justify-between border-b border-white h-[2.5vw]">
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="················"
                                className="w-full h-full px-[0.83vw] bg-transparent border-none text-white text-[0.83vw] focus:outline-none placeholder:text-white/30 not-italic font-inter flex-grow"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-[0.21vw] w-full relative">
                        <label className="text-white text-[0.63vw] font-bold not-italic font-inter uppercase tracking-wider ml-[0.21vw]">Confirm Password</label>
                        <div className="relative flex items-center justify-between border-b border-white h-[2.5vw]">
                            <input
                                ref={confirmRef}
                                type="password"
                                placeholder="················"
                                className="w-full h-full px-[0.83vw] bg-transparent border-none text-white text-[0.83vw] focus:outline-none placeholder:text-white/30 not-italic font-inter flex-grow"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-[#FF4E4E] text-[0.73vw]">
                            {error}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row items-center justify-center gap-[1.25vw] self-stretch mt-auto shrink-0">
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 h-[2.92vw] border border-white backdrop-blur-[6px] bg-transparent rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleInvite}
                        disabled={isLoading}
                        className="flex-1 h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] text-white font-medium not-italic text-[0.83vw] shadow-[0px_-0.42vw_0.63vw_rgba(95,0,219,0.25),0px_0.42vw_0.63vw_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Inviting...' : 'Invite Team Member'}
                    </button>
                </div>
            </div>
        </PopCardWrapper>
    );
};

export default MemberPopCard;
