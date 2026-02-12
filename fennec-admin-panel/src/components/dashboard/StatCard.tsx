
import React from 'react';


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
        <div className="flex flex-col justify-end items-start p-[0.6vw] gap-[0.6vw] w-full h-[4.09vw] bg-[rgba(22,0,63,0.5)] border border-[rgba(102,102,102,0.5)] backdrop-blur-[12px] rounded-[0.83vw] ">
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
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071C19.3166 13.0976 18.6834 13.0976 18.2929 12.7071L13 7.41421V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V7.41422L5.70711 12.7071C5.31658 13.0976 4.68342 13.0976 4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4Z"
                                fill={isUp ? "#3ADC60" : "#FF4D4F"}
                            />
                        </svg>
                    </div>
                    {/* Change % - H5 (20px -> 1.04vw), #3ADC60, Bold */}
                    <span className={cn(
                        "font-bold not-italic text-[1.04vw] leading-[120%] tracking-[-0.04em]",
                        isUp ? "text-[#3ADC60]" : "text-[#FF4D4F]"
                    )}>
                        {change}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
