"use client";

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../public/assets/lottie/Icon-BG-Dark.json';

const IconBackgroundAnimation: React.FC = () => {
    return (
        <div className="absolute inset-0 z-[1] rounded-full">
            <Lottie
                animationData={animationData}
                loop={true}
                className="w-[100%] h-[100%]" // Slightly scaled to cover the glow area as per original design
            />
        </div>
    );
};

export default IconBackgroundAnimation;
