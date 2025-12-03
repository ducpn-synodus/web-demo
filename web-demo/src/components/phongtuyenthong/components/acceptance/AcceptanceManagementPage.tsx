import { useState } from 'react';
import AcceptanceListPage from './AcceptanceListPage';
import AcceptanceDetailPage from './AcceptanceDetailPage';
import AcceptanceReportPage from './AcceptanceReportPage';
import AcceptanceReportDetailPage from './AcceptanceReportDetailPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FileCheck, List } from 'lucide-react';

export default function AcceptanceManagementPage() {
  const [activeView, setActiveView] = useState<'list' | 'detail' | 'reports'>('list');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('requests');

  const handleViewDetail = (requestId: string) => {
    setSelectedRequestId(requestId);
    setActiveView('detail');
  };

  const handleBackToList = () => {
    setActiveView('list');
    setSelectedRequestId(null);
    setSelectedReportId(null);
  };

  const handleViewReportDetail = (reportId: string) => {
    setSelectedReportId(reportId);
    setActiveView('detail');
  };

  // If viewing acceptance request detail
  if (activeView === 'detail' && selectedRequestId && activeTab === 'requests') {
    return <AcceptanceDetailPage requestId={selectedRequestId} onBack={handleBackToList} />;
  }

  // If viewing acceptance report detail
  if (activeView === 'detail' && selectedReportId && activeTab === 'reports') {
    return <AcceptanceReportDetailPage reportId={selectedReportId} onBack={handleBackToList} />;
  }

  // Main view with tabs
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white" style={{ borderColor: 'rgba(0, 104, 133, 0.1)' }}>
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: "var(--font-weight-semibold)", }}>Quản lý nghiệm thu</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border-2 p-1 h-auto" style={{ borderColor: 'rgba(0, 94, 120, 0.2)' }}>
            <TabsTrigger 
              value="requests" 
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <List className="size-4" />
              Yêu cầu nghiệm thu
            </TabsTrigger>
            <TabsTrigger 
              value="reports"
              className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-cyan-50 data-[state=active]:text-[#005e78]"
            >
              <FileCheck className="size-4" />
              Biên bản nghiệm thu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="m-0">
            <AcceptanceListPage onViewDetail={handleViewDetail} />
          </TabsContent>

          <TabsContent value="reports" className="m-0">
            <AcceptanceReportPage onViewDetail={handleViewReportDetail} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}