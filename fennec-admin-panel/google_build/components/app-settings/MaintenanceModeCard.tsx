
import React, { useState } from 'react';

const MaintenanceModeCard: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [notify, setNotify] = useState(false);
  const [message, setMessage] = useState('');
  const [dates, setDates] = useState({
    start: 'Dec 30, 2025',
    startTime: '00:00 AM',
    end: 'Dec 31, 2025',
    endTime: '00:00 AM'
  });

  const Switch = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-12 h-7 rounded-full border border-[#888888] relative transition-all duration-300 ${active ? 'bg-[#5F00DB] border-[#5F00DB]' : 'bg-transparent'}`}
    >
      <div className={`absolute top-0.5 w-[21px] h-[21px] bg-[#888888] rounded-full transition-all duration-300 ${active ? 'right-0.5 bg-white' : 'left-0.5'}`}></div>
    </button>
  );

  return (
    <div className="flex flex-col p-6 bg-[#222222] border border-[#666666]/30 rounded-[16px] gap-8 shrink-0 shadow-lg min-h-[626px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-[28px] font-bold font-inter leading-none tracking-tight">Maintenance Mode</h3>
        <p className="text-[#CCCCCC] text-[16px] opacity-60 leading-relaxed font-inter">Use this mode to temporarily disable public access while performing updates or backend maintenance.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-white text-[16px] font-inter">Enable Maintenance Mode</span>
          <Switch active={enabled} onClick={() => setEnabled(!enabled)} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white text-[16px] font-inter">Notify Users</span>
          <Switch active={notify} onClick={() => setNotify(!notify)} />
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-white py-2">
        <label className="text-white text-[12px] font-bold uppercase tracking-widest opacity-80 font-inter">Maintenance Message</label>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Custom message shown to users" 
          className="bg-transparent border-none text-white text-[16px] focus:outline-none resize-none h-[120px] placeholder:text-white/40 font-inter py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 border-b border-white py-2">
          <label className="text-white text-[12px] font-bold uppercase tracking-widest opacity-80 font-inter">Start Date</label>
          <input 
            type="text" 
            value={dates.start} 
            onChange={(e) => setDates({...dates, start: e.target.value})}
            className="bg-transparent border-none text-white text-[16px] focus:outline-none font-inter" 
          />
        </div>
        <div className="flex flex-col gap-2 border-b border-white py-2">
          <label className="text-white text-[12px] font-bold uppercase tracking-widest opacity-80 font-inter">Start Time</label>
          <input 
            type="text" 
            value={dates.startTime} 
            onChange={(e) => setDates({...dates, startTime: e.target.value})}
            className="bg-transparent border-none text-white text-[16px] focus:outline-none font-inter" 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 border-b border-white py-2">
          <label className="text-white text-[12px] font-bold uppercase tracking-widest opacity-80 font-inter">End Date</label>
          <input 
            type="text" 
            value={dates.end} 
            onChange={(e) => setDates({...dates, end: e.target.value})}
            className="bg-transparent border-none text-white text-[16px] focus:outline-none font-inter" 
          />
        </div>
        <div className="flex flex-col gap-2 border-b border-white py-2">
          <label className="text-white text-[12px] font-bold uppercase tracking-widest opacity-80 font-inter">End Time</label>
          <input 
            type="text" 
            value={dates.endTime} 
            onChange={(e) => setDates({...dates, endTime: e.target.value})}
            className="bg-transparent border-none text-white text-[16px] focus:outline-none font-inter" 
          />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModeCard;
