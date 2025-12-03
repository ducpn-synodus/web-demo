import { useState } from "react";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import OrderListPage from "./components/OrderListPage";
import OrderDetailPage from "./components/OrderDetailPage";
import ParentCampaignListPage from "./components/campaigns/ParentCampaignListPage";
import ParentCampaignDetailPage from "./components/campaigns/ParentCampaignDetailPage";
import CampaignDetailPage from "./components/campaigns/CampaignDetailPage";
import CreateCampaignPage from "./components/campaigns/CreateCampaignPage";
import AcceptanceManagementPage from "./components/acceptance/AcceptanceManagementPage";
import DashboardOverviewTab from "./components/DashboardOverview";

export default function PhongTruyenThong({ onLogout }: { onLogout: () => void }) {
  const [activeMenu, setActiveMenu] = useState<string>("orders");
  const [currentView, setCurrentView] = useState<
    "list" | "detail" | "create" | "sub-detail"
  >("list");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");
  const [selectedSubCampaignId, setSelectedSubCampaignId] =
    useState<string>("");

  const handleViewDetail = () => {
    setCurrentView("detail");
  };

  const handleViewCampaignDetail = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setCurrentView("detail");
  };

  const handleBack = () => {
    setCurrentView("list");
    setSelectedCampaignId("");
    setSelectedSubCampaignId("");
  };

  const handleBackToParentDetail = () => {
    setCurrentView("detail");
    setSelectedSubCampaignId("");
  };

  const handleViewSubCampaignDetail = (subCampaignId: string) => {
    setSelectedSubCampaignId(subCampaignId);
    setCurrentView("sub-detail");
  };

  const handleCreateCampaign = () => {
    setCurrentView("create");
  };

  const handleSaveCampaign = (data: any) => {
    console.log("Campaign data:", data);
    // TODO: Save to backend
    alert("Kế hoạch đã được tạo thành công!");
    setCurrentView("list");
  };

  const handleMenuChange = (menu: string) => {
    setActiveMenu(menu);
    setCurrentView("list");
  };

  const renderContent = () => {
    // Dashboard
    if (activeMenu === "dashboard") {
      return <DashboardOverviewTab />;
    }

    // Quản lý Nhu cầu
    if (activeMenu === "orders") {
      return currentView === "list" ? (
        <OrderListPage onViewDetail={handleViewDetail} />
      ) : (
        <OrderDetailPage onBack={handleBack} />
      );
    }

    // Quản lý Chiến dịch
    if (activeMenu === "campaigns-parent") {
      if (currentView === "create") {
        return (
          <CreateCampaignPage onBack={handleBack} onSave={handleSaveCampaign} />
        );
      } else if (currentView === "sub-detail") {
        return (
          <CampaignDetailPage
            onBack={handleBackToParentDetail}
            subCampaignId={selectedSubCampaignId}
          />
        );
      } else if (currentView === "detail") {
        return (
          <ParentCampaignDetailPage
            campaignId={selectedCampaignId}
            onBack={handleBack}
            onViewSubCampaignDetail={handleViewSubCampaignDetail}
          />
        );
      } else {
        return (
          <ParentCampaignListPage
            onCreateNew={handleCreateCampaign}
            onViewDetail={handleViewCampaignDetail}
          />
        );
      }
    }

    // Quản lý Kiểm tra
    if (activeMenu === "acceptance") {
      return <AcceptanceManagementPage />;
    }

    // Default: Quản lý Nhu cầu
    return <OrderListPage onViewDetail={handleViewDetail} />;
  };

  return (
    <>
      <Layout activeMenu={activeMenu} onMenuChange={handleMenuChange} onLogout={onLogout}>
        {renderContent()}
      </Layout>
      <Toaster position="top-right" />
    </>
  );
}
