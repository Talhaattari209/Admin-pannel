import React, { useState } from 'react';
import SystemLogsTable from './SystemLogsTable';
import PageHeader from '../shared/PageHeader';
import LogStats from './LogStats';
import ExportModal from '../../../src/components/shared/ExportModal';

const SystemLogsView: React.FC = () => {
  const [showExportModal, setShowExportModal] = useState(false);

  const exportAction = (
    <button
      className="flex flex-row items-center justify-center px-[2vw] py-[0.8vw] gap-3 border border-white rounded-[52px] backdrop-blur-[6px] transition-all hover:bg-white/10 active:scale-95 group shadow-lg text-[1vw]"
      onClick={() => setShowExportModal(true)}
    >
      <span className="text-white font-medium font-inter">Export</span>
      <svg viewBox="0 0 24 24" className="w-[1.2vw] h-[1.2vw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col w-full max-w-[95vw] mx-auto animate-in fade-in duration-500 overflow-x-hidden">
      <PageHeader
        title="System Logs"
        description="Monitor key admin activities, security events, and automated system actions."
        actions={exportAction}
      />

      <div className="mt-[2vw]">
        <LogStats />
      </div>

      <div className="w-full bg-[#222222] rounded-[16px] border border-white/5 shadow-2xl overflow-hidden mt-[1vw]">
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