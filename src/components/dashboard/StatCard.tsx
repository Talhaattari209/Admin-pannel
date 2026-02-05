
import React from 'react';
import Image from 'next/image';

import { cn } from "@/lib/utils";

export interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive }) => {
    // Mapping props to match the internal style used in LoginDashboard
    const label = title;
    const isUp = isPositive;

    return (
        <div className="flex flex-col justify-end items-start p-[0.6vw] gap-[0.6vw] w-full h-[4.09vw] bg-[rgba(22,0,63,0.5)] border border-[rgba(102,102,102,0.5)] backdrop-blur-[12px] rounded-[0.83vw] font-['SF_Pro_Text']">
            {/* Label - H6 (16px -> 0.83vw), #CCCCCC, Bold */}
            <h6 className="w-full text-[#CCCCCC] font-bold not-italic text-[0.83vw] leading-[120%] tracking-[-0.04em] flex items-center">
                {label}
            </h6>

            {/* Value and Change Row */}
            <div className="flex flex-row justify-end items-center w-full h-[1.77vw]">
                {/* Main Number - H3 (28px -> 1.46vw), White, Bold, Flex-grow */}
                <span className="flex-grow text-white font-bold not-italic text-[1.46vw] leading-[120%] tracking-[-0.04em]">
                    {value}
                </span>

                {/* Arrow and Change - Gap 8px (0.41vw) */}
                <div className="flex items-center gap-[0.42vw]">
                    {/* Arrow - 24px (1.25vw) */}
                    <div className={cn(
                        "relative w-[1.25vw] h-[1.25vw]",
                        !isUp && "rotate-180"
                    )}>
                        <Image
                            src="/assets/Icons_figma/arrow-up.svg"
                            alt={isUp ? "Up" : "Down"}
                            fill
                            className={cn(
                                "object-contain",
                            )}
                        />
                    </div>
                    {/* Change % - H5 (20px -> 1.04vw), #3ADC60, Bold */}
                    <span className={cn(
                        "font-bold not-italic text-[1.04vw] leading-[120%] tracking-[-0.04em]",
                        isUp ? "text-[#3ADC60]" : "text-[#FF3D00]"
                    )}>
                        {change}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
