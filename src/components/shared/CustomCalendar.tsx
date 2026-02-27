import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface CustomCalendarProps {
    selectedDate: string; // ISO string YYYY-MM-DD
    onSelect: (date: string) => void;
    onClose: () => void;
    className?: string;
}

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Helper to convert px to vw (based on 1920px design)
const pxToVw = (px: number) => `${(px / 1920) * 100}vw`;

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDate, onSelect, onClose, className }) => {
    const initialDate = selectedDate ? new Date(selectedDate) : new Date();
    const [viewDate, setViewDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
    const [showMonthSelect, setShowMonthSelect] = useState(false);
    const [showYearSelect, setShowYearSelect] = useState(false);

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    const years = useMemo(() => {
        const startYear = 2020;
        const endYear = 2030;
        const list = [];
        for (let i = startYear; i <= endYear; i++) list.push(i);
        return list;
    }, []);

    const daysInMonth = useMemo(() => {
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

        const days = [];
        // Padding from previous month
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({ day: prevMonthLastDay - i, currentMonth: false, fullDate: new Date(currentYear, currentMonth - 1, prevMonthLastDay - i) });
        }

        // Current month days
        for (let i = 1; i <= lastDayOfMonth; i++) {
            days.push({ day: i, currentMonth: true, fullDate: new Date(currentYear, currentMonth, i) });
        }

        // Padding for next month
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({ day: i, currentMonth: false, fullDate: new Date(currentYear, currentMonth + 1, i) });
        }

        return days;
    }, [currentYear, currentMonth]);

    const handlePrevMonth = () => {
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const isSelected = (date: Date) => {
        if (!selectedDate) return false;
        const d = new Date(selectedDate);
        return d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate();
    };

    const handleDateClick = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
        onSelect(adjustedDate.toISOString().split('T')[0]);
        onClose();
    };

    return (
        <div
            className={`absolute z-[100] flex flex-col items-start bg-[#222222] shadow-[0px_0px_2.4vw_rgba(0,0,0,0.5)] rounded-[0.83vw] overflow-hidden ${className || ''}`}
            style={{
                width: pxToVw(304),
                height: pxToVw(333),
                padding: `${pxToVw(16)} ${pxToVw(8)} ${pxToVw(8)}`,
                gap: pxToVw(16),
            }}
        >
            {/* Header */}
            <div className="flex flex-row justify-between items-center w-full" style={{ height: pxToVw(32) }}>
                <button onClick={handlePrevMonth} className="text-white p-[0.42vw] hover:bg-white/10 rounded-[0.31vw] transition-colors cursor-pointer">
                    <ChevronLeft style={{ width: pxToVw(16), height: pxToVw(16) }} />
                </button>

                <div className="flex flex-row gap-[0.31vw] items-center">
                    {/* Month Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => { setShowMonthSelect(!showMonthSelect); setShowYearSelect(false); }}
                            className="flex flex-row items-center px-[0.42vw] gap-[0.21vw] border border-[rgba(68,68,68,0.5)] rounded-[0.31vw] bg-transparent text-white cursor-pointer hover:bg-white/5"
                            style={{ height: pxToVw(32), width: pxToVw(65) }}
                        >
                            <span className="font-medium text-[0.73vw] leading-[1.04vw]">{MONTHS[currentMonth]}</span>
                            <ChevronDown style={{ width: pxToVw(12), height: pxToVw(12) }} />
                        </button>
                        {showMonthSelect && (
                            <div className="absolute top-[110%] left-0 w-full bg-[#333333] border border-white/10 rounded-[0.31vw] z-[110] max-h-[10.42vw] overflow-y-auto">
                                {MONTHS.map((m, idx) => (
                                    <div
                                        key={m}
                                        onClick={() => { setViewDate(new Date(currentYear, idx, 1)); setShowMonthSelect(false); }}
                                        className="px-[0.42vw] py-[0.21vw] text-[0.73vw] text-white hover:bg-white/10 cursor-pointer"
                                    >
                                        {m}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Year Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => { setShowYearSelect(!showYearSelect); setShowMonthSelect(false); }}
                            className="flex flex-row items-center px-[0.42vw] gap-[0.21vw] border border-[rgba(68,68,68,0.5)] rounded-[0.31vw] bg-transparent text-white cursor-pointer hover:bg-white/5"
                            style={{ height: pxToVw(32), width: pxToVw(75) }}
                        >
                            <span className="font-medium text-[0.73vw] leading-[1.04vw]">{currentYear}</span>
                            <ChevronDown style={{ width: pxToVw(12), height: pxToVw(12) }} />
                        </button>
                        {showYearSelect && (
                            <div className="absolute top-[110%] left-0 w-full bg-[#333333] border border-white/10 rounded-[0.31vw] z-[110] max-h-[10.42vw] overflow-y-auto">
                                {years.map(y => (
                                    <div
                                        key={y}
                                        onClick={() => { setViewDate(new Date(y, currentMonth, 1)); setShowYearSelect(false); }}
                                        className="px-[0.42vw] py-[0.21vw] text-[0.73vw] text-white hover:bg-white/10 cursor-pointer"
                                    >
                                        {y}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button onClick={handleNextMonth} className="text-white p-[0.42vw] hover:bg-white/10 rounded-[0.31vw] transition-colors cursor-pointer">
                    <ChevronRight style={{ width: pxToVw(16), height: pxToVw(16) }} />
                </button>
            </div>

            {/* Week Days */}
            <div className="flex flex-row w-full text-center" style={{ height: pxToVw(21), padding: `0 ${pxToVw(8)}` }}>
                {WEEK_DAYS.map(day => (
                    <div key={day} className="flex-1 text-[#CCCCCC] font-normal text-[0.625vw] leading-[0.83vw]">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 w-full gap-y-[0.42vw]" style={{ padding: `0 ${pxToVw(8)}` }}>
                {daysInMonth.map((item, idx) => {
                    const active = isSelected(item.fullDate);
                    return (
                        <div key={idx} className="flex justify-center items-center">
                            <button
                                onClick={() => handleDateClick(item.fullDate)}
                                className={`flex items-center justify-center rounded-full transition-all cursor-pointer ${active
                                        ? 'bg-[#5F00DB] text-white'
                                        : item.currentMonth
                                            ? 'text-white hover:bg-white/5'
                                            : 'text-[#444444] hover:bg-white/5'
                                    }`}
                                style={{
                                    width: pxToVw(32),
                                    height: pxToVw(32),
                                    fontSize: pxToVw(14),
                                    fontWeight: active ? 500 : 400
                                }}
                            >
                                {item.day}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomCalendar;
