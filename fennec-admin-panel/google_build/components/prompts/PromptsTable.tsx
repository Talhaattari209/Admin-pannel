import React, { useState } from 'react';
import TabGroup from '../shared/TabGroup';
import PromptsHeader from './PromptsHeader';
import SearchInput from '../shared/SearchInput';
import FilterSelect from '../shared/FilterSelect';
import PromptsTableRow, { PromptRowData } from './PromptsTableRow';

// Modals
import AddPromptModal from './modals/AddPromptModal';
import EditPromptModal from './modals/EditPromptModal';
import DeletePromptModal from './modals/DeletePromptModal';
import PromptSuccessModal from './modals/PromptSuccessModal';

// Legal Content
import LegalTable from '../legal/LegalTable';
import AddContentModal from '../legal/modals/AddContentModal';
import EditContentModal from '../legal/modals/EditContentModal';
import ContentDetailsModal from '../legal/modals/ContentDetailsModal';

// FAQ Content
import FAQTable from '../faq/FAQTable';
import AddFAQModal from '../faq/modals/AddFAQModal';
import EditFAQModal from '../faq/modals/EditFAQModal';
import FAQDetailsModal from '../faq/modals/FAQDetailsModal';

const TABS = [
  { id: 'individual', label: 'Individual Prompts', count: 4 },
  { id: 'group', label: 'Group Prompts', count: 4 },
  { id: 'legal', label: 'Legal Content', count: 2 },
  { id: 'faq', label: 'Frequently Asked Questions', count: 2 },
];

const INDIVIDUAL_MOCK_DATA: PromptRowData[] = [
  { id: '1', title: 'A perfect weekend for me looks like...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: 'https://i.pravatar.cc/150?u=john', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
  { id: '2', title: 'The most spontaneous thing I\'ve done...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: 'https://i.pravatar.cc/150?u=jane', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
  { id: '3', title: 'My friends describe me as...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: 'https://i.pravatar.cc/150?u=jess', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
  { id: '4', title: 'Two truths and a lie...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: 'https://i.pravatar.cc/150?u=jack', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
];

const GROUP_MOCK_DATA: PromptRowData[] = [
  { id: '5', title: 'What I\'d bring to a group trip...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: 'https://i.pravatar.cc/150?u=joe', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
  { id: '6', title: 'The fastest way to make me smile...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: 'https://i.pravatar.cc/150?u=bob', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
  { id: '7', title: 'How my group describes me in one word...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: 'https://i.pravatar.cc/150?u=sam', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
];

const PromptsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Published');
  const [activeModal, setActiveModal] = useState<any>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptRowData | null>(null);

  const isLegalTab = activeTab === 'legal';
  const isFAQTab = activeTab === 'faq';

  const ColumnHeader = ({ label, sortable = true, width = "auto", grow = false }: { label: string, sortable?: boolean, width?: string, grow?: boolean }) => (
    <div className={`flex flex-row items-center gap-2 px-3 h-[38px] group cursor-pointer ${grow ? 'flex-grow min-w-0' : 'shrink-0'}`} style={{ width: !grow ? width : undefined }}>
      <span className="text-white text-[12px] font-normal uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity font-inter truncate">
        {label}
      </span>
      {sortable && (
        <div className="flex flex-col opacity-30 group-hover:opacity-100 transition-opacity shrink-0">
          <svg viewBox="0 0 10 6" className="w-[10px] h-[6px] rotate-180" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
          <svg viewBox="0 0 10 6" className="w-[10px] h-[6px]" fill="currentColor"><path d="M5 0L0 5H10L5 0Z"/></svg>
        </div>
      )}
    </div>
  );

  const handleEdit = (data: PromptRowData) => {
    setSelectedPrompt(data);
    setActiveModal('EDIT');
  };

  const handleViewDetails = (data: PromptRowData) => {
    setSelectedPrompt(data);
    setActiveModal('DETAILS');
  };

  const handleDelete = (id: string) => {
    setActiveModal('DELETE');
  };

  const renderTableContent = () => {
    if (activeTab === 'legal') return <LegalTable onEdit={handleEdit} onDelete={handleDelete} onViewDetails={handleViewDetails} />;
    if (activeTab === 'faq') return <FAQTable onEdit={handleEdit} onDelete={handleDelete} onViewDetails={handleViewDetails} />;

    const currentData = activeTab === 'individual' ? INDIVIDUAL_MOCK_DATA : GROUP_MOCK_DATA;
    return (
      <div className="flex flex-col min-h-[400px]">
        {currentData.map((row) => (
          <PromptsTableRow key={row.id} data={row} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-[1520px] mx-auto p-[2vw] relative animate-in fade-in duration-700">
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="animate-in zoom-in-95 duration-300 max-h-screen overflow-y-auto p-4 flex items-center justify-center no-scrollbar">
             {activeModal === 'ADD' && (isFAQTab ? <AddFAQModal onCancel={() => setActiveModal(null)} onAdd={() => setActiveModal('SUCCESS_FAQ_ADD')} /> : isLegalTab ? <AddContentModal onCancel={() => setActiveModal(null)} onAdd={() => setActiveModal('SUCCESS_CONTENT_ADD')} /> : <AddPromptModal onCancel={() => setActiveModal(null)} onAdd={() => setActiveModal('SUCCESS_ADD')} />)}
             {activeModal === 'EDIT' && selectedPrompt && (isFAQTab ? <EditFAQModal initialQuestion={selectedPrompt.title} initialAnswer={selectedPrompt.fullContent || ''} onCancel={() => setActiveModal(null)} onUpdate={() => setActiveModal('SUCCESS_FAQ_EDIT')} /> : isLegalTab ? <EditContentModal initialTitle={selectedPrompt.title} initialContent={selectedPrompt.fullContent || ''} onCancel={() => setActiveModal(null)} onUpdate={() => setActiveModal('SUCCESS_CONTENT_EDIT')} /> : <EditPromptModal initialValue={selectedPrompt.title} onCancel={() => setActiveModal(null)} onUpdate={() => setActiveModal('SUCCESS_EDIT')} />)}
             {activeModal === 'DETAILS' && selectedPrompt && (isFAQTab ? <FAQDetailsModal question={selectedPrompt.title} answer={selectedPrompt.fullContent || ''} onClose={() => setActiveModal(null)} /> : <ContentDetailsModal title={selectedPrompt.title} content={selectedPrompt.fullContent || ''} onClose={() => setActiveModal(null)} />)}
             {activeModal === 'DELETE' && <DeletePromptModal onCancel={() => setActiveModal(null)} onDelete={() => setActiveModal('SUCCESS_DELETE')} />}
             {activeModal === 'SUCCESS_ADD' && <PromptSuccessModal title="New Prompt Added" onDone={() => setActiveModal(null)} />}
             {activeModal === 'SUCCESS_EDIT' && <PromptSuccessModal title="Prompt Updated" onDone={() => setActiveModal(null)} />}
             {activeModal === 'SUCCESS_DELETE' && <PromptSuccessModal title="Item Deleted" onDone={() => setActiveModal(null)} />}
          </div>
        </div>
      )}

      <PromptsHeader onAddPrompt={() => setActiveModal('ADD')} onExport={() => setActiveModal('EXPORT')} addLabel={isFAQTab ? 'Add FAQ' : isLegalTab ? 'Add Content' : 'Add Content'} />

      <div className="flex flex-col w-full gap-0">
        <TabGroup tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
        <div className="flex flex-col bg-[#222222] rounded-b-[16px] rounded-tr-[16px] overflow-hidden border border-white/5 shadow-2xl">
          <div className="flex flex-row items-center justify-between p-4 gap-4 bg-[#1a1a1a]/30">
            <SearchInput value={search} onChange={setSearch} />
            <FilterSelect label="Status" value={status} options={['Published', 'Draft', 'Archived']} onChange={setStatus} />
          </div>

          <div className="flex flex-row items-center w-full border-b border-white/10 bg-[#1a1a1a]/50 shrink-0">
            <ColumnHeader label="Title" grow />
            <ColumnHeader label="Status" width="180px" />
            <ColumnHeader label="Updated By" width="200px" />
            <ColumnHeader label="Last Updated" width="220px" />
            <div className="w-[48px] shrink-0" />
          </div>

          {renderTableContent()}
        </div>
      </div>
    </div>
  );
};

export default PromptsTable;