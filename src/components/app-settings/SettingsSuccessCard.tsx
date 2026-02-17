
import React from 'react';
import SuccessCardTitleOnly from '@/components/pop-cards/SuccessCardTitleOnly';

interface SettingsSuccessCardProps {
  onDone: () => void;
}

const SettingsSuccessCard: React.FC<SettingsSuccessCardProps> = ({ onDone }) => {
  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <SuccessCardTitleOnly
        title="App Settings Updated"
        onDone={onDone}
      />
    </div>
  );
};

export default SettingsSuccessCard;
