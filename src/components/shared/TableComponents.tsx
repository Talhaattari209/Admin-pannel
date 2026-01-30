import React, { useState } from 'react';

// --- Utility for consistent VW ---
// Assuming 1920px design width
// 1px = 0.0520833333vw
const toVw = (px: number) => `${(px / 1920) * 100}vw`;

// --- SVGs ---
const SearchIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
        <path d="M20 20L17 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// --- 1. Reusable Search Bar ---
interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search", className }) => {
    return (
        <div
            className={`flex flex-row items-center isolation-isolate ${className}`}
            style={{
                width: toVw(412),
                height: toVw(56),
                padding: toVw(16),
                gap: toVw(16),
                backgroundColor: 'rgba(17, 17, 17, 0.5)',
                border: '1px solid rgba(102, 102, 102, 0.5)',
                borderRadius: toVw(16),
                boxSizing: 'border-box',
            }}
        >
            <div style={{ width: toVw(24), height: toVw(24), flex: 'none', order: 0, flexGrow: 0 }}>
                <SearchIcon />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent border-none outline-none text-white placeholder-white placeholder-opacity-40"
                style={{
                    width: toVw(340),
                    height: toVw(24),
                    fontFamily: '"SF Pro Text", sans-serif',
                    fontWeight: 400,
                    fontSize: toVw(16),
                    lineHeight: toVw(24),
                    flex: 'none',
                    order: 1,
                    flexGrow: 1,
                }}
            />
        </div>
    );
};

// --- 2. Reusable Filter Selection ---
interface FilterOption {
    label: string;
    value: string;
}

interface FilterSelectProps {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (val: string) => void;
    required?: boolean;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange, required }) => {
    return (
        <div
            className="flex flex-col items-start"
            style={{
                width: toVw(200),
                height: toVw(56),
                padding: 0,
            }}
        >
            {/* Label Row */}
            <div className="flex flex-row items-start self-stretch" style={{ gap: toVw(4), height: toVw(16) }}>
                <span
                    style={{
                        height: toVw(16),
                        fontFamily: '"SF Pro Text", sans-serif',
                        fontWeight: 700,
                        fontSize: toVw(12),
                        lineHeight: toVw(16),
                        color: '#FFFFFF',
                    }}
                >
                    {label}
                </span>
                {required && (
                    <span
                        style={{
                            width: toVw(6),
                            height: toVw(16),
                            fontFamily: '"Red Hat Display", sans-serif',
                            fontWeight: 500,
                            fontSize: toVw(12),
                            lineHeight: toVw(16),
                            color: '#E74C3C',
                        }}
                    >
                        *
                    </span>
                )}
            </div>

            {/* Input Area */}
            <div
                className="flex flex-row items-center border-b border-white box-border relative"
                style={{
                    width: toVw(200),
                    height: toVw(40),
                    minHeight: toVw(40),
                    padding: `${toVw(8)} 0px`, // 8px top/bottom
                    gap: toVw(16),
                }}
            >
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-transparent text-white appearance-none outline-none cursor-pointer w-full h-full absolute inset-0 z-10 opacity-0"
                >
                    <option value="" disabled>Select</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value} className="bg-[#222222] text-white">
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* Display Text */}
                <span
                    className="flex-grow min-w-0 truncate pointer-events-none"
                    style={{
                        fontFamily: '"SF Pro Text", sans-serif',
                        fontWeight: 400,
                        fontSize: toVw(16),
                        lineHeight: toVw(24),
                        color: '#FFFFFF',
                        opacity: value ? 1 : 0.4,
                        zIndex: 1,
                    }}
                >
                    {value || "Select"}
                </span>

                {/* Chevron */}
                <div style={{ width: toVw(24), height: toVw(24), flexShrink: 0, pointerEvents: 'none', zIndex: 1 }}>
                    <ChevronDownIcon />
                </div>
            </div>
        </div>
    );
};

// --- Filter Group Wrapper (layout for 1, 2, or 3 filters) ---
export const FilterGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-row items-center" style={{ gap: toVw(16) }}>
            {children}
        </div>
    )
}


// --- 3. Reusable Tabs ---
interface TabItem {
    id: string;
    label: string;
    count?: number;
}

interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex flex-row items-end" style={{ width: '100%' }}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <div
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex flex-row justify-center items-center cursor-pointer transition-colors duration-200`}
                        style={{
                            width: toVw(205),
                            height: toVw(48),
                            padding: `${toVw(12)} ${toVw(24)}`,
                            gap: toVw(8),
                            backgroundColor: isActive ? '#5F00DB' : '#000000', // Active colored, inactive black
                            borderRadius: `${toVw(12)} ${toVw(12)} 0px 0px`,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: '"Lato", sans-serif',
                                fontWeight: 400,
                                fontSize: toVw(16),
                                lineHeight: toVw(19),
                                color: '#FFFFFF',
                            }}
                        >
                            {tab.label}
                        </span>
                        {tab.count !== undefined && (
                            <div
                                className="flex flex-row justify-center items-center"
                                style={{
                                    minWidth: toVw(18),
                                    height: toVw(18),
                                    padding: `0px ${toVw(4)}`, // Correct padding
                                    gap: toVw(4),
                                    backgroundColor: '#FF4E4E',
                                    borderRadius: toVw(24),
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: '"SF Pro Text", sans-serif',
                                        fontWeight: 700,
                                        fontSize: toVw(12),
                                        lineHeight: toVw(14),
                                        color: '#FFFFFF',
                                        textAlign: 'center',
                                    }}
                                >
                                    {tab.count}
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// --- 4. Reusable Table Frame ---
interface TableFrameProps {
    children: React.ReactNode;
    searchBar?: React.ReactNode;
    filterBar?: React.ReactNode;
    headerContent?: React.ReactNode; // For extra header actions if needed
    className?: string; // Allow custom styling for the container
}

export const TableFrame: React.FC<TableFrameProps> = ({ children, searchBar, filterBar, headerContent, className }) => {
    return (
        <div
            className={`flex flex-col items-start ${className || ''}`}
            style={{
                width: '100%', // Flexible width, user can wrap or set explicit width
                maxWidth: toVw(1520), // Default match css
                background: '#222222',
                border: '1px solid rgba(102, 102, 102, 0.5)',
                borderRadius: toVw(16),
                overflow: 'hidden', // Ensure radius clips content
            }}
        >
            {/* Top Section */}
            {(searchBar || filterBar || headerContent) && (
                <div
                    className="flex flex-row items-center"
                    style={{
                        width: '100%',
                        height: toVw(88), // "Table - Top" height
                        padding: toVw(16),
                        gap: toVw(16),
                        backgroundColor: '#222222',
                        borderBottom: '1px solid rgba(102, 102, 102, 0.5)', // Optional separation
                    }}
                >
                    {searchBar}
                    {filterBar && (
                        <div className="flex-grow flex flex-row items-center gap-[1.25vw]">
                            {filterBar}
                        </div>
                    )}
                    {/* Spacer if needed or extra content */}
                    {headerContent}
                </div>
            )}

            {/* Main Table Content - Scalable, Internal Scroll */}
            <div
                className="w-full relative custom-scrollbar"
                style={{
                    // Height is dynamic as per user request, but when rows increase > screen, overflow hidden (with invisible scroll)
                    maxHeight: '70vh', // Reasonable default limit
                    overflowY: 'auto',
                    scrollbarWidth: 'none',   // Firefox
                    msOverflowStyle: 'none',  // IE/Edge
                }}
            >
                <style>{`
            .custom-scrollbar::-webkit-scrollbar {
                display: none;
            }
         `}</style>
                {children}
            </div>
        </div>
    );
};
