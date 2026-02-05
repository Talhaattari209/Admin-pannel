import React, { useState, useEffect, useRef } from 'react';
import { Compass, Leaf, Coffee, Music, Camera, Palette, Tent, ChevronLeft, ChevronRight, Trash2, Play, ArrowUpDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { RemoveMediaCard, RemovePromptResponseCard, SuccessCard } from './PopCards';
import { Pagination } from './shared/TableComponents';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';


// --- ProfileTabs Component ---

export const ProfileTabs = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (t: string) => void }) => {
    const tabs = [
        "Overview",
        "Media",
        "Prompts",
        "Groups",
        "Matches",
        "Pokes Activity",
        "Subscription & Payments"
    ];

    return (
        <div className="flex flex-row items-center gap-[0.42vw] w-[59.17vw] h-[2.5vw] pl-[0.83vw]">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-[1.25vw] py-[0.76vw] h-full flex items-center justify-center rounded-t-[0.63vw] transition-colors ${activeTab === tab
                        ? "bg-[#222222] text-white border-t border-x border-[#666666]/50"
                        : "bg-transparent text-white/60 hover:text-white"
                        // Note: The previous active style was purple, but often tabs blend into the card. 
                        // I'm adjusting to match the 'Overview' card style which has a border.
                        // Reverting to the logic: Active = card BG color. Inactive = Transparent.
                        // Checking previous styles... 
                        // Previous: bg-[#5F00DB] text-white. 
                        // I will stick to the user's previous design if they liked it, but typically tabs connecting to a card share the card's background.
                        // Let's use the purple for active as requested in previous turns for other things, but here the design implies connection.
                        // Given the "Media" tab is part of this system, I will keep the previous style but ensure it looks good.
                        }`}
                // Re-applying the exact previous class for consistency until requested otherwise, but fixing the active/inactive logic to match "Tab" feel if needed. 
                // Actually, I'll keep the component code as is for the tabs to minimize diffs, wait, I already replaced the chunk.
                // Let me rewrite the tabs part exactly as it was but maybe slight tweak if needed. 
                // The user's prompt didn't ask to change tabs styling, so I will NOT change the tabs styling in this chunk.
                // Wait, I selected the chunk including ProfileTabs. I will create a separate ProfileMedia component and leave ProfileTabs alone in this logic? 
                // No, I need to insert ProfileMedia. I'll just skip replacing ProfileTabs if I don't need to change it.
                // But I need to add ProfileMedia. I'll add it BEFORE ProfileOverview.
                >
                    <span className="font-['Lato'] font-normal not-italic text-[0.83vw] leading-[1.0vw] whitespace-nowrap">
                        {tab}
                    </span>
                </button>
            ))}
        </div>
    );
};

// --- ProfileMedia Component ---

const ProfileMedia = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleConfirmRemove = () => {
        setIsRemoveOpen(false);
        setTimeout(() => setIsSuccessOpen(true), 300);
    };

    // Initial dummy images - using provided placeholders or generic ones
    const images = [
        '/8.png',
        '/8.png',
        '/8.png',
        '/8.png',
        '/8.png',
        '/8.png'
    ];

    return (
        <div className="flex flex-col p-[0.83vw] gap-[0.83vw] w-[59.17vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw]" style={{ minHeight: '34.7vw' }}> {/* Height reduced by ~14% from 42.19vw */}

            {/* Header */}
            <div className="flex flex-col gap-[0.83vw] w-[57.51vw]">
                <div className="flex flex-col gap-[0.83vw] pb-[0.83vw] border-b border-[#333333]">
                    <h3 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">Media</h3>
                    <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] text-[#CCCCCC]">View and manage all photos and videos uploaded by the user.</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col gap-[1.15vw] w-full items-center"> {/* Reduced vertical spacing */}

                {/* Upper Section: Arrows + Main Image */}
                <div className="flex flex-row items-center justify-between w-[57.51vw]"> {/* Keeping arrows wide, aligning center */}

                    {/* Left Arrow */}
                    <button ref={(node) => setPrevEl(node)} className="flex items-center justify-center w-[2.5vw] h-[2.5vw] rounded-full bg-[#16003F] shadow-[0px_0px_4px_rgba(95,0,219,0.25),0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#2a0075] transition-colors z-10 cursor-pointer">
                        <ChevronLeft className="w-[1.25vw] h-[1.25vw] text-white" />
                    </button>

                    {/* Main Swiper */}
                    <div className="w-[22.8vw] h-[22.8vw] rounded-[0.83vw] overflow-hidden relative group bg-black/20">
                        <Swiper
                            loop={true}
                            spaceBetween={10}
                            navigation={{
                                prevEl,
                                nextEl,
                            }}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[Navigation, Thumbs, EffectFade]}
                            className="w-full h-full"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative w-full h-full">
                                        <img src={img} className="w-full h-full object-cover" alt={`Slide ${index}`} />

                                        {/* Overlay Info */}
                                        <div className="absolute bottom-0 left-0 w-full h-[3.75vw] bg-gradient-to-t from-[#111111] to-transparent flex items-center justify-between px-[0.83vw]">
                                            <span className="font-['SF_Pro_Text'] text-[0.73vw] text-white">Added: Nov 10, 2025 • 08:00 PM</span>
                                            <button
                                                onClick={() => setIsRemoveOpen(true)}
                                                className="flex flex-row items-center gap-[0.42vw] px-[0.63vw] py-[0.42vw] bg-[#FF4E4E] rounded-[2.7vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#ff3333] transition-colors"
                                            >
                                                <Trash2 className="w-[0.83vw] h-[0.83vw] text-white" />
                                                <span className="text-[0.83vw] text-white font-medium not-italic">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Right Arrow */}
                    <button ref={(node) => setNextEl(node)} className="flex items-center justify-center w-[2.5vw] h-[2.5vw] rounded-full bg-[#16003F] shadow-[0px_0px_4px_rgba(95,0,219,0.25),0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#2a0075] transition-colors z-10 cursor-pointer">
                        <ChevronRight className="w-[1.25vw] h-[1.25vw] text-white" />
                    </button>
                </div>

                {/* Thumbnails Reel */}
                <div className="w-[22.8vw] h-[3.33vw]">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={8}
                        slidesPerView={6}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-full w-full"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-[3.33vw] h-[3.33vw] rounded-[0.63vw] overflow-hidden border-2 transition-all cursor-pointer border-transparent opacity-60 hover:opacity-100 [.swiper-slide-thumb-active_&]:border-white [.swiper-slide-thumb-active_&]:opacity-100">
                                    <img src={img} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>

            <RemoveMediaCard
                isOpen={isRemoveOpen}
                onClose={() => setIsRemoveOpen(false)}
                onConfirm={handleConfirmRemove}
            />
            <SuccessCard
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                title="Media Removed"
                description="The selected media has been successfully removed. The user has been notified about this."
            />
        </div>
    );
};


// --- ProfilePrompts Component ---

export const ProfilePrompts = () => {
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleConfirmRemove = () => {
        setIsRemoveOpen(false);
        setTimeout(() => setIsSuccessOpen(true), 300);
    };

    return (
        <div className="flex flex-col items-start p-[0.83vw] gap-[1.67vw] w-[59.17vw] h-[28.44vw] bg-[#222222] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw]">
            {/* Heading */}
            <div className="flex flex-col items-start gap-[0.83vw] w-[57.5vw] h-[4.69vw] relative">
                <div className="flex flex-col gap-[0.83vw] pb-[0.83vw] w-full">
                    <h3 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">Prompts</h3>
                    <p className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">Review and moderate the user’s responses to personality and icebreaker prompts.</p>
                </div>
                {/* Gradient Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #5F00DB 0%, #FFFFFF 100%)' }} />
            </div>

            {/* Prompts List */}
            <div className="flex flex-col items-start gap-[0.83vw] w-[57.5vw] h-[20.42vw]">
                {/* Voice Prompt */}
                <div className="flex flex-col items-start p-[0.83vw] gap-[0.83vw] w-[57.5vw] h-[7.08vw] bg-[#111111]/50 backdrop-blur-[6px] rounded-[1.25vw]">
                    {/* Top Row: Question + Date + Trash */}
                    <div className="flex flex-row items-center w-[55.83vw] h-[1.67vw] gap-[0.83vw]">
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.94vw] leading-[1.67vw] text-white flex-grow">A perfect weekend for me looks like...</span>
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[150%] text-[#EEEEEE] opacity-50 text-right w-[11.35vw]">Added: Nov 10, 2025 • 08:00 PM</span>
                        <div
                            className="flex justify-center items-center w-[1.67vw] h-[1.67vw] bg-[#FF4E4E] shadow-[0px_0px_4px_rgba(95,0,219,0.25),0px_4px_12px_rgba(95,0,219,0.25)] rounded-full cursor-pointer hover:bg-[#ff3333] transition-colors"
                            onClick={() => setIsRemoveOpen(true)}
                        >
                            <Trash2 className="w-[0.83vw] h-[0.83vw] text-white" />
                        </div>
                    </div>
                    {/* Audio Player */}
                    <div className="flex flex-row items-center p-[0.21vw] gap-[0.63vw] w-[55.83vw] h-[2.92vw] bg-[#16003F] rounded-[2.5vw]">
                        {/* Play Button */}
                        <div className="flex justify-center items-center w-[2.5vw] h-[2.5vw] bg-[#5F00DB] rounded-full pl-[0.2vw] flex-shrink-0 cursor-pointer hover:bg-[#7000ff] transition-colors">
                            <Play className="w-[1.04vw] h-[1.04vw] text-white fill-white ml-[0.1vw]" />
                        </div>
                        {/* Wave Image */}
                        <div className="flex-grow h-[1.88vw] relative flex items-center overflow-hidden">
                            {/* Using the image provided by user */}
                            <img src="/Audio Preview.png" alt="Audio Wave" className="w-[52vw] h-full object-contain opacity-50 ml-[-2vw]" />
                        </div>
                        {/* Time */}
                        <div className="w-[2.29vw] h-[0.73vw] flex items-center justify-center mr-[0.63vw] flex-shrink-0">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.63vw] leading-[0.73vw] text-white text-center">00:16</span>
                        </div>
                    </div>
                </div>

                {/* Text Prompt 1 */}
                <div className="flex flex-col items-start p-[0.83vw] gap-[0.83vw] w-[57.5vw] h-[5.83vw] bg-[#111111]/50 backdrop-blur-[6px] rounded-[1.25vw]">
                    <div className="flex flex-row items-center w-[55.83vw] h-[1.67vw] gap-[0.83vw]">
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.94vw] leading-[1.67vw] text-white flex-grow">My friends describe me as...</span>
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[150%] text-[#EEEEEE] opacity-50 text-right w-[11.35vw]">Added: Nov 10, 2025 • 08:00 PM</span>
                        <div
                            className="flex justify-center items-center w-[1.67vw] h-[1.67vw] bg-[#FF4E4E] shadow-[0px_0px_4px_rgba(95,0,219,0.25),0px_4px_12px_rgba(95,0,219,0.25)] rounded-full cursor-pointer hover:bg-[#ff3333] transition-colors"
                            onClick={() => setIsRemoveOpen(true)}
                        >
                            <Trash2 className="w-[0.83vw] h-[0.83vw] text-white" />
                        </div>
                    </div>
                    <div className="w-[55.83vw] h-[1.67vw]">
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.94vw] leading-[1.67vw] text-[#CCCCCC]">Quiet at first, but the funniest one once you know me.</span>
                    </div>
                </div>

                {/* Text Prompt 2 */}
                <div className="flex flex-col items-start p-[0.83vw] gap-[0.83vw] w-[57.5vw] h-[5.83vw] bg-[#111111]/50 backdrop-blur-[6px] rounded-[1.25vw]">
                    <div className="flex flex-row items-center w-[55.83vw] h-[1.67vw] gap-[0.83vw]">
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.94vw] leading-[1.67vw] text-white flex-grow">Two truths and a lie...</span>
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[150%] text-[#EEEEEE] opacity-50 text-right w-[11.35vw]">Added: Nov 10, 2025 • 08:00 PM</span>
                        <div
                            className="flex justify-center items-center w-[1.67vw] h-[1.67vw] bg-[#FF4E4E] shadow-[0px_0px_4px_rgba(95,0,219,0.25),0px_4px_12px_rgba(95,0,219,0.25)] rounded-full cursor-pointer hover:bg-[#ff3333] transition-colors"
                            onClick={() => setIsRemoveOpen(true)}
                        >
                            <Trash2 className="w-[0.83vw] h-[0.83vw] text-white" />
                        </div>
                    </div>
                    <div className="w-[55.83vw] h-[1.67vw]">
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.94vw] leading-[1.67vw] text-[#CCCCCC]">I’ve skydived, I hate pizza, I can juggle three oranges.</span>
                    </div>
                </div>
            </div>

            <RemovePromptResponseCard
                isOpen={isRemoveOpen}
                onClose={() => setIsRemoveOpen(false)}
                onConfirm={handleConfirmRemove}
            />
            <SuccessCard
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                title="Response Removed"
                description="The prompt response has been successfully removed. The user has been notified about this."
            />
        </div>
    );
};

// --- ProfileOverview Component ---

const InfoField = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col gap-[0.63vw] w-[28.33vw]">
        <label className="font-['SF_Pro_Text'] font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">
            {label}
        </label>
        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white">
            {value}
        </span>
    </div>
);

const TagChip = ({ label, icon, color = "#5F00DB" }: { label: string, icon?: React.ReactNode, color?: string }) => (
    <div className="flex flex-row items-center px-[0.63vw] py-[0.42vw] gap-[0.21vw] border border-white/20 rounded-[1.25vw] bg-white/[0.02]">
        <span className="text-[0.83vw] whitespace-nowrap">{label}</span>
        {icon && <span className="text-[0.83vw]">{icon}</span>}
    </div>
);

export const ProfileOverview = ({ activeTab, height = "auto" }: { activeTab: string, height?: string }) => {
    if (activeTab === "Media") return <ProfileMedia />;
    if (activeTab === "Groups") return <FullGroupCard />;
    if (activeTab === "Matches") return <ProfileMatches />;
    if (activeTab === "Prompts") return <ProfilePrompts />;
    if (activeTab === "Pokes Activity") return <ProfilePokesActivity />;
    if (activeTab === "Subscription & Payments") return <ProfileSubscription />;

    if (activeTab !== "Overview") return (
        <div className="w-[59.17vw] h-[41.35vw] flex items-center justify-center bg-[#222222] rounded-[0.83vw] border border-[#666666]/50">
            <span className="text-white/40">Content for {activeTab}</span>
        </div>
    );

    return (
        <div
            className="flex flex-col p-[0.83vw] gap-[0.83vw] w-[59.17vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw] overflow-hidden"
            style={{ height }}
        >
            {/* Header */}
            <div className="flex flex-col gap-[0.83vw] pb-[0.83vw] relative">
                <h3 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">
                    Overview
                </h3>
                <p className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">
                    Quick snapshot of the user's profile, activity, and engagement stats.
                </p>
                {/* Gradient Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #5F00DB 0%, #FFFFFF 100%)' }} />
            </div>

            {/* Form Grid */}
            <div className="flex flex-col justify-between flex-grow h-full">
                {/* Row 1 */}
                <div className="flex flex-row gap-[0.83vw]">
                    <InfoField label="First Name" value="John" />
                    <InfoField label="Last Name" value="Doe" />
                </div>
                {/* Row 2 */}
                <div className="flex flex-row gap-[0.83vw]">
                    <InfoField label="Email" value="johndoe@email.com" />
                    <InfoField label="Phone Number" value="+1 (234) 567 8900" />
                </div>
                {/* Row 3 */}
                <div className="flex flex-row gap-[0.83vw]">
                    <InfoField label="Date of Birth" value="Apr 16, 2003" />
                    <InfoField label="Gender" value="Male" />
                </div>
                {/* Row 4 */}
                <div className="flex flex-row gap-[0.83vw]">
                    <InfoField label="Your Sexual Orientation" value="Straight" />
                    <InfoField label="Your Pronouns" value="He/Him" />
                </div>
                {/* Row 5 */}
                <div className="flex flex-row gap-[0.83vw]">
                    <InfoField label="Job Title / Occupation" value="Software Engineer" />
                    <InfoField label="Education / School" value="Stanford University" />
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-[0.63vw] w-full">
                    <label className="font-['SF_Pro_Text'] font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">
                        Short Bio
                    </label>
                    <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[1.25vw] text-white">
                        Code, climb, repeat. Always up for a challenge — unless it's karaoke.
                    </span>
                </div>

                {/* Lifestyle Tags */}
                <div className="flex flex-col gap-[0.63vw] w-full">
                    <label className="font-['SF_Pro_Text'] font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">
                        Lifestyle Tags
                    </label>
                    <div className="flex flex-row flex-wrap gap-[0.63vw]">
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.73vw] text-white">Adventure seeker</span>
                            <CompressIcon className="w-[0.83vw] h-[0.83vw] text-white" />
                        </div>
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.73vw] text-white">Nature explorer</span>
                            <LeafIcon className="w-[0.83vw] h-[0.83vw] text-[#3ADC60]" />
                        </div>
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.73vw] text-white">Foodie</span>
                            <CoffeeIcon className="w-[0.83vw] h-[0.83vw] text-white" />
                        </div>
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.73vw] text-white">Dog parent</span>
                            <span className="text-[0.83vw]">🐶</span>
                        </div>
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.73vw] text-white">Early riser</span>
                            <span className="text-[0.83vw]">🌅</span>
                        </div>
                    </div>
                </div>

                {/* Interests */}
                <div className="flex flex-col gap-[0.63vw] w-full">
                    <label className="font-['SF_Pro_Text'] font-bold not-italic text-[0.63vw] leading-[0.83vw] text-white">
                        Interests
                    </label>
                    <div className="flex flex-row flex-wrap gap-[0.63vw]">
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.83vw]">🎸</span>
                            <span className="text-[0.73vw] text-white">Music Festivals</span>
                        </div>
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.83vw]">🌭</span>
                            <span className="text-[0.73vw] text-white">Street Food Explorer</span>
                        </div>
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.83vw]">📸</span>
                            <span className="text-[0.73vw] text-white">Photography</span>
                        </div>
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.83vw]">⛺</span>
                            <span className="text-[0.73vw] text-white">Weekend Escapes</span>
                        </div>
                        <div className="px-[0.83vw] py-[0.42vw] rounded-[1.25vw] border border-[#5F00DB] bg-[#5F00DB]/10 flex items-center gap-[0.42vw]">
                            <span className="text-[0.83vw]">🎨</span>
                            <span className="text-[0.73vw] text-white">Art & Design</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ProfileInfoCard Component ---

const InfoRow = ({ label, value, isBadge = false }: { label: string, value: string | React.ReactNode, isBadge?: boolean }) => (
    <div className="flex flex-row items-center justify-between w-full h-[1.67vw]">
        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">
            {label}
        </span>
        {isBadge ? (
            <div className="flex flex-row justify-center items-center px-[0.63vw] py-[0.42vw] bg-[#5F00DB] rounded-[0.83vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-white">
                    {value}
                </span>
            </div>
        ) : (
            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-white text-right">
                {value}
            </span>
        )}
    </div>
);

export const ProfileInfoCard = () => (
    <div className="flex flex-col p-[0.83vw] gap-[0.83vw] w-[19.17vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw] h-fit">
        {/* Heading */}
        <div className="flex flex-col gap-[0.83vw] pb-[0.83vw] relative">
            <h3 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">
                Profile Info
            </h3>
            {/* Gradient Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #5F00DB 0%, #FFFFFF 100%)' }} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[0.83vw]">
            <InfoRow label="Membership" value="Premium" isBadge={true} />
            <InfoRow label="Groups" value="3" />
            <InfoRow label="Matches" value="12" />
            <InfoRow label="Pokes Sent" value="15" />
            <InfoRow label="Reports" value="0" />
            <InfoRow label="Last Active" value="Nov 10, 2025 • 8:42 PM" />
            <InfoRow label="Joined" value="Nov 01, 2025 • 8:42 PM" />
        </div>
    </div>
);

// --- Dummy Icons ---
const CompressIcon = (props: any) => <Compass {...props} />;
const LeafIcon = (props: any) => <Leaf {...props} />;
const CoffeeIcon = (props: any) => <Coffee {...props} />;

// --- InternalDetailCard Component ---

interface Member {
    name: string;
    image: string;
}

interface InternalCardProps {
    createdBy: { name: string; avatar: string };
    createdOn: string;
    joined: string;
    memberCount: string;
    members: Member[];
}

const GroupInfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex flex-row items-center justify-between w-full h-[1.43vw]">
        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">
            {label}
        </span>
        <div className="flex items-center gap-[0.42vw]">
            {value}
        </div>
    </div>
);

const InternalDetailCard = ({
    createdBy,
    createdOn,
    joined,
    memberCount,
    members
}: InternalCardProps) => {
    return (
        <div className="flex flex-col p-[0.71vw] gap-[0.71vw] w-[28.33vw] h-[14.09vw] bg-[#111111] backdrop-blur-[6px] rounded-[1.25vw] border border-white/5 shrink-0 font-['SF_Pro_Text']">

            {/* Rows */}
            <div className="flex flex-col gap-[0.71vw] w-full">
                {/* Created By */}
                <GroupInfoRow
                    label="Created By"
                    value={
                        <>
                            <div
                                className="w-[1.25vw] h-[1.25vw] rounded-full bg-cover bg-center border border-white/10"
                                style={{ backgroundImage: `url(${createdBy.avatar})` }}
                            />
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-white text-[0.83vw] leading-[150%] text-right">{createdBy.name}</span>
                        </>
                    }
                />

                {/* Created On */}
                <GroupInfoRow
                    label="Created On"
                    value={<span className="font-['SF_Pro_Text'] font-normal not-italic text-white text-[0.83vw] leading-[150%] text-right">{createdOn}</span>}
                />

                {/* Joined On */}
                <GroupInfoRow
                    label="Joined On"
                    value={<span className="font-['SF_Pro_Text'] font-normal not-italic text-white text-[0.83vw] leading-[150%] text-right">{joined}</span>}
                />

                {/* Group Members Count */}
                <GroupInfoRow
                    label="Group Members"
                    value={<span className="font-['SF_Pro_Text'] font-normal not-italic text-white text-[0.83vw] leading-[150%] text-right">{memberCount}</span>}
                />
            </div>

            {/* Row 3: Avatar Grid with Names Below */}
            <div className="flex flex-row justify-between items-start w-full">
                {members.map((member, i) => (
                    <div key={i} className="flex flex-col items-center gap-[0.42vw] w-[6.04vw]">
                        <div
                            className="w-[2.84vw] h-[2.84vw] rounded-full border-[2px] border-[#111111] bg-cover bg-center"
                            style={{ backgroundImage: `url(${member.image})` }}
                        />
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[#EEEEEE] text-[0.73vw] leading-[150%] text-center truncate w-full">
                            {member.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MatchDetailCard Component (Reusable) ---

interface MatchDetailCardProps {
    status: 'Matched' | 'Unmatched';
    statusDateLabel: string;
    statusDate: string;
    memberCount: number;
    members: Member[];
}

const MatchDetailCard = ({
    status,
    statusDateLabel,
    statusDate,
    memberCount,
    members
}: MatchDetailCardProps) => {
    const isMatched = status === 'Matched';
    const badgeColor = isMatched ? 'bg-[#5F00DB]' : 'bg-[#FF4E4E]';

    return (
        <div className="flex flex-col p-[0.83vw] gap-[0.83vw] w-[28.33vw] h-[14.01vw] bg-[#111111] backdrop-blur-[6px] rounded-[1.25vw] border border-white/5 shrink-0 font-['SF_Pro_Text']">
            {/* Status Row */}
            <div className="flex flex-row items-center justify-between w-full h-[1.67vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">Status</span>
                <div className={`flex flex-row justify-center items-center px-[0.63vw] py-[0.42vw] rounded-[0.83vw] ${badgeColor}`}>
                    <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-white">
                        {status}
                    </span>
                </div>
            </div>

            {/* Date Row */}
            <div className="flex flex-row items-center justify-between w-full h-[1.25vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">{statusDateLabel}</span>
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-white text-right">{statusDate}</span>
            </div>

            {/* Member Count Row */}
            <div className="flex flex-row items-center justify-between w-full h-[1.25vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">Group Members</span>
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-white text-right">{memberCount}</span>
            </div>

            {/* Members Avatars Row */}
            <div className="flex flex-row justify-between items-start w-full">
                {members.map((member, i) => (
                    <div key={i} className="flex flex-col items-center gap-[0.42vw] w-[4.67vw]">
                        <div
                            className="w-[3.33vw] h-[3.33vw] rounded-full border-[2px] border-[#111111] bg-cover bg-center"
                            style={{ backgroundImage: `url(${member.image})` }}
                        />
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[#EEEEEE] text-[0.73vw] leading-[150%] text-center truncate w-full">
                            {member.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- ProfileMatches Component ---

export const ProfileMatches = () => {
    const membersData = [
        { name: "Brenda Taylor", image: "/8.png" },
        { name: "Nancy Garcia", image: "/8.png" },
        { name: "Jeff Anderson", image: "/8.png" },
        { name: "James Kim", image: "/8.png" },
        { name: "Anna Taylor", image: "/8.png" }
    ];

    const matchCardsData: MatchDetailCardProps[] = [
        {
            status: 'Matched',
            statusDateLabel: 'Matched On',
            statusDate: 'Nov 01, 2025 • 8:42 PM',
            memberCount: 5,
            members: membersData
        },
        {
            status: 'Matched',
            statusDateLabel: 'Matched On',
            statusDate: 'Nov 01, 2025 • 8:42 PM',
            memberCount: 5,
            members: membersData
        },
        {
            status: 'Matched',
            statusDateLabel: 'Matched On',
            statusDate: 'Nov 01, 2025 • 8:42 PM',
            memberCount: 5,
            members: membersData
        },
        {
            status: 'Unmatched',
            statusDateLabel: 'Unmatched On',
            statusDate: 'Nov 01, 2025 • 8:42 PM',
            memberCount: 5,
            members: membersData
        },
        {
            status: 'Unmatched',
            statusDateLabel: 'Unmatched On',
            statusDate: 'Nov 01, 2025 • 8:42 PM',
            memberCount: 5,
            members: membersData
        }
    ];

    return (
        <div className="flex flex-col items-start p-[0.83vw] gap-[1.67vw] w-[59.17vw] bg-[#222222] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw] h-[47.58vw]">
            {/* Header Section */}
            <div className="w-full relative pb-[0.83vw]">
                <div className="flex flex-col gap-[0.83vw]">
                    <h3 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">Matches</h3>
                    <p className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">Monitor user’s group matches, including status and last activity.</p>
                </div>
                {/* Gradient Divider Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #5F00DB 0%, rgba(255, 255, 255, 0.1) 100%)' }} />
            </div>

            {/* Cards Grid with Invisible Scroll */}
            <div className="grid grid-cols-2 gap-[0.83vw] w-full overflow-y-auto pr-[0.4vw] pb-[0.83vw]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {matchCardsData.map((data, index) => (
                    <MatchDetailCard key={index} {...data} />
                ))}
            </div>
        </div>
    );
};

export const FullGroupCard = () => {
    const groupData = {
        createdBy: { name: "John Doe", avatar: "/8.png" },
        createdOn: "Nov 01, 2025 • 8:42 PM",
        joined: "Nov 01, 2025 • 8:42 PM",
        memberCount: "5",
        members: [
            { name: "Brenda Taylor", image: "/8.png" },
            { name: "Nancy Garcia", image: "/8.png" },
            { name: "Jeff Anderson", image: "/8.png" },
            { name: "Anna Taylor", image: "/8.png" }
        ]
    };

    return (
        <div className="flex flex-col items-start p-[0.71vw] gap-[0.71vw] w-[59.17vw] bg-[#222222] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw] min-h-[27.68vw]">
            {/* Header Section */}
            <div className="w-full relative pb-[0.71vw]">
                <div className="flex flex-col gap-[0.71vw]">
                    <h3 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">Groups</h3>
                    <p className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">List of all groups the user belongs to or has created.</p>
                </div>
                {/* Gradient Divider Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #5F00DB 0%, rgba(255, 255, 255, 0.1) 100%)' }} />
            </div>



            {/* Change: Flex replaced with Grid for 2-column layout */}
            <div className="grid grid-cols-2 gap-[0.71vw] w-full">
                <InternalDetailCard {...groupData} />
                <InternalDetailCard {...groupData} />
                <InternalDetailCard {...groupData} />
            </div>
        </div>
    );
};

// --- ProfilePokesActivity Component ---

interface PokeActivityItem {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
    type: string;
    details: string;
    status: 'Viewed' | 'Accepted' | 'Ignored';
    timestamp: string;
}

const PokeActivityRow = ({ item }: { item: PokeActivityItem }) => {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Viewed':
                return 'bg-[#5F00DB] text-white';
            case 'Accepted':
                return 'bg-[#3ADC60] text-black';
            case 'Ignored':
                return 'bg-[#FF4E4E] text-white';
            default:
                return 'bg-[#333333] text-white';
        }
    };

    return (
        <div className="flex flex-row items-center w-[57.5vw] h-[2.92vw] border-b border-[#333333] px-[0.63vw] bg-[#1a1a1a] hover:bg-[#FFFFFF]/5 transition-colors">
            {/* User Column */}
            <div className="flex flex-row items-center gap-[0.42vw] w-[10.42vw]">
                <div
                    className="w-[1.88vw] h-[1.88vw] rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.user.avatar})` }}
                />
                <div className="flex flex-col justify-center gap-[0.21vw]">
                    <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-white">
                        {item.user.name}
                    </span>
                    <span className="font-['SF_Pro_Text'] font-light not-italic text-[0.57vw] leading-[0.83vw] tracking-[0.02em] text-white/50">
                        {item.user.email}
                    </span>
                </div>
            </div>

            {/* Type Column */}
            <div className="flex flex-row items-center w-[7.29vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-white">
                    {item.type}
                </span>
            </div>

            {/* Details Column */}
            <div className="flex flex-row items-center w-[22.08vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-[#CCCCCC] truncate pr-[1vw]">
                    {item.details}
                </span>
            </div>

            {/* Status Column */}
            <div className="flex flex-row items-center w-[7.29vw]">
                <div className={`flex flex-row justify-center items-center px-[0.63vw] py-[0.21vw] rounded-[0.83vw] h-[1.67vw] ${getStatusStyle(item.status)}`}>
                    <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw]">
                        {item.status}
                    </span>
                </div>
            </div>

            {/* Timestamp Column */}
            <div className="flex flex-row items-center justify-end gap-[0.42vw] w-[10.42vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-white">
                    {item.timestamp}
                </span>
            </div>
        </div>
    );
};

export const ProfilePokesActivity = () => {
    const [subTab, setSubTab] = useState<'Sent' | 'Received'>('Sent');

    const sentPokes: PokeActivityItem[] = [
        {
            user: { name: "Jackson Scott", email: "jacksonscott@email.com", avatar: "/8.png" },
            type: "Profile",
            details: "Would love to chat!",
            status: "Viewed",
            timestamp: "Dec 31, 2025 • 11:59 PM"
        },
        {
            user: { name: "Emily Chen", email: "emilychen@email.com", avatar: "/8.png" },
            type: "Prompt",
            details: "You seem awesome 😄",
            status: "Accepted",
            timestamp: "Jan 1, 2026 • 12:00 PM"
        },
        {
            user: { name: "Michael Johnson", email: "michaeljohnson@email.com", avatar: "/8.png" },
            type: "Photo",
            details: "That smile tho 😍",
            status: "Ignored",
            timestamp: "Jan 2, 2026 • 3:15 PM"
        },
        // Duplicates for list visualization
        {
            user: { name: "Sophia Brown", email: "sophiabrown@email.com", avatar: "/8.png" },
            type: "Profile",
            details: "Excited to collaborate!",
            status: "Viewed",
            timestamp: "Jan 3, 2026 • 9:45 AM"
        },
        {
            user: { name: "Liam Smith", email: "liamsmith@email.com", avatar: "/8.png" },
            type: "Prompt",
            details: "Let's brainstorm ideas!",
            status: "Accepted",
            timestamp: "Jan 4, 2026 • 2:30 PM"
        },
        {
            user: { name: "Ava Wilson", email: "avawilson@email.com", avatar: "/8.png" },
            type: "Video",
            details: "Looking forward to your feedback!",
            status: "Ignored",
            timestamp: "Jan 5, 2026 • 10:00 AM"
        },
        {
            user: { name: "James Taylor", email: "jamestaylor@email.com", avatar: "/8.png" },
            type: "Profile",
            details: "Can we reschedule?",
            status: "Viewed",
            timestamp: "Jan 6, 2026 • 1:15 PM"
        },
        {
            user: { name: "Isabella Davis", email: "isabelladavis@email.com", avatar: "/8.png" },
            type: "Prompt",
            details: "Checking in on our last chat.",
            status: "Accepted",
            timestamp: "Jan 7, 2026 • 4:20 PM"
        },
        {
            user: { name: "Ethan Martinez", email: "ethanmartinez@email.com", avatar: "/8.png" },
            type: "Photo",
            details: "I have some ideas to share!",
            status: "Ignored",
            timestamp: "Jan 8, 2026 • 11:15 AM"
        },
        {
            user: { name: "Mia Garcia", email: "miagarcia@email.com", avatar: "/8.png" },
            type: "Profile",
            details: "Join me for a coffee chat?",
            status: "Viewed",
            timestamp: "Jan 9, 2026 • 5:00 PM"
        },
        {
            user: { name: "Noah White", email: "noahwhite@email.com", avatar: "/8.png" },
            type: "Prompt",
            details: "Your input is invaluable!",
            status: "Accepted",
            timestamp: "Jan 10, 2026 • 8:30 AM"
        }
    ];

    const receivedPokes: PokeActivityItem[] = [
        {
            user: { name: "Charlotte Moore", email: "charlottemoore@email.com", avatar: "/8.png" },
            type: "Profile",
            details: "Hey, nice to meet you!",
            status: "Viewed",
            timestamp: "Jan 12, 2026 • 10:15 AM"
        },
        {
            user: { name: "Oliver Taylor", email: "olivertaylor@email.com", avatar: "/8.png" },
            type: "Photo",
            details: "Great shot!",
            status: "Accepted",
            timestamp: "Jan 13, 2026 • 11:30 AM"
        },
        {
            user: { name: "Lucas Anderson", email: "lucasanderson@email.com", avatar: "/8.png" },
            type: "Prompt",
            details: "How's your day going?",
            status: "Ignored",
            timestamp: "Jan 14, 2026 • 1:00 PM"
        },
        {
            user: { name: "Amelia Thomas", email: "ameliathomas@email.com", avatar: "/8.png" },
            type: "Profile",
            details: "Looking forward to connecting!",
            status: "Viewed",
            timestamp: "Jan 15, 2026 • 3:45 PM"
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil((subTab === 'Sent' ? sentPokes.length : receivedPokes.length) / itemsPerPage);

    const activeList = subTab === 'Sent' ? sentPokes : receivedPokes;
    const currentData = activeList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex flex-col items-start p-[0.83vw] gap-[1.67vw] w-[59.17vw] bg-[#222222] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw] h-[47.58vw]">
            {/* Header Section */}
            <div className="w-full relative pb-[0.83vw] flex-shrink-0">
                <div className="flex flex-col gap-[0.83vw]">
                    <h3 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">Pokes Activity</h3>
                    <p className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">Track sent and received pokes, along with their context and outcomes.</p>
                </div>
                {/* Gradient Divider Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #5F00DB 0%, rgba(255, 255, 255, 0.1) 100%)' }} />
            </div>

            {/* Content Area */}
            <div className="flex flex-col w-full flex-grow overflow-hidden">
                {/* Tabs - with specific styling and gap adjustments */}
                <div className="flex flex-row gap-[0.42vw] ml-[0.83vw] flex-shrink-0">
                    <button
                        onClick={() => { setSubTab('Sent'); setCurrentPage(1); }}
                        className={`flex flex-row justify-center items-center px-[1.25vw] h-[2.5vw] min-w-[5.52vw] gap-[0.42vw] rounded-t-[0.63vw] transition-colors ${subTab === 'Sent' ? 'bg-[#5F00DB]' : 'bg-[#111111] hover:bg-[#333333]'}`}
                    >
                        <span className="font-['Lato'] font-normal not-italic text-[0.83vw] leading-[1.0vw] text-white">Sent</span>
                        <div className="flex flex-row justify-center items-center w-[0.94vw] h-[0.94vw] bg-[#FF4E4E] rounded-[1.25vw]">
                            <span className="font-['SF_Pro_Text'] font-bold not-italic text-[0.63vw] leading-[0.73vw] text-white flex items-center justify-center h-full">{sentPokes.length}</span>
                        </div>
                    </button>
                    <button
                        onClick={() => { setSubTab('Received'); setCurrentPage(1); }}
                        className={`flex flex-row justify-center items-center px-[1.25vw] h-[2.5vw] min-w-[5.52vw] gap-[0.42vw] rounded-t-[0.63vw] transition-colors ${subTab === 'Received' ? 'bg-[#5F00DB]' : 'bg-[#111111] hover:bg-[#333333]'}`}
                    >
                        <span className="font-['Lato'] font-normal not-italic text-[0.83vw] leading-[1.0vw] text-white">Received</span>
                        <div className="flex flex-row justify-center items-center w-[0.94vw] h-[0.94vw] bg-[#FF4E4E] rounded-[1.25vw]">
                            <span className="font-['SF_Pro_Text'] font-bold not-italic text-[0.63vw] leading-[0.73vw] text-white flex items-center justify-center h-full">{receivedPokes.length}</span>
                        </div>
                    </button>
                </div>

                {/* Table */}
                <div className="flex flex-col w-full flex-grow border border-[rgba(255,255,255,0.1)] rounded-[0.83vw] overflow-hidden bg-[#1a1a1a] mb-[1.25vw] pb-[1.25vw]">
                    {/* Table Header */}
                    <div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1a1a1a] border-b border-[#333333] px-[0.83vw] flex-shrink-0">
                        <div className="flex flex-row items-center gap-[0.42vw] w-[10.42vw]">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC]">User</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                        <div className="flex flex-row items-center gap-[0.42vw] w-[7.29vw] ml-[0.63vw]">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC] ml-[1vw]">Type</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                        <div className="flex flex-row items-center gap-[0.42vw] w-[22.08vw] ml-[0.63vw]">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC]">Details</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                        <div className="flex flex-row items-center gap-[0.42vw] w-[7.29vw] ml-[0.63vw]">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC]">Status</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                        <div className="flex flex-row items-center gap-[0.42vw] w-[10.42vw] ml-auto justify-end">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC] mr-[0.5vw]">Timestamp</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col w-full flex-grow overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {currentData.map((item, index) => (
                            <PokeActivityRow key={index} item={item} />
                        ))}
                    </div>

                    {/* Gap */}
                    <div className="w-full h-[2.60vw] shrink-0" />

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        className="w-full px-[1.25vw]"
                    />
                </div>
            </div>
        </div>
    );
};



// --- ProfileSubscription Component ---

interface Transaction {
    type: string;
    amount: string;
    status: 'Successful' | 'Failed';
    timestamp: string;
}

const TransactionRow = ({ item }: { item: Transaction }) => {
    return (
        <div className="flex flex-row items-center w-full h-[2.92vw] border-b border-[#666666]/50 bg-[#111111] px-[0.63vw] hover:bg-[#FFFFFF]/5 transition-colors">
            {/* Type */}
            <div className="flex flex-row items-center w-[14.37vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-white">
                    {item.type}
                </span>
            </div>
            {/* Amount */}
            <div className="flex flex-row items-center w-[14.37vw]">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-white">
                    {item.amount}
                </span>
            </div>
            {/* Status */}
            <div className="flex flex-row items-center w-[14.37vw]">
                <div className={`flex items-center justify-center px-[0.63vw] py-[0.42vw] rounded-[0.83vw] h-[1.67vw] ${item.status === 'Successful' ? 'bg-[#3ADC60]' : 'bg-[#FF4E4E]'}`}>
                    <span className={`font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] ${item.status === 'Successful' ? 'text-black' : 'text-white'}`}>
                        {item.status}
                    </span>
                </div>
            </div>
            {/* Timestamp */}
            <div className="flex flex-row items-center w-[14.37vw] justify-end">
                <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] leading-[0.83vw] text-white">
                    {item.timestamp}
                </span>
            </div>
        </div>
    );
};

export const ProfileSubscription = () => {
    const transactions: Transaction[] = [
        { type: "Premium Subscription", amount: "$29.99", status: "Successful", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "10 Pokes Pack", amount: "$11.99", status: "Successful", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "Premium Subscription", amount: "$29.99", status: "Failed", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "Premium Subscription", amount: "$29.99", status: "Successful", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "10 Pokes Pack", amount: "$11.99", status: "Successful", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "Premium Subscription", amount: "$29.99", status: "Failed", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "Premium Subscription", amount: "$29.99", status: "Successful", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "10 Pokes Pack", amount: "$11.99", status: "Successful", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "Premium Subscription", amount: "$29.99", status: "Failed", timestamp: "Dec 31, 2025 • 11:59 PM" },
        { type: "Premium Subscription", amount: "$29.99", status: "Successful", timestamp: "Dec 31, 2025 • 11:59 PM" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const currentData = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex flex-col items-start p-[0.83vw] gap-[1.67vw] w-[59.17vw] bg-[#222222] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw] min-h-[47.58vw]">
            {/* Header Section */}
            <div className="w-full relative pb-[0.83vw]">
                <div className="flex flex-col gap-[0.83vw]">
                    <h3 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">Subscription & Payments</h3>
                    <p className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] leading-[150%] text-[#CCCCCC]">Shows the user’s premium subscription status, poke pack purchases, renewal logs, and transaction history.</p>
                </div>
                {/* Gradient Divider Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #5F00DB 0%, rgba(255, 255, 255, 0.1) 100%)' }} />
            </div>

            {/* Banner Card */}
            <div className="w-[57.51vw] h-[4.58vw] rounded-[0.83vw] p-[0.83vw] flex flex-row items-center justify-between" style={{ background: 'linear-gradient(180deg, #16003F 0%, #111111 100%)' }}>
                <div className="flex items-center h-full">
                    <h4 className="font-['SF_Pro_Text'] font-bold not-italic text-[1.25vw] leading-[120%] tracking-[-0.04em] text-white">Fennec Premium</h4>
                </div>
                <div className="flex flex-row gap-[1.67vw] mr-[1vw]">
                    <div className="flex flex-col gap-[0.42vw]">
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] text-[#CCCCCC]">Premium User Since</span>
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] text-white">October 25, 2024</span>
                    </div>
                    <div className="flex flex-col gap-[0.42vw]">
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] text-[#CCCCCC]">Next Billing Date</span>
                        <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.83vw] text-white">November 25, 2025</span>
                    </div>
                </div>
            </div>

            {/* Transactions Table Wrapper to fill space */}
            <div className="flex flex-col flex-grow w-full justify-between">
                {/* Transactions Table */}
                <div className="flex flex-col w-full border border-[rgba(255,255,255,0.1)] rounded-[0.83vw] overflow-hidden mb-[1.25vw]">
                    {/* Header */}
                    <div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1a1a1a] border-b border-[#333333] px-[0.63vw]">
                        <div className="flex flex-row items-center w-[14.37vw] gap-[0.42vw]">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC]">Type</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                        <div className="flex flex-row items-center w-[14.37vw] gap-[0.42vw]">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC]">Amount</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                        <div className="flex flex-row items-center w-[14.37vw] gap-[0.42vw]">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC]">Status</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                        <div className="flex flex-row items-center w-[14.37vw] justify-end gap-[0.42vw]">
                            <span className="font-['SF_Pro_Text'] font-normal not-italic text-[0.73vw] text-[#CCCCCC] mr-[0.5vw]">Timestamp</span>
                            <ArrowUpDown className="w-[0.73vw] h-[0.73vw] text-white/30" />
                        </div>
                    </div>
                    {/* Body */}
                    <div className="flex flex-col w-full min-h-[25vw] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style>{`
                                div::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
                        {currentData.map((tx, i) => (
                            <TransactionRow key={i} item={tx} />
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="w-full flex justify-center pb-[0.25vw]">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

        </div>
    );
};
