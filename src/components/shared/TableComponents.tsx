import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

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
            className={`flex flex-row items-center relative ${className}`}
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
                    width: '100%',
                    height: '100%',
                    fontFamily: '"SF Pro Text", sans-serif',
                    fontWeight: 400,
                    fontSize: toVw(16),
                    lineHeight: toVw(24),
                    flex: '1',
                    paddingRight: toVw(24), // Space for X icon
                    position: 'relative',
                    zIndex: 10,
                }}
            />
            {value.length > 0 && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-[0.83vw] flex items-center justify-center hover:bg-white/10 rounded-full p-1 transition-colors"
                    style={{ width: toVw(24), height: toVw(24), zIndex: 20 }}
                >
                    <X className="text-white w-full h-full" />
                </button>
            )}
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

            {/* Main Table Content - Scalable, No Internal Scroll */}
            <div
                className="w-full relative flex-grow flex flex-col"
                style={{
                    // Height is DYNAMIC (content based), no internal scroll
                    width: '100%',
                }}
            >
                {children}
            </div>
        </div>
    );
};

// --- 5. Pagination ---
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {

    // Helper for circular buttons
    const PageButton = ({ page, isActive, onClick, disabled, isNav }: { page?: number | string | React.ReactNode, isActive?: boolean, onClick?: () => void, disabled?: boolean, isNav?: boolean }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center rounded-full transition-all duration-200 ${isNav
                ? 'bg-[#5F00DB] hover:bg-[#4a00aa] disabled:opacity-50 disabled:hover:bg-[#5F00DB]'
                : isActive
                    ? 'bg-[#16003F] border border-[#5F00DB] text-[#5F00DB]'
                    : 'bg-[#120D1D] text-white hover:bg-white/10'
                }`}
            style={{
                width: toVw(40),
                height: toVw(40),
                fontSize: toVw(14),
                fontFamily: '"SF Pro Text", sans-serif',
                gap: toVw(10)
            }}
        >
            {page}
        </button>
    );

    return (
        <div className={`flex flex-row items-center justify-center w-full ${className}`} style={{ gap: toVw(10) }}>

            {/* Previous */}
            <PageButton
                isNav
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                page={<ChevronLeft className="text-white" style={{ width: toVw(20), height: toVw(20) }} />}
            />

            {/* Page Numbers */}
            {(() => {
                const pages = [];
                // Always show 1
                pages.push(
                    <PageButton
                        key={1}
                        page={1}
                        isActive={currentPage === 1}
                        onClick={() => onPageChange(1)}
                    />
                );

                // Start ellipsis
                if (currentPage > 3) {
                    pages.push(<span key="start-ellipsis" className="text-white">...</span>);
                }

                // Range
                let start = Math.max(2, currentPage - 1);
                let end = Math.min(totalPages - 1, currentPage + 1);

                // Adjust if near start
                if (currentPage <= 3) {
                    end = Math.min(totalPages - 1, 4); // Show up to 4 if possible
                }
                // Adjust if near end
                if (currentPage >= totalPages - 2) {
                    start = Math.max(2, totalPages - 3);
                }

                for (let i = start; i <= end; i++) {
                    pages.push(
                        <PageButton
                            key={i}
                            page={i}
                            isActive={currentPage === i}
                            onClick={() => onPageChange(i)}
                        />
                    );
                }

                // End ellipsis
                if (currentPage < totalPages - 2) {
                    pages.push(<span key="end-ellipsis" className="text-white">...</span>);
                }

                // Always show Last (if > 1)
                if (totalPages > 1) {
                    pages.push(
                        <PageButton
                            key={totalPages}
                            page={totalPages}
                            isActive={currentPage === totalPages}
                            onClick={() => onPageChange(totalPages)}
                        />
                    );
                }

                return pages;
            })()}

            {/* Next */}
            <PageButton
                isNav
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                page={<ChevronRight className="text-white" style={{ width: toVw(20), height: toVw(20) }} />}
            />
        </div>
    );
};
