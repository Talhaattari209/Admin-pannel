
import React from 'react';
import Image from 'next/image';

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive }) => {
    return (
        <div className="flex flex-col justify-between items-start p-[0.83vw] w-full bg-[#1A1F26] border border-white/5 rounded-[0.83vw] hover:border-white/10 transition-colors duration-300">
            <h3 className="text-[0.83vw] font-medium text-white/50 font-inter">
                {title}
            </h3>
            <div className="flex flex-row items-baseline gap-[0.83vw] mt-[1.25vw]">
                <span className="text-[1.66vw] font-bold text-white font-inter tracking-tight">
                    {value}
                </span>
                <div className="flex items-center gap-[0.2vw]">
                    <div className="relative w-[1.25vw] h-[1.25vw]">
                        <Image
                            src="/assets/Icons_figma/arrow-up.svg"
                            alt={isPositive ? "Increase" : "Decrease"}
                            fill
                            className={`object-contain ${!isPositive ? 'rotate-180' : ''} ${!isPositive ? 'grayscale hue-rotate-180 brightness-75' : ''}`}
                        // Note: Adjusting filter for color if the icon is white by default. 
                        // The SVG is likely white or colored. Figma XML implies it's an instance.
                        // Assuming white/default is correct or applying simple rotation.
                        />
                    </div>
                    <span className={`text-[1.04vw] font-medium ${isPositive ? 'text-[#00C853]' : 'text-[#FF3D00]'}`}>
                        {change}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
