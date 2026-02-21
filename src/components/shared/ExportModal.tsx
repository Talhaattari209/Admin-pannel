import React from 'react';
import ExportDataCard from '../dashboard/ExportDataCard';
import PopCardWrapper from '../pop-cards/PopCardWrapper';

interface ExportModalProps {
  onCancel: () => void;
  onDownload: (config: any) => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ onCancel, onDownload }) => {
  return (
    <PopCardWrapper onClose={onCancel}>
      <ExportDataCard
        onDownload={onDownload}
        onCancel={onCancel}
      />
    </PopCardWrapper>
  );
};

export default ExportModal;