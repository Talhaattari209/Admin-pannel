
import React, { useState } from 'react';

interface MediaItem {
  id: string;
  url: string;
  addedOn: string;
}

interface ProfileMediaContentProps {
  onRemoveRequest: (mediaId: string) => void;
}

const MOCK_MEDIA: MediaItem[] = [
  { id: 'm1', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800', addedOn: 'Nov 10, 2025 • 08:00 PM' },
  { id: 'm2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800', addedOn: 'Nov 11, 2025 • 09:15 AM' },
  { id: 'm3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', addedOn: 'Nov 12, 2025 • 11:30 PM' },
  { id: 'm4', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800', addedOn: 'Nov 13, 2025 • 07:45 PM' },
  { id: 'm5', url: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=800', addedOn: 'Nov 14, 2025 • 06:20 PM' },
  { id: 'm6', url: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=800', addedOn: 'Nov 15, 2025 • 10:00 PM' },
];

const ProfileMediaContent: React.FC<ProfileMediaContentProps> = ({ onRemoveRequest }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentMedia = MOCK_MEDIA[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MOCK_MEDIA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MOCK_MEDIA.length) % MOCK_MEDIA.length);
  };

  return (
    <div className="flex flex-col items-start gap-8 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2 w-full border-b border-white/10 pb-6">
        <h3 className="text-white text-[28px] font-bold font-inter leading-tight">Media</h3>
        <p className="text-[#CCCCCC] text-[16px] opacity-60 font-inter">
          View and manage all photos and videos uploaded by the user.
        </p>
      </div>

      {/* Slider Container */}
      <div className="flex flex-col items-center gap-8 w-full max-w-[1104px] mx-auto">
        
        {/* Main Display Row */}
        <div className="flex flex-row items-center justify-between w-full h-[560px] gap-4 relative">
          
          {/* Prev Button */}
          <button 
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center bg-[#16003F] border border-white/10 rounded-full shadow-2xl hover:brightness-125 hover:scale-110 active:scale-95 transition-all shrink-0 z-10"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Main Image Card */}
          <div className="relative w-[560px] h-[560px] rounded-[16px] overflow-hidden shadow-2xl group flex-shrink-0">
            <img 
              src={currentMedia.url} 
              alt="Profile Media" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            
            {/* Bottom Actions Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between p-6 pb-4">
              <span className="text-white text-[14px] font-inter opacity-90">
                Added: {currentMedia.addedOn}
              </span>
              <button 
                onClick={() => onRemoveRequest(currentMedia.id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF4E4E] rounded-full text-white text-[14px] font-medium shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Remove
              </button>
            </div>
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center bg-[#16003F] border border-white/10 rounded-full shadow-2xl hover:brightness-125 hover:scale-110 active:scale-95 transition-all shrink-0 z-10"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex flex-row items-center justify-center gap-4 w-full h-[80px] mt-4">
          {MOCK_MEDIA.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`w-20 h-20 rounded-[12px] overflow-hidden border-2 transition-all duration-300 ${
                activeIndex === index 
                ? 'border-white scale-110 shadow-2xl' 
                : 'border-transparent opacity-40 hover:opacity-100'
              }`}
            >
              <img src={item.url} className="w-full h-full object-cover" alt="thumbnail" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProfileMediaContent;
