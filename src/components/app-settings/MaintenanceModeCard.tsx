
import React, { useState } from 'react';

interface MaintenanceModeCardProps {
  canEdit?: boolean;
}

const MaintenanceModeCard: React.FC<MaintenanceModeCardProps> = ({ canEdit = true }) => {
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
      disabled={!canEdit}
      className={`w-[2.5vw] h-[1.46vw] rounded-full border border-[#888888] relative transition-all duration-300 ${active ? 'bg-[#5F00DB] border-[#5F00DB]' : 'bg-transparent'} ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className={`absolute top-[0.15vw] w-[1.09vw] h-[1.09vw] bg-[#888888] rounded-full transition-all duration-300 ${active ? 'right-[0.15vw] bg-white' : 'left-[0.15vw]'}`}></div>
    </button>
  );

  return (
    <div className="flex flex-col p-[1.25vw] bg-[#222222] border border-[#666666]/30 rounded-[0.83vw] gap-[1.67vw] shrink-0 shadow-lg min-h-[32.6vw]">
      <div className="flex flex-col gap-[0.42vw]">
        <h3 className="text-white text-[1.46vw] font-bold not-italic font-inter not-italic leading-none tracking-tight">Maintenance Mode</h3>
        <p className="text-[#CCCCCC] text-[0.83vw] opacity-60 leading-relaxed font-inter not-italic">Use this mode to temporarily disable public access while performing updates or backend maintenance.</p>
      </div>

      <div className="flex flex-col gap-[1.25vw]">
        <div className="flex items-center justify-between">
          <span className="text-white text-[0.83vw] font-inter not-italic">Enable Maintenance Mode</span>
          <Switch active={enabled} onClick={() => setEnabled(!enabled)} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white text-[0.83vw] font-inter not-italic">Notify Users</span>
          <Switch active={notify} onClick={() => setNotify(!notify)} />
        </div>
      </div>

      <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
        <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">Maintenance Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!canEdit}
          placeholder="Custom message shown to users"
          className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none resize-none h-[6.25vw] font-inter not-italic py-[0.42vw] ${!canEdit ? 'opacity-50 cursor-not-allowed placeholder:text-white/40' : 'placeholder:text-white/40'}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-[1.25vw]">
        <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">Start Date</label>
          <input
            type="text"
            value={dates.start}
            onChange={(e) => setDates({ ...dates, start: e.target.value })}
            disabled={!canEdit}
            className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
        <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">Start Time</label>
          <input
            type="text"
            value={dates.startTime}
            onChange={(e) => setDates({ ...dates, startTime: e.target.value })}
            disabled={!canEdit}
            className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1.25vw]">
        <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">End Date</label>
          <input
            type="text"
            value={dates.end}
            onChange={(e) => setDates({ ...dates, end: e.target.value })}
            disabled={!canEdit}
            className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-none font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
        <div className="flex flex-col gap-[0.42vw] border-b border-white py-[0.42vw]">
          <label className="text-white text-[0.63vw] font-bold not-italic uppercase tracking-widest opacity-80 font-inter not-italic">End Time</label>
          <input
            type="text"
            value={dates.endTime}
            onChange={(e) => setDates({ ...dates, endTime: e.target.value })}
            disabled={!canEdit}
            className={`bg-transparent border-none text-white text-[0.83vw] focus:outline-out line font-inter not-italic ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModeCard;
