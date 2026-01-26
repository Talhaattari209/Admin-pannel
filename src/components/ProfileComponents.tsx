import React, { useState, useEffect, useRef } from 'react';
import { Compass, Leaf, Coffee, Music, Camera, Palette, Tent, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

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
                    <span className="font-['Lato'] font-normal text-[0.83vw] leading-[1.0vw] whitespace-nowrap">
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
                    <h3 className="font-['SF_Pro_Text'] font-bold text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">Media</h3>
                    <span className="font-['SF_Pro_Text'] font-normal text-[0.83vw] text-[#CCCCCC]">View and manage all photos and videos uploaded by the user.</span>
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
                                            <button className="flex flex-row items-center gap-[0.42vw] px-[0.63vw] py-[0.42vw] bg-[#FF4E4E] rounded-[2.7vw] shadow-[0px_4px_12px_rgba(95,0,219,0.25)] hover:bg-[#ff3333] transition-colors">
                                                <Trash2 className="w-[0.83vw] h-[0.83vw] text-white" />
                                                <span className="text-[0.83vw] text-white font-medium">Remove</span>
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
        </div>
    );
};

// --- ProfileOverview Component ---

const InfoField = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col gap-[0.63vw] w-[28.33vw]">
        <label className="font-['SF_Pro_Text'] font-bold text-[0.63vw] leading-[0.83vw] text-white">
            {label}
        </label>
        <span className="font-['SF_Pro_Text'] font-normal text-[0.83vw] leading-[1.25vw] text-white">
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
                <h3 className="font-['SF_Pro_Text'] font-bold text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">
                    Overview
                </h3>
                <p className="font-['SF_Pro_Text'] font-normal text-[0.83vw] leading-[150%] text-[#CCCCCC]">
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
                    <label className="font-['SF_Pro_Text'] font-bold text-[0.63vw] leading-[0.83vw] text-white">
                        Short Bio
                    </label>
                    <span className="font-['SF_Pro_Text'] font-normal text-[0.83vw] leading-[1.25vw] text-white">
                        Code, climb, repeat. Always up for a challenge — unless it's karaoke.
                    </span>
                </div>

                {/* Lifestyle Tags */}
                <div className="flex flex-col gap-[0.63vw] w-full">
                    <label className="font-['SF_Pro_Text'] font-bold text-[0.63vw] leading-[0.83vw] text-white">
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
                    <label className="font-['SF_Pro_Text'] font-bold text-[0.63vw] leading-[0.83vw] text-white">
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
        <span className="font-['SF_Pro_Text'] font-normal text-[0.83vw] leading-[150%] text-[#CCCCCC]">
            {label}
        </span>
        {isBadge ? (
            <div className="flex flex-row justify-center items-center px-[0.63vw] py-[0.42vw] bg-[#5F00DB] rounded-[0.83vw]">
                <span className="font-['SF_Pro_Text'] font-normal text-[0.73vw] leading-[0.83vw] text-white">
                    {value}
                </span>
            </div>
        ) : (
            <span className="font-['SF_Pro_Text'] font-normal text-[0.83vw] leading-[150%] text-white text-right">
                {value}
            </span>
        )}
    </div>
);

export const ProfileInfoCard = () => (
    <div className="flex flex-col p-[0.83vw] gap-[0.83vw] w-[19.17vw] bg-[#222222] border border-[#666666]/50 rounded-[0.83vw] h-fit">
        {/* Heading */}
        <div className="flex flex-col gap-[0.83vw] pb-[0.83vw] relative">
            <h3 className="font-['SF_Pro_Text'] font-bold text-[1.46vw] leading-[120%] tracking-[-0.04em] text-white">
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
    <div className="flex flex-row items-center justify-between w-full h-[1.38vw]">
        <span className="font-['SF_Pro_Text'] font-normal text-[0.69vw] leading-[150%] text-[#CCCCCC]">
            {label}
        </span>
        <div className="flex items-center gap-[0.35vw]">
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
        <div className="flex flex-col p-[0.69vw] gap-[0.69vw] w-[28.33vw] h-fit bg-[#111111] backdrop-blur-[6px] rounded-[1.04vw] border border-white/5 shrink-0 font-['SF_Pro_Text']">

            {/* Rows */}
            <div className="flex flex-col gap-[0.69vw] w-full">
                {/* Created By */}
                <GroupInfoRow
                    label="Created By"
                    value={
                        <>
                            <div
                                className="w-[1.04vw] h-[1.04vw] rounded-full bg-cover bg-center border border-white/10"
                                style={{ backgroundImage: `url(${createdBy.avatar})` }}
                            />
                            <span className="font-['SF_Pro_Text'] font-normal text-white text-[0.69vw] leading-[150%] text-right">{createdBy.name}</span>
                        </>
                    }
                />

                {/* Created On */}
                <GroupInfoRow
                    label="Created On"
                    value={<span className="font-['SF_Pro_Text'] font-normal text-white text-[0.69vw] leading-[150%] text-right">{createdOn}</span>}
                />

                {/* Joined On */}
                <GroupInfoRow
                    label="Joined On"
                    value={<span className="font-['SF_Pro_Text'] font-normal text-white text-[0.69vw] leading-[150%] text-right">{joined}</span>}
                />

                {/* Group Members Count */}
                <GroupInfoRow
                    label="Group Members"
                    value={<span className="font-['SF_Pro_Text'] font-normal text-white text-[0.69vw] leading-[150%] text-right">{memberCount}</span>}
                />
            </div>

            {/* Row 3: Avatar Grid with Names Below */}
            <div className="flex flex-row justify-between items-start w-full pt-[0.35vw]">
                {members.map((member, i) => (
                    <div key={i} className="flex flex-col items-center gap-[0.35vw] w-[3.46vw]">
                        <div
                            className="w-[2.76vw] h-[2.76vw] rounded-full border-2 border-[#111111] bg-cover bg-center shadow-lg"
                            style={{ backgroundImage: `url(${member.image})` }}
                        />
                        <span className="font-['SF_Pro_Text'] font-normal text-[#EEEEEE] text-[0.61vw] leading-[150%] text-center truncate w-full">
                            {member.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- FullGroupCard Component ---

export const FullGroupCard = () => {
    const groupData = {
        createdBy: { name: "John Doe", avatar: "/8.png" }, // Using dummy image for now
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
        <div className="flex flex-col items-start p-[0.69vw] gap-[1.38vw] w-[59.17vw] bg-[#222222] border border-[rgba(102,102,102,0.5)] rounded-[0.83vw]">
            {/* Header */}
            <div className="w-full relative pb-[0.69vw]">
                <div className="flex flex-col gap-[0.69vw]">
                    <h3 className="font-['SF_Pro_Text'] font-bold text-[1.21vw] leading-[120%] tracking-[-0.04em] text-white">Groups</h3>
                    <p className="font-['SF_Pro_Text'] font-normal text-[0.69vw] leading-[150%] text-[#CCCCCC]">List of all groups the user belongs to or has created.</p>
                </div>
                {/* Gradient Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, #5F00DB 0%, #FFFFFF 100%)' }} />
            </div>

            {/* Grid of Cards - Using flex-wrap to allow multiple rows */}
            <div className="flex flex-row flex-wrap gap-[0.69vw] w-full">
                <InternalDetailCard {...groupData} />
                <InternalDetailCard {...groupData} />
                <InternalDetailCard {...groupData} />
            </div>
        </div>
    );
};


