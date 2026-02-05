import React, { useState } from 'react';
import TabGroup, { TabItem } from './shared/TabGroup';
import PromptsHeader from './PromptsHeader';
import SearchInput from './shared/SearchInput';
import FilterSelect from './shared/FilterSelect';
import PromptsTableRow, { PromptRowData } from './PromptsTableRow';
import { Pagination } from '@/components/shared/TableComponents';

// Modals
import AddPromptModal from './modals/AddPromptModal';
import EditPromptModal from './modals/EditPromptModal';
import DeletePromptModal from './modals/DeletePromptModal';
import PromptSuccessModal from './modals/PromptSuccessModal';

// Legal Content
import LegalTable from './legal/LegalTable';
import AddContentModal from './legal/modals/AddContentModal';
import EditContentModal from './legal/modals/EditContentModal';
import ContentDetailsModal from './legal/modals/ContentDetailsModal';

// FAQ Content
import FAQTable from './faq/FAQTable';
import AddFAQModal from './faq/modals/AddFAQModal';
import EditFAQModal from './faq/modals/EditFAQModal';
import FAQDetailsModal from './faq/modals/FAQDetailsModal';
import ExportModal from '@/components/shared/ExportModal';

const TABS: TabItem[] = [
    { id: 'individual', label: 'Individual Prompts', count: 4 },
    { id: 'group', label: 'Group Prompts', count: 4 },
    { id: 'legal', label: 'Legal Content', count: 2 },
    { id: 'faq', label: 'Frequently Asked Questions', count: 2 },
];

const INDIVIDUAL_MOCK_DATA: PromptRowData[] = [
    { id: '1', title: 'A perfect weekend for me looks like...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: '/8.png', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
    { id: '2', title: 'The most spontaneous thing I\'ve done...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: '/8.png', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
    { id: '3', title: 'My friends describe me as...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: '/8.png', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
    { id: '4', title: 'Two truths and a lie...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: '/8.png', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
];

const GROUP_MOCK_DATA: PromptRowData[] = [
    { id: '5', title: 'What I\'d bring to a group trip...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: '/8.png', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
    { id: '6', title: 'The fastest way to make me smile...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: '/8.png', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
    { id: '7', title: 'How my group describes me in one word...', status: 'Published', updatedBy: { name: 'John Doe', role: 'Moderator', avatar: '/8.png', email: 'john@fennec.com' }, lastUpdated: 'Dec 31, 2025 • 11:59 PM' },
];

const PromptsTable: React.FC = () => {
    const [activeTab, setActiveTab] = useState('individual');
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('Published');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeModal, setActiveModal] = useState<any>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<any | null>(null);

    const isLegalTab = activeTab === 'legal';
    const isFAQTab = activeTab === 'faq';

    const ColumnHeader = ({ label, sortable = true, width = "auto", grow = false }: { label: string, sortable?: boolean, width?: string, grow?: boolean }) => (
        <div className={`flex flex-row items-center gap-[0.42vw] px-[0.63vw] h-full group cursor-pointer ${grow ? 'flex-grow min-w-0' : 'shrink-0'}`} style={{ width: !grow ? width : undefined }}>
            <span className="text-[#AAAAAA] font-sans not-italic font-medium not-italic text-[0.63vw] opacity-100 group-hover:text-white transition-colors truncate">
                {label}
            </span>
            {sortable && (
                <img
                    src="/assets/chevron_up_down.png"
                    alt="Sort"
                    style={{ width: '0.73vw', height: '0.73vw', margin: '-0.21vw 0px' }}
                    className="shrink-0 opacity-100"
                />
            )}
        </div>
    );

    const handleEdit = (data: any) => {
        setSelectedPrompt(data);
        setActiveModal('EDIT');
    };

    const handleViewDetails = (data: any) => {
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
            <div className="flex flex-col min-h-[20.83vw]">
                {currentData.map((row) => (
                    <PromptsTableRow key={row.id} data={row} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>
        );
    };

    // Define Headers based on active tab to match the column widths perfectly
    const renderHeaders = () => {
        // For Legal and FAQ, we have 45.42vw / 10.42 / 10.42 / 10.42 / 2.5
        // For Prompts, we used 9.38 / 10.42 / 11.46 / 2.5. 
        // I'll standardize PromptsTableRow to also use 10.42 for Status/Updated/Date to be consistent if possible, 
        // but if not, I'll switch header logic here.
        // Let's stick to the Legal/FAQ widths for now since they are the focus.

        const statusWidth = (isLegalTab || isFAQTab) ? "10.42vw" : "9.38vw";
        const updatedByWidth = (isLegalTab || isFAQTab) ? "10.42vw" : "10.42vw";
        const lastUpdatedWidth = (isLegalTab || isFAQTab) ? "10.42vw" : "11.46vw";

        return (
            <>
                <ColumnHeader label={isFAQTab ? "Question" : "Title / Description"} grow />
                <ColumnHeader label="Status" width={statusWidth} />
                <ColumnHeader label="Updated By" width={updatedByWidth} />
                <ColumnHeader label="Last Updated" width={lastUpdatedWidth} />
                <div className="w-[2.5vw] shrink-0" />
            </>
        );
    };

    return (
        <div className="flex flex-col w-full max-w-[79.17vw] mx-auto relative animate-in fade-in duration-700">

            {/* --- Modals --- */}
            {activeModal && (
                <>
                    {activeModal === 'ADD' && (isFAQTab ? <AddFAQModal onCancel={() => setActiveModal(null)} onAdd={() => setActiveModal('SUCCESS_FAQ_ADD')} /> : isLegalTab ? <AddContentModal onCancel={() => setActiveModal(null)} onAdd={() => setActiveModal('SUCCESS_CONTENT_ADD')} /> : <AddPromptModal onCancel={() => setActiveModal(null)} onAdd={() => setActiveModal('SUCCESS_ADD')} />)}

                    {activeModal === 'EDIT' && selectedPrompt && (
                        isFAQTab ? <EditFAQModal initialQuestion={selectedPrompt.question || selectedPrompt.title} initialAnswer={selectedPrompt.answerSnippet || selectedPrompt.fullContent || ''} onCancel={() => setActiveModal(null)} onUpdate={() => setActiveModal('SUCCESS_FAQ_EDIT')} /> :
                            isLegalTab ? <EditContentModal initialTitle={selectedPrompt.title} initialContent={selectedPrompt.description || selectedPrompt.fullContent || ''} onCancel={() => setActiveModal(null)} onUpdate={() => setActiveModal('SUCCESS_CONTENT_EDIT')} /> :
                                <EditPromptModal initialValue={selectedPrompt.title} onCancel={() => setActiveModal(null)} onUpdate={() => setActiveModal('SUCCESS_EDIT')} />
                    )}

                    {activeModal === 'DETAILS' && selectedPrompt && (
                        isFAQTab ? <FAQDetailsModal question={selectedPrompt.question || selectedPrompt.title} answer={selectedPrompt.answerSnippet || selectedPrompt.fullContent || ''} onClose={() => setActiveModal(null)} /> :
                            <ContentDetailsModal title={selectedPrompt.title} content={selectedPrompt.description || selectedPrompt.fullContent || ''} onClose={() => setActiveModal(null)} />
                    )}

                    {activeModal === 'DELETE' && <DeletePromptModal onCancel={() => setActiveModal(null)} onDelete={() => setActiveModal('SUCCESS_DELETE')} />}

                    {activeModal === 'SUCCESS_ADD' && <PromptSuccessModal title="New Prompt Added" onDone={() => setActiveModal(null)} />}
                    {activeModal === 'SUCCESS_EDIT' && <PromptSuccessModal title="Prompt Updated" onDone={() => setActiveModal(null)} />}
                    {activeModal === 'SUCCESS_DELETE' && <PromptSuccessModal title="Item Deleted" onDone={() => setActiveModal(null)} />}

                    {(activeModal === 'SUCCESS_FAQ_ADD' || activeModal === 'SUCCESS_CONTENT_ADD') && <PromptSuccessModal title="Content Added" onDone={() => setActiveModal(null)} />}
                    {(activeModal === 'SUCCESS_FAQ_EDIT' || activeModal === 'SUCCESS_CONTENT_EDIT') && <PromptSuccessModal title="Content Updated" onDone={() => setActiveModal(null)} />}

                    {activeModal === 'EXPORT' && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                            <ExportModal
                                onCancel={() => setActiveModal(null)}
                                onDownload={(config) => {
                                    console.log('Exporting', config);
                                    setActiveModal(null);
                                }}
                            />
                        </div>
                    )}
                </>
            )}

            <PromptsHeader onAddPrompt={() => setActiveModal('ADD')} onExport={() => setActiveModal('EXPORT')} addLabel={isFAQTab ? 'Add FAQ' : isLegalTab ? 'Add Content' : 'Add Prompt'} />

            <div className="flex flex-col w-full gap-0">
                <TabGroup tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
                <div className="flex flex-col bg-[#222222] rounded-b-[0.83vw] rounded-tr-[0.83vw] overflow-hidden border border-white/5 shadow-2xl">
                    {/* Controls */}
                    <div className="flex flex-row items-center justify-between p-[0.83vw] gap-[0.83vw] bg-[#1a1a1a]/30">
                        <SearchInput value={search} onChange={setSearch} />
                        <FilterSelect label="Status" value={status} options={['Published', 'Draft', 'Archived']} onChange={setStatus} />
                    </div>

                    {/* Header Row */}
                    <div className="flex flex-row items-center w-full h-[2.5vw] bg-[#1C1C1E] border-b border-[#333333] shrink-0 mt-0">
                        {renderHeaders()}
                    </div>

                    {/* Content Rows */}
                    <div className="flex flex-col w-full">
                        {renderTableContent()}
                    </div>

                    {/* Gap */}
                    <div className="w-full h-[2.60vw]" />

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={setCurrentPage}
                        className="w-full px-[1.25vw] pb-[1.25vw]"
                    />
                </div>
            </div>
        </div>
    );
};

export default PromptsTable;
