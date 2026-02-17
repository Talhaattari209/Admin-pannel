import React from 'react';
import ProfileCardBase from './ProfileCardBase';

interface GroupMember {
  name: string;
  avatar: string;
}

interface GroupDetails {
  id: string;
  name: string;
  createdBy: { name: string; avatar: string };
  createdOn: string;
  joinedOn: string;
  memberCount: number;
  members: GroupMember[];
}

const MOCK_GROUPS: GroupDetails[] = [
  {
    id: 'g1',
    name: 'Night Owls',
    createdBy: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john' },
    createdOn: 'Nov 01, 2025 • 8:42 PM',
    joinedOn: 'Nov 01, 2025 • 8:42 PM',
    memberCount: 5,
    members: [
      { name: 'Brenda Taylor', avatar: 'https://i.pravatar.cc/150?u=brenda' },
      { name: 'Nancy Garcia', avatar: 'https://i.pravatar.cc/150?u=nancy' },
      { name: 'Jeff Anderson', avatar: 'https://i.pravatar.cc/150?u=jeff' },
      { name: 'Anna Taylor', avatar: 'https://i.pravatar.cc/150?u=anna' },
    ]
  },
  {
    id: 'g2',
    name: 'Tech Enthusiasts',
    createdBy: { name: 'Sarah Wilson', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    createdOn: 'Oct 28, 2025 • 10:15 AM',
    joinedOn: 'Oct 29, 2025 • 09:00 PM',
    memberCount: 8,
    members: [
      { name: 'James Cook', avatar: 'https://i.pravatar.cc/150?u=james' },
      { name: 'Lily Evans', avatar: 'https://i.pravatar.cc/150?u=lily' },
      { name: 'Mark Wood', avatar: 'https://i.pravatar.cc/150?u=mark' },
    ]
  },
  {
    id: 'g3',
    name: 'Hiking Buddies',
    createdBy: { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=mike' },
    createdOn: 'Sep 15, 2025 • 02:30 PM',
    joinedOn: 'Sep 16, 2025 • 11:20 AM',
    memberCount: 12,
    members: [
      { name: 'Tom Hardy', avatar: 'https://i.pravatar.cc/150?u=tom' },
      { name: 'Chloe Grace', avatar: 'https://i.pravatar.cc/150?u=chloe' },
    ]
  }
];

const ProfileGroupsContent: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-8 w-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 w-full border-b border-white/10 pb-6">
        <h3 className="text-white text-[2vw] font-bold font-inter leading-tight">Groups</h3>
        <p className="text-[#CCCCCC] text-[1vw] opacity-60 font-inter">List of all groups the user belongs to or has created.</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {MOCK_GROUPS.map((group) => (
          <ProfileCardBase 
            key={group.id} 
            className="w-full"
            rows={[
              { label: 'Created By', value: (
                <div className="flex flex-row items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${group.createdBy.avatar})` }} />
                  <span>{group.createdBy.name}</span>
                </div>
              )},
              { label: 'Created On', value: group.createdOn.split(' • ')[0] },
              { label: 'Joined On', value: group.joinedOn.split(' • ')[0] },
              { label: 'Group Members', value: <strong>{group.memberCount}</strong> }
            ]}
          >
            <div className="flex flex-row items-center justify-start gap-4 mt-2 overflow-x-auto no-scrollbar pb-2">
              {group.members.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-[#111111] bg-cover bg-center" style={{ backgroundImage: `url(${member.avatar})` }} />
                  <span className="text-[#EEEEEE] text-[12px] text-center font-inter truncate w-16">{member.name}</span>
                </div>
              ))}
            </div>
          </ProfileCardBase>
        ))}
      </div>
    </div>
  );
};

export default ProfileGroupsContent;