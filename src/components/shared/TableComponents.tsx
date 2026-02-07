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
                width: '17.16vw', // Standardized
                height: '2.92vw', // Matching Row Height (56px)
                padding: '0.42vw 0.66vw', // Adjusted padding
                gap: '0.66vw',
                backgroundColor: 'rgba(17, 17, 17, 0.5)',
                border: '1px solid rgba(102, 102, 102, 0.5)',
                borderRadius: '0.66vw',
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
                className="bg-transparent border-none outline-none text-white placeholder-white placeholder-opacity-40 font-normal not-italic font-['SF_Pro_Text']"
                style={{
                    width: '100%',
                    height: '100%',
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
    className?: string; // Added
    style?: React.CSSProperties; // Added
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange, required, className, style }) => {
    // Add dummy options for display/demo purposes as requested
    const displayOptions = [
        ...options,
        { label: 'Dummy Opt 1', value: 'dummy1' },
        { label: 'Dummy Opt 2', value: 'dummy2' }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = displayOptions.find(opt => opt.value === value)?.label || "Select";

    return (
        <div
            ref={containerRef}
            className={`flex flex-col items-start relative ${className || ''}`}
            style={{
                width: '10.1vw', // Standardized width
                height: '2.92vw', // Matching Row Height (56px)
                padding: 0,
                ...style // Allow overrides
            }}
        >
            {/* Label Row */}
            <div className="flex flex-row items-start self-stretch" style={{ gap: '0.21vw', height: '0.66vw' }}>
                <span
                    className="font-sans font-bold not-italic "
                    style={{
                        height: '0.66vw',
                        fontSize: '0.70vw', // Increased from 0.63vw
                        lineHeight: '0.66vw',
                    }}
                >
                    {label}
                </span>
                {required && (
                    <span
                        className="font-medium not-italic text-[#E74C3C]"
                        style={{
                            width: '0.31vw',
                            height: '0.66vw',
                            fontFamily: '"Red Hat Display", sans-serif',
                            fontSize: '0.52vw',
                            lineHeight: '0.66vw',
                        }}
                    >
                        *
                    </span>
                )}
            </div>

            {/* Input Area (Trigger) */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-row items-center border-b border-white box-border relative cursor-pointer"
                style={{
                    width: '100%',
                    height: '2.26vw', // Remaining height (2.92 - 0.66)
                    minHeight: '2.26vw',
                    padding: 0, // Reduced to zero as requested
                    gap: '0.66vw',
                }}
            >
                {/* Display Text */}
                <span
                    className="flex-grow min-w-0 truncate pointer-events-none font-sans not-italic font-normal not-italic text-white"
                    style={{
                        fontSize: '0.86vw', // Increased from 0.78vw
                        lineHeight: '1vw',
                        opacity: value ? 1 : 0.4,
                        zIndex: 1,
                    }}
                >
                    {selectedLabel}
                </span>

                {/* Chevron */}
                <div style={{ width: '1vw', height: '1vw', flexShrink: 0, pointerEvents: 'none', zIndex: 1 }}>
                    <ChevronDownIcon />
                </div>

                {/* Custom Dropdown Menu */}
                {isOpen && (
                    <div
                        className="absolute left-0 w-full bg-[#1C1C1E] border border-[#333333] z-50 overflow-hidden shadow-xl"
                        style={{
                            top: '100%',
                            marginTop: '0.2vw',
                            borderRadius: '0.66vw', // Rounded corners
                        }}
                    >
                        {displayOptions.map(opt => (
                            <div
                                key={opt.value}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className="w-full text-white cursor-pointer hover:bg-white/10 transition-colors"
                                style={{
                                    padding: '0.42vw 0.83vw', // Padding for text
                                    fontSize: '0.80vw', // Options text size (increased from 0.73vw)
                                    fontFamily: '"SF Pro Text", sans-serif'
                                }}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                )}
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

export const Tabs: React.FC<TabsProps & { className?: string; style?: React.CSSProperties }> = ({ tabs, activeTab, onTabChange, className, style }) => {
    return (
        <div className={`flex flex-row items-end ${className || ''}`} style={{ width: '100%', ...style }}>
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
                            backgroundColor: isActive ? '#5F00DB' : '#222222', // Active colored, inactive match table bg
                            borderRadius: `${toVw(12)} ${toVw(12)} 0px 0px`,
                        }}
                    >
                        <span
                            className="font-normal not-italic text-white"
                            style={{
                                fontFamily: '"Lato", sans-serif',
                                fontSize: toVw(16),
                                lineHeight: toVw(19),
                            }}
                        >
                            {tab.label}
                        </span>
                        {tab.count !== undefined && (
                            <div
                                className="flex flex-row justify-center items-center bg-[#FF4E4E]"
                                style={{
                                    minWidth: toVw(18),
                                    height: toVw(18),
                                    padding: `0px ${toVw(4)}`, // Correct padding
                                    gap: toVw(4),
                                    borderRadius: toVw(24),
                                }}
                            >
                                <span
                                    className="font-['SF_Pro_Text'] font-bold not-italic text-white text-center"
                                    style={{
                                        fontSize: toVw(12),
                                        lineHeight: toVw(14),
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
    hideHeaderBorder?: boolean;
}

export const TableFrame: React.FC<TableFrameProps> = ({ children, searchBar, filterBar, headerContent, className, hideHeaderBorder }) => {
    return (
        <div
            className={`flex flex-col items-start ${className || ''}`}
            style={{
                width: '100%',
                maxWidth: toVw(1520),
                background: '#222222',
                border: '1px solid rgba(102, 102, 102, 0.5)',
                borderRadius: toVw(16),
                overflow: 'hidden',
            }}
        >
            {/* Top Section */}
            {(searchBar || filterBar || headerContent) && (
                <div
                    className="flex flex-row items-center justify-between"
                    style={{
                        width: '100%',
                        height: '4.58vw', // Standardized Height 88px (16px top + 56px content + 16px bottom)
                        padding: '0 0.83vw', // 16px horizontal padding
                        gap: '0.66vw',
                        backgroundColor: '#1C1C1E', // Standardized Header BG
                        borderBottom: hideHeaderBorder ? 'none' : '1px solid rgba(102, 102, 102, 0.5)',
                    }}
                >
                    {/* Left: Search */}
                    {searchBar && (
                        <div className="shrink-0">
                            {searchBar}
                        </div>
                    )}

                    {/* Right: Filters & Extra Content */}
                    <div className="flex flex-row items-center gap-[0.66vw]">
                        {filterBar}
                        {headerContent}
                    </div>
                </div>
            )}

            {/* Main Table Content */}
            <div
                className="w-full relative flex-grow flex flex-col"
                style={{
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
                    ? 'bg-[#16003F] border border-[#5F00DB] text-white'
                    : 'bg-[#120D1D] text-white hover:bg-white/10'
                } not-italic`}
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
