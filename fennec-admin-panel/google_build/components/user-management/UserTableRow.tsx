import React, { useState, useRef, useEffect } from 'react';

export interface UserRowData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  subscription: 'Free' | 'Premium';
  joinedOn: string;
  lastActive: string;
  avatar: string;
}

interface UserTableRowProps {
  data: UserRowData;
  onViewProfile: (userId: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ data, onViewProfile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="group flex flex-row items-center w-full h-[56px] bg-[#222222] border-b border-[#666666]/50 hover:bg-white/[0.02] transition-colors shrink-0 relative">
      <div className="w-[10%] px-4 text-white text-[0.85vw] shrink-0 opacity-80 truncate">{data.userId}</div>

      <div className="w-[18%] px-4 flex items-center gap-3 shrink-0">
        <div 
          className="w-[2vw] h-[2vw] min-w-[32px] min-h-[32px] rounded-full bg-cover bg-center border border-white/10 shrink-0" 
          style={{ backgroundImage: `url(${data.avatar})` }}
        />
        <span className="text-white text-[0.9vw] font-medium truncate">{data.name}</span>
      </div>

      <div className="w-[22%] px-4 text-white text-[0.85vw] shrink-0 truncate opacity-80">{data.email}</div>
      <div className="w-[15%] px-4 text-white text-[0.85vw] shrink-0 opacity-80 truncate">{data.phone}</div>

      <div className="w-[10%] px-4 shrink-0">
        <div className={`px-[0.8vw] py-[0.2vw] rounded-full text-[0.7vw] font-bold text-center inline-block min-w-[4vw] ${
          data.subscription === 'Premium' ? 'bg-[#5F00DB] text-white' : 'bg-[#111111] text-white/60'
        }`}>
          {data.subscription}
        </div>
      </div>

      <div className="w-[10%] px-4 text-white text-[0.8vw] shrink-0 truncate">
        {data.joinedOn.split(' • ')[0]}
      </div>

      <div className="w-[11%] px-4 text-white text-[0.8vw] shrink-0 truncate">
        {data.lastActive.split(' • ')[0]}
      </div>
      
      <div className="w-[4%] flex items-center justify-center shrink-0">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-[0.5vw] rounded-full transition-colors ${isMenuOpen ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
        >
          <svg viewBox="0 0 24 24" className="w-[1vw] h-[1vw] min-w-[16px] min-h-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="5" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </button>

        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="absolute top-[80%] right-[2%] w-[15vw] min-w-[200px] bg-[#1a1a1a] border border-[#666666]/50 rounded-[1vw] shadow-2xl z-[60] overflow-hidden py-[0.5vw] animate-in fade-in slide-in-from-right-2 duration-200"
          >
            <button 
              onClick={() => { onViewProfile(data.id); setIsMenuOpen(false); }}
              className="flex flex-row items-center w-full px-[1vw] py-[0.8vw] gap-[0.8vw] hover:bg-white/5 transition-colors text-left"
            >
              <svg className="w-[1vw] h-[1vw] min-w-[16px] min-h-[16px] text-white opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span className="flex-grow text-white text-[0.9vw]">View Details</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTableRow;