import React from 'react';
import ProfileCardBase from './ProfileCardBase';
import StatusBadge from '../shared/StatusBadge';

interface MatchMember {
  name: string;
  avatar: string;
}

interface MatchDetails {
  id: string;
  status: 'Matched' | 'Unmatched';
  timestamp: string;
  memberCount: number;
  members: MatchMember[];
}

const MOCK_MATCHES: MatchDetails[] = [
  { id: 'mt1', status: 'Matched', timestamp: 'Nov 01, 2025 • 8:42 PM', memberCount: 5, members: [{ name: 'Brenda', avatar: 'https://i.pravatar.cc/150?u=b1' }, { name: 'Nancy', avatar: 'https://i.pravatar.cc/150?u=n1' }, { name: 'Jeff', avatar: 'https://i.pravatar.cc/150?u=j1' }] },
  { id: 'mt2', status: 'Matched', timestamp: 'Oct 15, 2025 • 10:00 AM', memberCount: 3, members: [{ name: 'Chris', avatar: 'https://i.pravatar.cc/150?u=c1' }, { name: 'Ava', avatar: 'https://i.pravatar.cc/150?u=a1' }] },
  { id: 'mt3', status: 'Unmatched', timestamp: 'Sep 20, 2025 • 11:30 PM', memberCount: 4, members: [{ name: 'Dave', avatar: 'https://i.pravatar.cc/150?u=d1' }] },
  { id: 'mt4', status: 'Matched', timestamp: 'Aug 05, 2025 • 09:15 AM', memberCount: 6, members: [{ name: 'Emma', avatar: 'https://i.pravatar.cc/150?u=e1' }, { name: 'Liam', avatar: 'https://i.pravatar.cc/150?u=l1' }] },
  { id: 'mt5', status: 'Matched', timestamp: 'Jul 22, 2025 • 04:45 PM', memberCount: 2, members: [{ name: 'Sophie', avatar: 'https://i.pravatar.cc/150?u=s1' }] },
];

const ProfileMatchesContent: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-8 w-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 w-full border-b border-white/10 pb-6">
        <h3 className="text-white text-[2vw] font-bold font-inter leading-tight">Matches</h3>
        <p className="text-[#CCCCCC] text-[1vw] opacity-60 font-inter">Monitor user’s group matches, including status and last activity.</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {MOCK_MATCHES.map((match) => (
          <ProfileCardBase 
            key={match.id}
            className="w-full"
            rows={[
              { label: 'Status', value: <StatusBadge status={match.status} size="sm" /> },
              { label: match.status === 'Matched' ? 'Matched On' : 'Unmatched On', value: match.timestamp.split(' • ')[0] },
              { label: 'Group Members', value: <strong>{match.memberCount}</strong> }
            ]}
          >
            <div className="flex flex-row items-center justify-start gap-4 mt-2 overflow-x-auto no-scrollbar pb-2">
              {match.members.map((member, idx) => (
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

export default ProfileMatchesContent;