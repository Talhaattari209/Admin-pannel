import React, { useState } from 'react';
import ProfileMediaContent from './ProfileMediaContent';
import ProfilePromptsContent from './ProfilePromptsContent';
import ProfileGroupsContent from './ProfileGroupsContent';
import ProfileMatchesContent from './ProfileMatchesContent';
import ProfilePokesContent from './ProfilePokesContent';
import ProfileSubscriptionContent from './ProfileSubscriptionContent';
import TabGroup from '../shared/TabGroup';
import ProfileInfoSidebar from './ProfileInfoSidebar';
import Button from '../shared/Button';
import ExportModal from '../shared/ExportModal';

type ProfileTab = 'Overview' | 'Media' | 'Prompts' | 'Groups' | 'Matches' | 'Pokes Activity' | 'Subscription & Payments';

interface UserProfileViewProps {
  userId: string;
  onBack: () => void;
  onRemoveMedia?: (mediaId: string) => void;
  onRemovePrompt?: (promptId: string) => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ userId, onBack, onRemoveMedia, onRemovePrompt }) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('Overview');
  const [showExport, setShowExport] = useState(false);

  const userData = {
    name: "John Doe",
    age: 23,
    avatar: "https://i.pravatar.cc/150?u=john",
    email: "johndoe@email.com",
    phone: "+1 (234) 567 8900",
    dob: "Apr 16, 2003",
    gender: "Male",
    orientation: "Straight",
    pronouns: "He/Him",
    job: "Software Engineer",
    school: "Stanford University",
    bio: "Code, climb, repeat. Always up for a challenge — unless it’s karaoke.",
  };

  const profileStats = [
    { label: 'Membership', value: 'Premium', isBadge: true },
    { label: 'Groups', value: '3' },
    { label: 'Matches', value: '5' },
    { label: 'Pokes Sent', value: '15' },
    { label: 'Reports', value: '0' },
    { label: 'Last Active', value: 'Nov 10, 2025 • 8:42 PM' },
    { label: 'Joined', value: 'Nov 01, 2025 • 8:42 PM' }
  ];

  const profileTabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Media', label: 'Media' },
    { id: 'Prompts', label: 'Prompts' },
    { id: 'Groups', label: 'Groups' },
    { id: 'Matches', label: 'Matches' },
    { id: 'Pokes Activity', label: 'Pokes Activity' },
    { id: 'Subscription & Payments', label: 'Subscription & Payments' },
  ];

  return (
    <div className="flex flex-col w-full max-w-[1520px] mx-auto p-[2vw] animate-in fade-in duration-500 overflow-y-auto no-scrollbar h-screen relative">
      
      {showExport && <ExportModal onCancel={() => setShowExport(false)} onDownload={() => setShowExport(false)} />}

      {/* Header Section */}
      <div className="flex flex-row items-center gap-[2vw] w-full h-[100px] mb-10 shrink-0">
        <button 
          onClick={onBack}
          className="w-[3.5vw] h-[3.5vw] min-w-[48px] min-h-[48px] flex items-center justify-center bg-[#5F00DB] rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-[1.5vw] h-[1.5vw] text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div 
          className="w-[6vw] h-[6vw] min-w-[80px] min-h-[80px] rounded-full bg-cover bg-center border-2 border-[#5F00DB] shrink-0 shadow-2xl" 
          style={{ backgroundImage: `url(${userData.avatar})` }}
        />

        <div className="flex flex-col flex-grow min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-[2.5vw] font-bold tracking-tight font-inter">{userData.name}, {userData.age}</h1>
            <div className="flex items-center justify-center w-[2vw] h-[2vw] min-w-[24px] min-h-[24px] bg-white rounded-full">
               <svg viewBox="0 0 24 24" className="w-full h-full p-1 text-[#5F00DB]" fill="none" stroke="currentColor" strokeWidth="4">
                 <polyline points="20 6 9 17 4 12" />
               </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[userData.orientation, userData.pronouns, 'Austin, TX', '2 miles', userData.school, userData.job].map((chip) => (
              <div key={chip} className="px-3 py-1 bg-[#5F00DB] rounded-full text-white text-[0.75vw] font-medium backdrop-blur-[6px] font-inter">
                {chip}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowExport(true)}>Export Report</Button>
          <Button variant="outline" className="text-[#FF4E4E] border-[#FF4E4E]/30 hover:bg-[#FF4E4E]/10">Deactivate User</Button>
        </div>
      </div>

      <div className="flex flex-row w-full items-start pb-[5vw]">
        {/* Left Column: 73% */}
        <div className="w-[73%] flex flex-col min-w-0">
          <TabGroup 
            tabs={profileTabs} 
            activeId={activeTab} 
            onChange={(id) => setActiveTab(id as any)} 
            variant="profile" 
          />

          <div className="w-full bg-[#222222] border border-[#666666]/30 rounded-b-[24px] rounded-tr-[24px] p-[2.5vw] shadow-2xl min-h-[500px]">
            {activeTab === 'Overview' && (
              <div className="flex flex-col gap-[2.5vw] animate-in fade-in duration-500">
                <div className="flex flex-col gap-1">
                  <h3 className="text-white text-[2vw] font-bold font-inter">Overview</h3>
                  <p className="text-[#CCCCCC] opacity-60 text-[0.9vw] font-inter">Quick snapshot of the user’s profile, activity, and engagement stats.</p>
                </div>
                <div className="grid grid-cols-2 gap-x-[3vw] gap-y-[2vw]">
                  {[
                    { l: 'First Name', v: userData.name.split(' ')[0] },
                    { l: 'Last Name', v: userData.name.split(' ')[1] },
                    { l: 'Email', v: userData.email },
                    { l: 'Phone Number', v: userData.phone },
                    { l: 'Gender', v: 'Male' },
                    { l: 'Sexual Orientation', v: 'Straight' },
                  ].map(f => (
                    <div key={f.l} className="flex flex-col gap-1 border-b border-white/10 pb-2">
                       <label className="text-white text-[0.7vw] font-bold uppercase tracking-wider opacity-60 font-inter">{f.l}</label>
                       <span className="text-white text-[1vw] font-inter truncate">{f.v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-white text-[0.7vw] font-bold uppercase tracking-wider opacity-60 font-inter">Short Bio</label>
                  <p className="text-white text-[1.1vw] leading-relaxed font-inter">{userData.bio}</p>
                </div>
              </div>
            )}
            
            {activeTab === 'Media' && <ProfileMediaContent onRemoveRequest={(id) => onRemoveMedia?.(id)} />}
            {activeTab === 'Prompts' && <ProfilePromptsContent onRemoveRequest={(id) => onRemovePrompt?.(id)} />}
            {activeTab === 'Groups' && <ProfileGroupsContent />}
            {activeTab === 'Matches' && <ProfileMatchesContent />}
            {activeTab === 'Pokes Activity' && <ProfilePokesContent />}
            {activeTab === 'Subscription & Payments' && <ProfileSubscriptionContent />}
          </div>
        </div>

        {/* Spacer: 2% */}
        <div className="w-[2%]" />

        {/* Right Column: 25% */}
        <div className="w-[25%]">
           <ProfileInfoSidebar title="Profile Info" stats={profileStats} />
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;