
import React, { useState } from 'react';
import SystemLogsTable from './SystemLogsTable';
import ExportModal from '../shared/ExportModal';
import { Button } from '../shared/Button';

const SystemLogsView: React.FC = () => {
    const [showExportModal, setShowExportModal] = useState(false);

    return (
        <div className="flex flex-col w-full h-full animate-in fade-in duration-500 overflow-x-hidden  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Header matching page header_css.txt */}
            <div className="flex flex-row items-end p-0 gap-[0.83vw] w-[79.17vw] h-[4.17vw] flex-none order-0 flex-grow-0">
                {/* Text */}
                <div className="flex flex-col justify-center items-start p-0 gap-[0.83vw] flex-1 h-[4.17vw] order-0">
                    {/* System Logs Title */}
                    <div className="w-[71.30vw] h-[2.08vw]  font-bold text-[1.875vw] leading-[110%] flex items-center tracking-[-0.04em] text-white flex-none order-1 self-stretch flex-grow-0">
                        System Logs
                    </div>
                    {/* Description */}
                    <div className="w-[71.30vw] h-[1.25vw]  font-normal text-[0.83vw] leading-[150%] flex items-center text-[#CCCCCC] flex-none order-2 self-stretch flex-grow-0">
                        Monitor key admin activities, security events, and automated system actions.
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row items-center p-0 gap-[0.83vw] w-[7.03vw] h-[2.92vw] flex-none order-1 flex-grow-0 mr-[1.04vw]">
                    {/* Button - Export */}
                    <button
                        onClick={() => setShowExportModal(true)}
                        className="box-border flex flex-row justify-center items-center px-[1.25vw] py-[0.83vw] gap-[0.625vw] w-[7.03vw] h-[2.92vw] border border-white backdrop-blur-[6px] rounded-[2.71vw] flex-none order-0 flex-grow-0 drop-shadow-[0px_12px_40px_rgba(0,0,0,0.05)]"
                    >
                        <span className="w-[2.66vw] h-[1.25vw]  font-medium text-[0.83vw] leading-[1.25vw] flex items-end text-center text-white flex-none order-1 flex-grow-0">
                            Export
                        </span>
                        {/* Download Icon */}
                        <div className="w-[1.25vw] h-[1.25vw] flex-none order-2 flex-grow-0">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-full h-full'>
                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            {/* Gap between Stats and Table: 1.25vw - Adjusted top margin since Stats are gone */}
            <div className="w-full mt-[1.25vw]">
                <SystemLogsTable />
            </div>

            <div className="h-[5vw]" />

            {/* Modals */}
            {showExportModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <ExportModal
                        onCancel={() => setShowExportModal(false)}
                        onDownload={(config) => {
                            console.log('Exporting', config);
                            setShowExportModal(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default SystemLogsView;
