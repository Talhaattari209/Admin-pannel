import React, { useState } from 'react';
import ExportDataCard from '../dashboard/ExportDataCard';

interface ExportModalProps {
  onCancel: () => void;
  onDownload: (config: any) => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ onCancel, onDownload }) => {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onCancel}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <ExportDataCard
          onDownload={onDownload}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default ExportModal;