import { useState } from 'react';
import Header from './Header';
import VendorSidebar, { type VendorMenuId } from './VendorSidebar';
import VendorDashboard from './vendor/VendorDashboard';
import VendorCampaignList from './vendor/VendorCampaignList';
import VendorCampaignDetail from './vendor/VendorCampaignDetail';
import UpdateSlotModal from './vendor/UpdateSlotModal';
import AcceptanceBatchList from './vendor/AcceptanceBatchList';
import CreateAcceptanceBatch from './vendor/CreateAcceptanceBatch';
import TaskAcceptanceDetail from './vendor/TaskAcceptanceDetail';
import VendorProfile from './vendor/VendorProfile';

type ViewState = 
  | { type: 'menu'; menu: VendorMenuId }
  | { type: 'campaign-detail'; id: string }
  | { type: 'create-acceptance' }
  | { type: 'report-detail'; id: string };

interface VendorLayoutProps {
  onLogout?: () => void;
}

export default function VendorLayout({ onLogout }: VendorLayoutProps) {
  const [viewState, setViewState] = useState<ViewState>({ type: 'menu', menu: 'dashboard' });
  const [updateSlotModal, setUpdateSlotModal] = useState<{ 
    show: boolean; 
    slotId?: string; 
    slotType?: 'digital' | 'pr' | 'ooh' | 'tvc' | 'event';
    slotName?: string;
  }>({ show: false });

  const handleMenuChange = (menuId: VendorMenuId) => {
    setViewState({ type: 'menu', menu: menuId });
  };

  const handleProfileClick = () => {
    setViewState({ type: 'menu', menu: 'profile' });
  };

  const handleLogout = () => {
    onLogout?.();
    alert('Đăng xuất thành công!');
  };

  const handleViewCampaignDetail = (id: string) => {
    setViewState({ type: 'campaign-detail', id });
  };

  const handleBackToCampaigns = () => {
    setViewState({ type: 'menu', menu: 'campaigns' });
  };

  const handleUpdateSlot = (slotId: string) => {
    setUpdateSlotModal({ 
      show: true, 
      slotId, 
      slotType: 'pr', // This should be determined by slot data
      slotName: 'PR – VNExpress'
    });
  };

  const handleCreateAcceptance = () => {
    setViewState({ type: 'create-acceptance' });
  };

  const handleBackToAcceptance = () => {
    setViewState({ type: 'menu', menu: 'acceptance' });
  };

  const handleViewReport = (id: string) => {
    setViewState({ type: 'report-detail', id });
  };

  const handleSubmitReport = () => {
    console.log('Submit report for approval');
    alert('Biên bản đã được gửi đến VNA để phê duyệt!');
    setViewState({ type: 'menu', menu: 'acceptance' });
  };

  const handleDownloadPDF = () => {
    console.log('Download PDF');
    alert('Đang tải xuống file PDF...');
  };

  const renderContent = () => {
    if (viewState.type === 'campaign-detail') {
      return (
        <VendorCampaignDetail 
          onBack={handleBackToCampaigns}
          onUpdateSlot={handleUpdateSlot}
        />
      );
    }

    if (viewState.type === 'create-acceptance') {
      return (
        <CreateAcceptanceBatch 
          onBack={handleBackToAcceptance}
        />
      );
    }

    if (viewState.type === 'report-detail') {
      return (
        <TaskAcceptanceDetail
          acceptanceId={viewState.id}
          onBack={handleBackToAcceptance}
          onSubmit={handleSubmitReport}
          onDownloadPDF={handleDownloadPDF}
        />
      );
    }

    // Menu views
    switch (viewState.menu) {
      case 'dashboard':
        return <VendorDashboard />;
      case 'campaigns':
        return <VendorCampaignList onViewDetail={handleViewCampaignDetail} />;
      case 'acceptance':
        return (
          <AcceptanceBatchList 
            onCreateAcceptance={handleCreateAcceptance}
            onView={handleViewReport}
          />
        );
      case 'profile':
        return <VendorProfile />;
      default:
        return <VendorDashboard />;
    }
  };

  const getActiveMenu = (): VendorMenuId => {
    if (viewState.type === 'menu') {
      return viewState.menu;
    }
    if (viewState.type === 'campaign-detail') {
      return 'campaigns';
    }
    if (viewState.type === 'create-acceptance' || viewState.type === 'report-detail') {
      return 'acceptance';
    }
    return 'dashboard';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header onProfileClick={handleProfileClick} onLogout={handleLogout} />
      <div className="flex-1 flex overflow-hidden">
        <VendorSidebar 
          activeMenu={getActiveMenu()} 
          onMenuChange={handleMenuChange} 
        />
        <main className="flex-1 overflow-y-auto hide-scrollbar">
          {renderContent()}
        </main>
      </div>

      {/* Update Slot Modal */}
      {updateSlotModal.show && updateSlotModal.slotType && updateSlotModal.slotName && (
        <UpdateSlotModal
          slotId={updateSlotModal.slotId || ''}
          slotType={updateSlotModal.slotType}
          slotName={updateSlotModal.slotName}
          onClose={() => setUpdateSlotModal({ show: false })}
          onSave={(data) => {
            console.log('Save slot update:', data);
            alert('Kết quả đã được cập nhật thành công!');
            setUpdateSlotModal({ show: false });
          }}
        />
      )}
    </div>
  );
}
