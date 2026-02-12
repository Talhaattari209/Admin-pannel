
import React, { useState } from 'react';

interface EditProfileContentProps {
  onSave: () => void;
  onDiscard: () => void;
}

const EditProfileContent: React.FC<EditProfileContentProps> = ({ onSave, onDiscard }) => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com'
  });

  return (
    <div className="flex flex-col items-start gap-8 w-[688px] h-full">
      {/* Heading */}
      <h3 className="text-white text-[28px] font-bold leading-[120%] tracking-[-0.04em] font-['SF_Pro_Text']">
        Edit Profile
      </h3>

      <div className="flex flex-col gap-8 w-full">
        {/* Row 1: First and Last Name */}
        <div className="flex flex-row items-start gap-8 w-full">
          <div className="flex flex-col items-start gap-0 flex-grow w-[328px]">
            <label className="text-white text-[12px] font-bold uppercase tracking-widest leading-[16px] font-['SF_Pro_Text'] mb-1">First Name</label>
            <div className="w-full border-b border-white py-2">
              <input 
                type="text" 
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                className="w-full bg-transparent border-none text-white text-[16px] leading-[24px] font-['SF_Pro_Text'] focus:outline-none placeholder:text-white/30"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-0 flex-grow w-[328px]">
            <label className="text-white text-[12px] font-bold uppercase tracking-widest leading-[16px] font-['SF_Pro_Text'] mb-1">Last Name</label>
            <div className="w-full border-b border-white py-2">
              <input 
                type="text" 
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                className="w-full bg-transparent border-none text-white text-[16px] leading-[24px] font-['SF_Pro_Text'] focus:outline-none placeholder:text-white/30"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Email */}
        <div className="flex flex-col items-start gap-0 w-full">
          <label className="text-white text-[12px] font-bold uppercase tracking-widest leading-[16px] font-['SF_Pro_Text'] mb-1">Email</label>
          <div className="w-full border-b border-white py-2">
            <input 
              type="email" 
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full bg-transparent border-none text-white text-[16px] leading-[24px] font-['SF_Pro_Text'] focus:outline-none placeholder:text-white/30"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-row items-center gap-4 mt-auto">
        <button 
          onClick={onSave}
          className="flex items-center justify-center px-6 py-4 w-[158px] h-[56px] bg-[#5F00DB] rounded-[52px] text-white text-[16px] font-medium leading-[24px] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:brightness-110 active:scale-95 transition-all font-['SF_Pro_Text']"
        >
          Save Changes
        </button>
        <button 
          onClick={onDiscard}
          className="flex items-center justify-center px-6 py-4 w-[180px] h-[56px] border border-white rounded-[52px] text-white text-[16px] font-medium leading-[24px] backdrop-blur-[6px] hover:bg-white/10 active:scale-95 transition-all font-['SF_Pro_Text']"
        >
          Discard Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileContent;
