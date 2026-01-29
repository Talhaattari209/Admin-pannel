import React from 'react';
import StatusBadge from '../shared/StatusBadge';

interface Transaction {
  id: string;
  type: string;
  amount: string;
  status: 'Successful' | 'Failed';
  timestamp: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'Premium Subscription', amount: '$29.99', status: 'Successful', timestamp: 'Dec 31, 2025 • 11:59 PM' },
  { id: 't2', type: '10 Pokes Pack', amount: '$11.99', status: 'Successful', timestamp: 'Dec 31, 2025 • 11:59 PM' },
  { id: 't3', type: 'Premium Subscription', amount: '$29.99', status: 'Failed', timestamp: 'Dec 31, 2025 • 11:59 PM' }
];

const ProfileSubscriptionContent: React.FC = () => {
  const ColumnHeader = ({ label, width = "auto" }: { label: string, width?: string }) => (
    <div className={`flex flex-row items-center gap-2 px-3 h-[38px] group cursor-pointer`} style={{ width }}>
      <span className="text-white text-[12px] font-normal uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity font-inter">
        {label}
      </span>
      <div className="flex flex-col opacity-20 group-hover:opacity-100 transition-opacity shrink-0">
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px] rotate-180" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
        <svg viewBox="0 0 10 6" className="w-[10px] h-[6px]" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-start gap-8 w-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 w-full border-b border-white/10 pb-6">
        <h3 className="text-white text-[28px] font-bold font-inter leading-tight">Subscription & Payments</h3>
        <p className="text-[#CCCCCC] text-[16px] opacity-60 font-inter">Shows the user’s premium subscription status, poke pack purchases, renewal logs, and transaction history.</p>
      </div>

      <div className="flex flex-row items-center p-4 h-[88px] w-full bg-gradient-to-b from-[#16003F] to-[#111111] border border-white/10 rounded-[16px] gap-4 shadow-xl shrink-0">
        <div className="flex-grow"><h4 className="text-white text-[24px] font-bold tracking-tight font-inter">Fennec Premium</h4></div>
        <div className="flex flex-row gap-4 shrink-0">
          <div className="flex flex-col w-[240px]">
            <span className="text-white text-[16px] font-inter opacity-60 leading-none mb-2">Premium User Since</span>
            <span className="text-white text-[16px] font-inter leading-none">October 25, 2024</span>
          </div>
          <div className="flex flex-col w-[240px]">
            <span className="text-white text-[16px] font-inter opacity-60 leading-none mb-2">Next Billing Date</span>
            <span className="text-white text-[16px] font-inter leading-none">November 25, 2025</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#111111] border border-[#666666]/50 rounded-[16px] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex flex-row items-center w-full h-[38px] bg-[#222222]/50 border-b border-white/10">
          <ColumnHeader label="Type" width="276px" />
          <ColumnHeader label="Amount" width="276px" />
          <ColumnHeader label="Status" width="276px" />
          <ColumnHeader label="Timestamp" width="276px" />
        </div>

        <div className="flex flex-col">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex flex-row items-center w-full h-[56px] border-b border-[#666666]/20 bg-[#111111] hover:bg-white/[0.02] transition-colors shrink-0">
              <div className="w-[276px] px-3 text-white text-[14px] font-inter truncate shrink-0">{tx.type}</div>
              <div className="w-[276px] px-3 text-white text-[14px] font-inter shrink-0">{tx.amount}</div>
              <div className="w-[276px] px-3 flex items-center shrink-0"><StatusBadge status={tx.status} size="sm" /></div>
              <div className="w-[276px] px-3 flex items-center gap-2 shrink-0">
                <span className="text-white text-[14px] font-inter">{tx.timestamp.split(' • ')[0]}</span>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-white text-[14px] font-inter opacity-60">{tx.timestamp.split(' • ')[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSubscriptionContent;