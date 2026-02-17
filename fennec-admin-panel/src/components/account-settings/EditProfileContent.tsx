import React, { useState } from 'react';

interface EditProfileContentProps {
    onSuccess: () => void;
}

const EditProfileContent: React.FC<EditProfileContentProps> = ({ onSuccess }) => {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('johndoe@email.com');

    const handleSave = () => {
        // Simulate API call
        setTimeout(() => {
            onSuccess();
        }, 500);
    };

    const handleDiscard = () => {
        setFirstName('John');
        setLastName('Doe');
        setEmail('johndoe@email.com');
    };

    return (
        <div className="flex flex-col items-start p-[1.67vw] gap-[1.67vw] w-[39.17vw] min-h-[19.69vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw] box-border ">

            {/* Heading */}
            <h3 className="w-[35.83vw] h-[1.77vw] font-bold not-italic text-[1.46vw] leading-[1.77vw] flex items-center tracking-[-0.04em] text-white">
                Edit Profile
            </h3>

            {/* Inputs Grid */}
            <div className="flex flex-col gap-[1.67vw] w-full">

                {/* Row 1: First Name & Last Name */}
                <div className="flex flex-row items-start gap-[1.67vw] w-full">
                    {/* First Name */}
                    <div className="flex flex-col items-start p-0 w-[17.08vw]">
                        <div className="flex flex-row items-start gap-[0.21vw] w-full h-[0.83vw]">
                            <span className="font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">First Name</span>
                        </div>
                        <div className="flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-full h-[2.5vw] border-b border-white">
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full h-[1.25vw] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white bg-transparent border-none outline-none"
                            />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col items-start p-0 w-[17.08vw]">
                        <div className="flex flex-row items-start gap-[0.21vw] w-full h-[0.83vw]">
                            <span className="font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">Last Name</span>
                        </div>
                        <div className="flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-full h-[2.5vw] border-b border-white">
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full h-[1.25vw] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white bg-transparent border-none outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 2: Email */}
                <div className="flex flex-col items-start p-0 w-[35.83vw]">
                    <div className="flex flex-row items-start gap-[0.21vw] w-full h-[0.83vw]">
                        <span className="font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">Email</span>
                    </div>
                    <div className="flex flex-row items-center py-[0.42vw] gap-[0.83vw] w-full h-[2.5vw] border-b border-white">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-[1.25vw] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white bg-transparent border-none outline-none"
                        />
                    </div>
                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-row items-center p-0 gap-[0.83vw] w-full h-[2.92vw] mt-[0.83vw]">
                {/* Save Changes */}
                <button
                    onClick={handleSave}
                    className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-[8.23vw] h-[2.92vw] bg-[#5F00DB] rounded-[2.71vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#4a00aa] transition-colors"
                >
                    <span className="font-medium not-italic text-[0.83vw] leading-[1.25vw] text-center text-white">Save Changes</span>
                </button>

                {/* Discard Changes */}
                <button
                    onClick={handleDiscard}
                    className="flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.63vw] w-[9.375vw] h-[2.92vw] border border-white backdrop-blur-[6px] drop-shadow-[0px_12px_40px_rgba(0,0,0,0.05)] rounded-[2.71vw] hover:bg-white/10 transition-colors"
                >
                    <span className="font-medium not-italic text-[0.83vw] leading-[1.25vw] text-center text-white">Discard Changes</span>
                </button>
            </div>

        </div>
    );
};

export default EditProfileContent;
