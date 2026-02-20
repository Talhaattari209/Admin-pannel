import React, { useState, useMemo } from 'react';
import TabGroup, { TabItem } from './shared/TabGroup';
import PromptsHeader from './PromptsHeader';
import SearchInput from './shared/SearchInput';
import { Pagination, FilterSelect } from '@/components/shared/TableComponents';
import PromptsTableRow, { PromptRowData } from './PromptsTableRow';

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

// API Hooks
import {
    useIndividualPrompts, useCreateIndividualPrompt, useUpdateIndividualPrompt, useDeleteIndividualPrompt,
    useGroupPrompts, useCreateGroupPrompt, useUpdateGroupPrompt, useDeleteGroupPrompt,
    useLegalContents, useCreateLegalContent, useUpdateLegalContent, useDeleteLegalContent,
    useFAQs, useCreateFAQ, useUpdateFAQ, useDeleteFAQ,
} from '@/services/app-content';

const PromptsTable: React.FC = () => {
    const [activeTab, setActiveTab] = useState('individual');
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeModal, setActiveModal] = useState<any>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<any | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string>('');

    const isLegalTab = activeTab === 'legal';
    const isFAQTab = activeTab === 'faq';

    // Build query params
    const queryParams = useMemo(() => {
        const p: { page?: number; limit?: number; search?: string; status?: string } = { page: currentPage, limit: 10 };
        if (search) p.search = search;
        if (status) p.status = status.toLowerCase();
        return p;
    }, [currentPage, search, status]);

    // ---------- Data queries ----------
    const individualQuery = useIndividualPrompts(activeTab === 'individual' ? queryParams : undefined);
    const groupQuery = useGroupPrompts(activeTab === 'group' ? queryParams : undefined);
    const legalQuery = useLegalContents(activeTab === 'legal' ? queryParams : undefined);
    const faqQuery = useFAQs(activeTab === 'faq' ? queryParams : undefined);

    // ---------- Mutations ----------
    const createIndividual = useCreateIndividualPrompt();
    const updateIndividual = useUpdateIndividualPrompt();
    const deleteIndividual = useDeleteIndividualPrompt();

    const createGroup = useCreateGroupPrompt();
    const updateGroup = useUpdateGroupPrompt();
    const deleteGroup = useDeleteGroupPrompt();

    const createLegal = useCreateLegalContent();
    const updateLegal = useUpdateLegalContent();
    const deleteLegal = useDeleteLegalContent();

    const createFAQ = useCreateFAQ();
    const updateFAQ = useUpdateFAQ();
    const deleteFAQ = useDeleteFAQ();

    // ---------- Resolve active query ----------
    const activeQuery = activeTab === 'individual' ? individualQuery
        : activeTab === 'group' ? groupQuery
            : activeTab === 'legal' ? legalQuery
                : faqQuery;

    const totalPages = activeQuery.data?.pages || 1;

    // Tab items with live counts
    const TABS: TabItem[] = [
        { id: 'individual', label: 'Individual Prompts', count: individualQuery.data?.total ?? 0 },
        { id: 'group', label: 'Group Prompts', count: groupQuery.data?.total ?? 0 },
        { id: 'legal', label: 'Legal Content', count: legalQuery.data?.total ?? 0 },
        { id: 'faq', label: 'Frequently Asked Questions', count: faqQuery.data?.total ?? 0 },
    ];

    // Reset page when tab changes
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setCurrentPage(1);
        setSearch('');
        setStatus('');
    };

    // ---------- Map API data → row format ----------
    const mapPromptToRow = (p: any): PromptRowData => ({
        id: p.id,
        title: p.title,
        status: p.status === 'published' ? 'Published' : 'Draft',
        updatedBy: { name: p.updatedBy || p.addedBy || '—', role: '', avatar: '/8.png', email: '' },
        lastUpdated: new Date(p.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' • ' + new Date(p.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    });

    // ---------- Column header ----------
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

    // ---------- Action handlers ----------
    const handleEdit = (data: any) => {
        setSelectedPrompt(data);
        setSelectedItemId(data.id);
        setActiveModal('EDIT');
    };

    const handleViewDetails = (data: any) => {
        setSelectedPrompt(data);
        setActiveModal('DETAILS');
    };

    const handleDelete = (id: string) => {
        setSelectedItemId(id);
        setActiveModal('DELETE');
    };

    // ---------- Mutation callbacks ----------
    const handleAddPrompt = (value: string) => {
        const payload = { title: value, status: 'published' };
        const mutation = activeTab === 'individual' ? createIndividual : createGroup;
        mutation.mutate(payload, { onSuccess: () => setActiveModal('SUCCESS_ADD') });
    };

    const handleEditPrompt = (value: string) => {
        // status must be included in PUT body (Postman requirement)
        const payload = { title: value, status: (selectedPrompt?.status || 'published').toLowerCase() };
        const mutation = activeTab === 'individual' ? updateIndividual : updateGroup;
        mutation.mutate({ id: selectedItemId, data: payload }, { onSuccess: () => setActiveModal('SUCCESS_EDIT') });
    };

    const handleDeleteItem = () => {
        if (isFAQTab) {
            deleteFAQ.mutate(selectedItemId, { onSuccess: () => setActiveModal('SUCCESS_DELETE') });
        } else if (isLegalTab) {
            deleteLegal.mutate(selectedItemId, { onSuccess: () => setActiveModal('SUCCESS_DELETE') });
        } else if (activeTab === 'group') {
            deleteGroup.mutate(selectedItemId, { onSuccess: () => setActiveModal('SUCCESS_DELETE') });
        } else {
            deleteIndividual.mutate(selectedItemId, { onSuccess: () => setActiveModal('SUCCESS_DELETE') });
        }
    };

    const handleAddLegalContent = (title: string, content: string) => {
        createLegal.mutate({ title, content, status: 'draft' }, { onSuccess: () => setActiveModal('SUCCESS_CONTENT_ADD') });
    };

    const handleEditLegalContent = (title: string, content: string) => {
        // status must be included in PUT body (Postman requirement)
        const currentStatus = (selectedPrompt?.status || 'draft').toLowerCase();
        updateLegal.mutate({ id: selectedItemId, data: { title, content, status: currentStatus } }, { onSuccess: () => setActiveModal('SUCCESS_CONTENT_EDIT') });
    };

    const handleAddFAQ = (question: string, answer: string) => {
        createFAQ.mutate({ question, answer, status: 'published' }, { onSuccess: () => setActiveModal('SUCCESS_FAQ_ADD') });
    };

    const handleEditFAQ = (question: string, answer: string) => {
        // status must be included in PUT body (Postman requirement)
        const currentStatus = (selectedPrompt?.status || 'published').toLowerCase();
        updateFAQ.mutate({ id: selectedItemId, data: { question, answer, status: currentStatus } }, { onSuccess: () => setActiveModal('SUCCESS_FAQ_EDIT') });
    };

    // ---------- Loading / Error / Empty states ----------
    const renderLoadingState = () => (
        <div className="flex items-center justify-center w-full h-[10vw]">
            <div className="flex flex-col items-center gap-[0.83vw]">
                <div className="w-[2vw] h-[2vw] border-2 border-white/20 border-t-[#5F00DB] rounded-full animate-spin" />
                <span className="text-white/40 text-[0.73vw]">Loading...</span>
            </div>
        </div>
    );

    const renderErrorState = () => (
        <div className="flex items-center justify-center w-full h-[10vw]">
            <div className="flex flex-col items-center gap-[0.83vw]">
                <span className="text-[#FF4E4E] text-[0.83vw]">Failed to load data</span>
                <button onClick={() => activeQuery.refetch()} className="text-[#5F00DB] text-[0.73vw] underline cursor-pointer">Retry</button>
            </div>
        </div>
    );

    const renderEmptyState = () => (
        <div className="flex items-center justify-center w-full h-[10vw]">
            <span className="text-white/40 text-[0.73vw]">No items found</span>
        </div>
    );

    // ---------- Table content ----------
    const renderTableContent = () => {
        if (activeQuery.isLoading) return renderLoadingState();
        if (activeQuery.isError) return renderErrorState();

        if (activeTab === 'legal') {
            const data = legalQuery.data?.data || [];
            if (data.length === 0) return renderEmptyState();
            return <LegalTable data={data} onEdit={handleEdit} onDelete={handleDelete} onViewDetails={handleViewDetails} />;
        }
        if (activeTab === 'faq') {
            const data = faqQuery.data?.data || [];
            if (data.length === 0) return renderEmptyState();
            return <FAQTable data={data} onEdit={handleEdit} onDelete={handleDelete} onViewDetails={handleViewDetails} />;
        }

        // Individual / Group prompts
        const promptsData = activeQuery.data?.data || [];
        if (promptsData.length === 0) return renderEmptyState();

        return (
            <div className="flex flex-col">
                {promptsData.map((p: any) => {
                    const row = mapPromptToRow(p);
                    return <PromptsTableRow key={row.id} data={row} onEdit={handleEdit} onDelete={handleDelete} />;
                })}
            </div>
        );
    };

    // Define Headers based on active tab
    const renderHeaders = () => {
        const statusWidth = (isLegalTab || isFAQTab) ? "10.42vw" : "9.38vw";
        const updatedByWidth = "10.42vw";
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
                    {activeModal === 'ADD' && (isFAQTab ? <AddFAQModal onCancel={() => setActiveModal(null)} onSave={handleAddFAQ} /> : isLegalTab ? <AddContentModal onCancel={() => setActiveModal(null)} onSave={handleAddLegalContent} /> : <AddPromptModal onCancel={() => setActiveModal(null)} onSave={handleAddPrompt} />)}

                    {activeModal === 'EDIT' && selectedPrompt && (
                        isFAQTab ? <EditFAQModal faqId={selectedItemId} initialQuestion={selectedPrompt.question || selectedPrompt.title} initialAnswer={selectedPrompt.answerSnippet || selectedPrompt.answer || selectedPrompt.fullContent || ''} onCancel={() => setActiveModal(null)} onSave={handleEditFAQ} /> :
                            isLegalTab ? <EditContentModal contentId={selectedItemId} initialTitle={selectedPrompt.title} initialContent={selectedPrompt.description || selectedPrompt.content || selectedPrompt.fullContent || ''} onCancel={() => setActiveModal(null)} onSave={handleEditLegalContent} /> :
                                <EditPromptModal promptId={selectedItemId} initialValue={selectedPrompt.title} onCancel={() => setActiveModal(null)} onSave={handleEditPrompt} />
                    )}

                    {activeModal === 'DETAILS' && selectedPrompt && (
                        isFAQTab ? <FAQDetailsModal question={selectedPrompt.question || selectedPrompt.title} answer={selectedPrompt.answerSnippet || selectedPrompt.answer || selectedPrompt.fullContent || ''} onClose={() => setActiveModal(null)} /> :
                            <ContentDetailsModal title={selectedPrompt.title} content={selectedPrompt.description || selectedPrompt.content || selectedPrompt.fullContent || ''} onClose={() => setActiveModal(null)} />
                    )}

                    {activeModal === 'DELETE' && <DeletePromptModal onCancel={() => setActiveModal(null)} onDelete={handleDeleteItem} />}

                    {activeModal === 'SUCCESS_ADD' && <PromptSuccessModal title="New Prompt Added" onDone={() => setActiveModal(null)} />}
                    {activeModal === 'SUCCESS_EDIT' && <PromptSuccessModal title="Prompt Updated" onDone={() => setActiveModal(null)} />}
                    {activeModal === 'SUCCESS_DELETE' && <PromptSuccessModal title="Item Deleted" onDone={() => setActiveModal(null)} />}

                    {(activeModal === 'SUCCESS_FAQ_ADD' || activeModal === 'SUCCESS_CONTENT_ADD') && <PromptSuccessModal title="Content Added" onDone={() => setActiveModal(null)} />}
                    {(activeModal === 'SUCCESS_FAQ_EDIT' || activeModal === 'SUCCESS_CONTENT_EDIT') && <PromptSuccessModal title="Content Updated" onDone={() => setActiveModal(null)} />}

                    {activeModal === 'EXPORT' && (
                        <ExportModal
                            onCancel={() => setActiveModal(null)}
                            onDownload={(config) => {
                                console.log('Exporting', config);
                                setActiveModal(null);
                            }}
                        />
                    )}
                </>
            )}

            <PromptsHeader onAddPrompt={() => setActiveModal('ADD')} onExport={() => setActiveModal('EXPORT')} addLabel={isFAQTab ? 'Add FAQ' : isLegalTab ? 'Add Content' : 'Add Prompt'} />

            <div className="flex flex-col w-full gap-0">
                <TabGroup tabs={TABS} activeId={activeTab} onChange={handleTabChange} className="pl-[0.83vw]" />
                <div className="flex flex-col bg-[#222222] rounded-[0.83vw] overflow-hidden border border-white/5 shadow-2xl">
                    {/* Controls */}
                    <div className="flex flex-row items-center justify-between p-[0.83vw] gap-[0.83vw] bg-[#1a1a1a]/30">
                        <SearchInput value={search} onChange={setSearch} />
                        <FilterSelect
                            label="Status"
                            value={status}
                            options={['Published', 'Draft', 'Archived'].map(opt => ({ label: opt, value: opt }))}
                            onChange={setStatus}
                        />
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
                    <div className="w-full h-[2.5vw]" />

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        className="w-full px-[1.25vw] pb-[1.25vw]"
                    />
                </div>
            </div>
        </div>
    );
};

export default PromptsTable;
